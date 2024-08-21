import { Desk, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Components/Page";
import Grid from "@/Components/Grid";
import { useState, useEffect, FormEventHandler } from 'react';
import { Button } from "@headlessui/react";

const EditDesk: React.FC<PageProps<{desk: Desk}>> = ({ auth, menu, desk }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: desk.name,
        reference: desk.reference,
        from_stock: desk.from_stock,
        ecotrack_idf: desk.ecotrack_idf,
        ecotrack_token: desk.ecotrack_token,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admins.desks.edit', {desk}));
    };

    return (
        <>
            <Head title="Edit a desk" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.desks.index")}>
                                Desks
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {desk.name}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </>
                }
            >
                <Page title="Edit a desk" header={<></>}>
                    <Grid title="Desk's information">
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Name</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The name of the desk
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.name ?? ""}
                                    placeholder="For ex: Packers Alger"
                                    type="text"
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.name ? "text-danger" : ""}`}>
                                    {errors.name ? `${errors.name} - ` : ""}Min: 4 characters, Max: 255 characters
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Reference</div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The reference of the desk
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.reference ?? ""}
                                    placeholder="For ex: desk1"
                                    onChange={(e) => setData('reference', e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.reference ? "text-danger" : ""}`}>
                                    {errors.reference ? `${errors.reference} - ` : ""}Min: 4 characters, Max: 255 characters
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Use stock</div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        Whether the desk uses stock by default or not
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    checked={data.from_stock}
                                    onChange={(e) => setData('from_stock', e.target.checked)}
                                    type="checkbox"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.from_stock ? "text-danger" : ""}`}>
                                    {errors.from_stock ? `${errors.from_stock} - ` : ""}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid title="API information">
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Ecotrack identifier</div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        Only the identifier for ex: rblivraison, packers
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.ecotrack_idf ?? ""}
                                    placeholder="For ex: packers"
                                    type="text"
                                    onChange={(e) => setData('ecotrack_idf', e.target.value)}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.ecotrack_idf ? "text-danger" : ""}`}>
                                    {errors.ecotrack_idf ? `${errors.ecotrack_idf} - ` : ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Ecotrack token</div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The token of ecotrack
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.ecotrack_token ?? ""}
                                    placeholder="For ex: WW1rrfFPWYlC8kwZqdPipW2xABXfiD7"
                                    onChange={(e) => setData('ecotrack_token', e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.ecotrack_token ? "text-danger" : ""}`}>
                                    {errors.ecotrack_token ? `${errors.ecotrack_token} - ` : ""}
                                </div>
                            </div>
                        </div>
                    </Grid><br/>
                    <Button className="btn btn-primary" disabled={processing} onClick={submit}>{processing?"Editing..":"Edit"}</Button>
                </Page>
            </AdminLayout>
        </>
    );
};

export default EditDesk;
