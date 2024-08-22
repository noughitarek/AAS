import { Product, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Components/Page";
import Grid from "@/Components/Grid";
import { useState, useEffect, FormEventHandler } from 'react';
import { Button } from "@headlessui/react";

const EditProduct: React.FC<PageProps<{product: Product}>> = ({ auth, menu, product }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        reference: product.reference,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admins.products.edit', {product}));
    };

    return (
        <>
            <Head title="Edit a product" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.products.index")}>
                                Products
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.name}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </>
                }
            >
                <Page title="Edit a product" header={<></>}>
                    <Grid title="Product's information">
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
                                        The name of the product
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
                                        The reference of the product
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.reference ?? ""}
                                    placeholder="For ex: product1"
                                    onChange={(e) => setData('reference', e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.reference ? "text-danger" : ""}`}>
                                    {errors.reference ? `${errors.reference} - ` : ""}Min: 4 characters, Max: 255 characters
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

export default EditProduct;
