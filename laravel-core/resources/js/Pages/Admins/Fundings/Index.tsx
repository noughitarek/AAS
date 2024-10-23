import { Funding, Data, PageProps, Link } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link as InertiaLink, useForm, router } from "@inertiajs/react";
import Page from "@/Components/Page";
import { Button } from "@headlessui/react";
import { AtSign, Box, Building2, Calendar, ChevronDown, DollarSign, Hash, Link as IconLink, Pencil, Search, SearchCheck, ShoppingCart, Trash2, User } from "lucide-react";
import React, { useState, useEffect, FormEventHandler } from "react";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import DeleteModal from "@/Components/DeleteModal";
import Modal from "@/Components/Modal";

const Fundings: React.FC<PageProps<{ fundings: Data<Funding> }>> = ({auth, menu, fundings}) => {

    const { data, setData, delete: deleteFunction, post, processing } = useForm({
        fundingId: 0,
        purchase_amount: 0,
        purchase_quantity: 0,
        purchased_at: new Date().toISOString().slice(0, 16),
    });
    const [saving, setSaving] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
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

    const purchase: FormEventHandler = async (e) => {
        e.preventDefault();
        await post(route('admins.fundings.purchase', {funding: data.fundingId}));
        setData({
            fundingId: 0,
            purchase_amount: 0,
            purchase_quantity: 0,
            purchased_at: new Date().toISOString().slice(0, 16),
        });
        setShowPurchaseModal(false)
        router.get(route('admins.fundings.index'));
    };
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
                                            <tr className="intro-x">
                                                
                                                    <td>
                                                        <InertiaLink 
                                                            href={route(
                                                                "admins.fundings.show",
                                                                { funding: funding.id }
                                                            )}
                                                            key={funding.id}
                                                        >
                                                            <div className="flex items-center">
                                                                <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                                <span className="text-sm text-gray-500">
                                                                    {funding.id}
                                                                </span>
                                                            </div>
                                                        </InertiaLink>
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
                                                    {
                                                        !funding.firstPurchaseAt && (
                                                            <span className="text-sm text-danger">
                                                                You didn't purchase this product for {Math.floor((Date.now() - new Date(funding.created_at).getTime()) / (1000 * 60 * 60 * 24))} days now.
                                                            </span>
                                                        )
                                                    }
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.products_part} DZD
                                                        </span>
                                                    </div>
                                                    {/*<div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Used: {funding.totalPurchaseAmount} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Unused: {funding.products_part-funding.totalPurchaseAmount} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Quantity: {funding.totalPurchaseQuantity}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            First purchase:  &nbsp;
                                                            {
                                                                funding.firstPurchaseAt && new Date(funding.firstPurchaseAt).toLocaleString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                            {!funding.firstPurchaseAt && 'N/A'}
                                                        </span>
                                                    </div>
                                                    */}
                                                </td>
                                                <td>
                                                    {
                                                        !funding.firstAdvertisementAt && (
                                                            <span className="text-sm text-danger">
                                                                You didn't start the advertising for this product for {Math.floor((Date.now() - new Date(funding.created_at).getTime()) / (1000 * 60 * 60 * 24))} days now.
                                                            </span>
                                                        )
                                                    }
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.advertising_part} DZD
                                                        </span>
                                                    </div>
                                                    {/*
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Used: {funding.totalAdvertisements} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Unused: {funding.advertising_part-funding.totalAdvertisements} DZD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Start at: &nbsp;
                                                            {
                                                                funding.firstAdvertisementAt && new Date(funding.firstAdvertisementAt).toLocaleString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric"
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            First order at: N/A
                                                        </span>
                                                    </div>
                                                    */}
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: {funding.workers_part} DZD
                                                        </span>
                                                    </div>
                                                    {/*
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
                                                    */}
                                                </td>
                                                <td>
                                                    {/*
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
                                                    */}
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Total: 0 DZD
                                                        </span>
                                                    </div>
                                                    {/*
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
                                                    */}
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
                                                    <Button
                                                        className="btn btn-success"
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            setData('fundingId', funding.id);
                                                            setShowPurchaseModal(true)
                                                            }
                                                        }
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </Button>
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
                <Modal show={showPurchaseModal} onClose={()=>setShowPurchaseModal(false)} maxWidth="md">
                    <div className="p-6">
                        <ShoppingCart className="w-16 h-16 mx-auto text-success" />
                        <h2 className="mt-6 text-xl font-bold">Fill your purchase information</h2>
                        <div className="mt-6">
                            <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                                <div className="form-label xl:w-16 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center mt-2">
                                            <div className="font-medium">Amount</div>
                                            <div className="text-danger ml-2">*</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1">
                                    <input 
                                        className="form-control"
                                        placeholder="A number greater than 0"
                                        type="number"
                                        onChange={(e) => setData('purchase_amount', parseFloat(e.target.value))}
                                        value={data.purchase_amount??''}
                                    />
                                    <p>
                                    Products part: {fundings.data.find(funding => funding.id === data.fundingId)?.products_part+ ' DZD'}
                                    </p>
                                </div>
                            </div>
                            <div className="form-inline items-start flex-col xl:flex-row pt-5 first:mt-0 first:pt-0 pb-4">
                                <div className="form-label xl:w-16 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center mt-2">
                                            <div className="font-medium">Quantity</div>
                                            <div className="text-danger ml-2">*</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="A number greater than 0"
                                        value={data.purchase_quantity??''}
                                        onChange={(e) => setData('purchase_quantity', parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="form-inline items-start flex-col xl:flex-row pt-5 first:mt-0 first:pt-0 pb-4">
                                <div className="form-label xl:w-16 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center mt-2">
                                            <div className="font-medium">Purchased at</div>
                                            <div className="text-danger ml-2">*</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1">
                                    <input
                                        className="form-control"
                                        type='datetime-local'
                                        value={data.purchased_at}
                                        placeholder="A valid date"
                                        onChange={(e) => setData('purchased_at', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
                                onClick={()=>setShowPurchaseModal(false)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-success hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                                    saving ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={purchase}
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Purchase"}
                            </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </AdminLayout>
        </>
    );
};
export default Fundings;
