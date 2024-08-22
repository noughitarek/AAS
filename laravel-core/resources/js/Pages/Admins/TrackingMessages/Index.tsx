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

type TrackingMessagesType = {
    validating?: string;
    shipping?: string;
    wilaya?: string;
    delivery?: string;
    delivered?: string;
    ready?: string;
    recovering?: string;
    back?: string;
    back_Ready?: string;
};

const TrackingMessagesEdit: React.FC<PageProps<{ trackingMessages: TrackingMessagesType }>> = ({ auth, menu, trackingMessages }) => {
    const { data, setData, post, processing } = useForm({
        validating: trackingMessages.validating || "",
        shipping: trackingMessages.shipping || "",
        wilaya: trackingMessages.wilaya || "",
        delivery: trackingMessages.delivery || "",
        delivered: trackingMessages.delivered || "",
        ready: trackingMessages.ready || "",
        recovering: trackingMessages.recovering || "",
        back: trackingMessages.back || "",
        back_Ready: trackingMessages.back_Ready || "",
    });


    const submit: FormEventHandler = (e) =>{
        e.preventDefault();
        post(route('admins.trackingMessages.save'))
    }

    return (
        <>
            <Head title="Tracking messages" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            Tracking messages
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </>
                }
            >
                <Page title="Tracking messages" header="">
                    <Grid title="Tracking messages" header={<button onClick={submit} disabled={processing} className="btn btn-primary">{processing ? "Saving":"Save"}</button>}>
                        <div className="intro-y col-span-12 lg:col-span-8">
                            <div className="grid grid-cols-12 gap-5 mt-5 p-4">
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Validating (vers_hub)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('validating', e.target.value)}
                                            value={data.validating}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Shipping (en_hub)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('shipping', e.target.value)}
                                            value={data.shipping}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Wilaya (vers_wilaya)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('wilaya', e.target.value)}
                                            value={data.wilaya}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Delivery (en_livraison)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('delivery', e.target.value)}
                                            value={data.delivery}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Delivered (livre_non_encaisse)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('delivered', e.target.value)}
                                            value={data.delivered}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Ready (encaisse_non_paye)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('ready', e.target.value)}
                                            value={data.ready}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Recovering (paye_et_archive)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('recovering', e.target.value)}
                                            value={data.recovering}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Back (suspendu|retour)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('back', e.target.value)}
                                            value={data.back}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer zoom-in">
                                    <div className="font-medium text-base">Back Ready (retour_recu|retour_archive)</div>
                                    <div className="text-slate-500 mt-4">
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => setData('back_Ready', e.target.value)}
                                            value={data.back_Ready}
                                        ></textarea>
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

export default TrackingMessagesEdit;
