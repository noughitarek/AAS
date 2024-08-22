import DeleteModal from "@/Components/DeleteModal";
import Grid from "@/Components/Grid";
import Page from "@/Components/Page";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps, Wilaya, Desk, DeliveryMen } from "@/types";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Hash, Map } from "lucide-react";
import React, { FormEventHandler } from "react";

// Ensure DeliveryMen type includes desk_id, commune_id, and phone
type DeliveryMenType = {
    desk_id: number;
    commune_id: number;
    phone: string;
};

const DeliveryTeamEdit: React.FC<PageProps<{ deliveryMens: DeliveryMenType[]; desks: Desk[]; wilaya: Wilaya }>> = ({ auth, menu, deliveryMens, wilaya, desks }) => {
    const { data, setData, post, processing } = useForm<{ deliveryMens: DeliveryMenType[] }>({
        deliveryMens: deliveryMens || []
    });

    const getDeliveryMensPhone = (deskId: number, communeId: number) => {
        if (!data.deliveryMens) return '';
        const deliveryMan = data.deliveryMens.find(dm => dm.desk_id === deskId && dm.commune_id === communeId);
        return deliveryMan ? deliveryMan.phone : '';
    };

    const handleChange = (deskId: number, communeId: number, phone: string) => {
        setData(prevData => {
            const existingDeliveryMan = prevData.deliveryMens.find(dm => dm.desk_id === deskId && dm.commune_id === communeId);
            
            if (existingDeliveryMan) {
                return {
                    deliveryMens: prevData.deliveryMens.map(dm =>
                        dm.desk_id === deskId && dm.commune_id === communeId
                            ? { ...dm, phone }
                            : dm
                    )
                };
            } else {
                return {
                    deliveryMens: [
                        ...prevData.deliveryMens,
                        { desk_id: deskId, commune_id: communeId, phone } 
                    ]
                };
            }
        });
    };
    const handleChangeDesk = (deskId: number, phone: string) => {
        setData(prevData => {
            const updatedDeliveryMens = prevData.deliveryMens.map(dm =>
                dm.desk_id === deskId
                    ? { ...dm, phone }
                    : dm
            );
            const newDeliveryMens = wilaya.communes.reduce((acc, commune) => {
                const existingDeliveryMan = updatedDeliveryMens.find(dm =>
                    dm.desk_id === deskId && dm.commune_id === commune.id
                );
    
                if (!existingDeliveryMan) {
                    acc.push({
                        desk_id: deskId,
                        commune_id: commune.id,
                        phone
                    });
                }
    
                return acc;
            }, [] as DeliveryMenType[]);
    
            return {
                deliveryMens: [...updatedDeliveryMens, ...newDeliveryMens]
            };
        });
    };
    const submit: FormEventHandler = (e) =>{
        e.preventDefault();
        post(route('admins.deliveryTeam.edit', {wilaya: wilaya}))
    }

    return (
        <>
            <Head title="Delivery Team" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            Delivery Team
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            {wilaya.name}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </>
                }
            >
                <Page title="Delivery team" header="">
                    <Grid title={"Wilaya of "+wilaya.name} header={<button onClick={submit} disabled={processing} className="btn btn-primary">{processing ? "Saving":"Save"}</button>}>
                        <div className="intro-y overflow-auto">
                            <table className="table table-report -mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">#</th>
                                        {desks.map((desk) => (
                                            <th key={desk.id}>{desk.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="intro-x">
                                        <td>
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-sm text-gray-500">0</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Map className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-sm text-gray-500">All communes</span>
                                            </div>
                                        </td>
                                        {desks.map((desk) => (
                                            <td key={desk.id}>
                                                <input 
                                                    type="text" 
                                                    placeholder={desk.name}
                                                    onChange={(e) => handleChangeDesk(desk.id, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                    {wilaya.communes.map((commune) => (
                                        <tr key={commune.id} className="intro-x">
                                            <td>
                                                <div className="flex items-center">
                                                    <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-sm text-gray-500">{commune.id}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Map className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-sm text-gray-500">{commune.name}</span>
                                                </div>
                                            </td>
                                            {desks.map((desk) => (
                                                <td key={desk.id}>
                                                    <input 
                                                        type="text" 
                                                        placeholder={desk.name}
                                                        value={getDeliveryMensPhone(desk.id, commune.id)}
                                                        onChange={(e) => handleChange(desk.id, commune.id, e.target.value)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 p-4 border-t border-gray-200">
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                                        <div className="sm:ml-auto mt-2 sm:mt-0">
                                            Last activity: {lastActivityAt(deliveryMens)} by {lastActivityBy(deliveryMens)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Page>
            </AdminLayout>
        </>
    );
};

export default DeliveryTeamEdit;
