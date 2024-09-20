import { Funding, Data, PageProps, Link } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link as InertiaLink, useForm } from "@inertiajs/react";
import Page from "@/Components/Page";
import { Button } from "@headlessui/react";
import { AtSign, Box, Building2, Calendar, ChevronDown, DollarSign, Hash, Link as IconLink, Pencil, Search, SearchCheck, ShoppingCart, Trash2, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import DeleteModal from "@/Components/DeleteModal";

const Fundings: React.FC<PageProps<{ fundings: Data<Funding> }>> = ({auth, menu, fundings}) => {

    const { data, setData, delete: deleteFunction, processing } = useForm({fundingId: 0});
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [activeFundings, setActiveFundings] = useState<Data<Funding>>(fundings);
    const submit = () =>{
        deleteFunction(route('admins.fundings.destroy', data.fundingId));
    }
    useEffect(()=>{

        if (search) {
            let default_fundings = fundings.data.filter(funding => 
                funding.investor.name.toLowerCase().includes(search.toLowerCase())
            );
            setActiveFundings({
                ...fundings,
                data:default_fundings
            });
        }else{
            setActiveFundings(fundings);
        }
    

    }, [search])
    return (
        <>
            <Head title="Fundings" />

            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            <InertiaLink href={route("admins.dashboard")}>Admins</InertiaLink>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Fundings
                        </li>
                    </>}
            >
                <Page title="Fundings" header="">
                    <div className="grid grid-cols-12 gap-6 mt-8">
                        <div className="col-span-12">
                            <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
                                <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
                                    <Search className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500" />
                                    <input
                                        type="text"
                                        className="form-control w-full sm:w-64 box px-10"
                                        placeholder="Search fundings"
                                        onChange={(e)=>{ setSearch(e.target.value) }}
                                    />
                                    <div
                                        className="inbox-filter dropdown absolute inset-y-0 mr-3 right-0 flex items-center"
                                        data-tw-placement="bottom-start"
                                    >
                                        <ChevronDown
                                            className="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500"
                                            role="button"
                                            aria-expanded="false"
                                            data-tw-toggle="dropdown"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto flex">
                                    <InertiaLink
                                        href={route("admins.fundings.create")}
                                        className="btn btn-primary shadow-md mr-2"
                                    >
                                        Create funding
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="intro-y overflow-auto">
                                <table className="table table-report -mt-2">
                                    <thead>
                                        <tr>
                                            <th className="whitespace-nowrap">
                                                Investor
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Products
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Advertising
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Workers
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Cashed
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Created
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeFundings.data.map((funding) => (
                                            <tr
                                                key={funding.id}
                                                className="intro-x"
                                            >
                                                <td>
                                                    <div className="flex items-center">
                                                        <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.id}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Building2 className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.investor.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <AtSign className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.investor.email}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Box className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.product.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.products_part} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Used: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Unused: {funding.products_part} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Quantity: 0
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            First purchase at: N/A
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.advertising_part} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Used: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Unused: {funding.advertising_part} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Start at: N/A
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            First order at: N/A
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.workers_part} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Used: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Unused: {funding.workers_part} DZD
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            First cashed at: N/A
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Quantity: 0
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Product: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Advertising: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Workers: 0 DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Rate: 0%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <User className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.created_by.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                funding.created_at
                                                            ).toLocaleString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit",
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <InertiaLink
                                                        className="btn btn-success"
                                                        href={route(
                                                            "admins.fundings.edit",
                                                            { funding: funding.id }
                                                        )}
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </InertiaLink>
                                                    &nbsp;
                                                    <InertiaLink
                                                        className="btn btn-warning"
                                                        href={route(
                                                            "admins.fundings.edit",
                                                            { funding: funding.id }
                                                        )}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </InertiaLink>
                                                    &nbsp;
                                                    <Button className="btn btn-danger" onClick={(e) =>{
                                                        e.preventDefault()
                                                        setData('fundingId', funding.id);
                                                        setShowDeleteModal(true)
                                                    }}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-6 p-4 border-t border-gray-200">
                                    <nav aria-label="Page navigation">
                                        <ul className="inline-flex items-center -space-x-px">
                                            {fundings.links.map(
                                                (link: Link, index: number) => (
                                                    <li key={index}>
                                                        <InertiaLink
                                                            href={link.url}
                                                            className={`px-3 py-1 text-sm font-medium ${
                                                                link.active
                                                                    ? "bg-blue-500 text-white"
                                                                    : "text-gray-500"
                                                            }`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: `${link.label}`,
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </nav>
                                    <div >
                                        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                                            <div className="sm:ml-auto mt-2 sm:mt-0">
                                                Last activity: {lastActivityAt(fundings.data)} by {lastActivityBy(fundings.data)}
                                            </div>
                                        </div>
                                    </div>
                                    <DeleteModal
                                        showDeleteModal={showDeleteModal}
                                        handleDeleteCancel={()=>{setShowDeleteModal(false)}}
                                        handleDeleteConfirm={submit}
                                        deleting={processing}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            </AdminLayout>
        </>
    );
};
export default Fundings;
