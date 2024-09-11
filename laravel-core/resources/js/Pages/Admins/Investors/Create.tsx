import { PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Components/Page";
import Grid from "@/Components/Grid";
import { useState, useEffect, FormEventHandler } from 'react';
import { Button } from "@headlessui/react";

type InvestortForm = {
    name: string;
    email: string;
    password: string;
    permissions: string[];
  };

const CreateInvestor: React.FC<PageProps> = ({ auth, menu }) => {
    const { data, setData, post, processing, errors } = useForm<InvestortForm>({
        name: '',
        email: '',
        password: '',
        permissions: [],
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admins.investors.create'));
    };

    const handlePermissionChange = (permission: string, isChecked: boolean) => {
        let updatedPermissions: string[];
    
        if (isChecked) {
          updatedPermissions = [...data.permissions, permission];
        } else {
          updatedPermissions = data.permissions.filter((perm) => perm !== permission);
        }
    
        setData('permissions', updatedPermissions);
      };

    return (
        <>
            <Head title="Create a investor" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.investors.index")}>
                                Investors
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Create
                        </li>
                    </>
                }
            >
                <Page title="Create a investor" header={<></>}>
                    <Grid title="Investor's information">
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
                                        The name of the investor
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.name}
                                    placeholder="For ex: Laptop"
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
                                        <div className="font-medium">Email</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The email of the investor
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.email}
                                    placeholder="For ex: investor1@service.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.email ? "text-danger" : ""}`}>
                                    {errors.email ? `${errors.email} - ` : ""}Valid email address
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Password</div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The password for the investor
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.password}
                                    placeholder="For ex: ********"
                                    onChange={(e) => setData('password', e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.password ? "text-danger" : ""}`}>
                                    {errors.password ? `${errors.password} - ` : ""}Leave it empty to generate a URL for setting the passwor
                                </div>
                            </div>
                        </div>
                    </Grid><br/>
                    <Grid title="Permissions">
                        <div className="intro-y col-span-4 box zoom-in">
                            <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                                <div className="intro-x relative flex items-center">
                                    <div className="box flex-1 pb-2">

                                        <div className="form-check form-switch mt-1 mb-1 ml-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value='Can do something 1'
                                                checked={data.permissions.includes('Can do something 1')}
                                                onChange={(e) => handlePermissionChange('Can do something 1', e.target.checked)}
                                            />
                                            <label className="form-check-label">Can do something 1</label>
                                        </div>
                                        <div className="form-check form-switch mt-1 mb-1 ml-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value='Can do something 2'
                                                checked={data.permissions.includes('Can do something 2')}
                                                onChange={(e) => handlePermissionChange('Can do something 2', e.target.checked)}
                                            />
                                            <label className="form-check-label">Can do something 2</label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid><br/>
                    <Button className="btn btn-primary" disabled={processing} onClick={submit}>{processing?"Creating..":"Create"}</Button>
                </Page>
            </AdminLayout>
        </>
    );
};

export default CreateInvestor;
