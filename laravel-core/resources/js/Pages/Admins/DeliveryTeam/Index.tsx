import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps, Wilaya } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Bookmark, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, RefreshCw, Settings, Star} from "lucide-react";
import React from "react";

const DeliveryTeam: React.FC<PageProps<{ wilayas: Wilaya[] }>> = ({ auth, menu, wilayas}) => {
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Delivery Team
                        </li>
                    </>
                }
            >
                <div className="intro-y inbox box mt-5">
                    <div className="p-5 flex flex-col-reverse sm:flex-row text-slate-500 border-b border-slate-200/60">
                        <div className="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-5 sm:pt-0 mt-5 sm:mt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
                            <input
                                className="form-check-input"
                                type="checkbox"
                            />
                            <div
                                className="dropdown ml-1"
                                data-tw-placement="bottom-start"
                            >
                                <a
                                    className="dropdown-toggle w-5 h-5 block"
                                    aria-expanded="false"
                                    data-tw-toggle="dropdown"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </a>
                            </div>
                            <a className="w-5 h-5 ml-5 flex items-center justify-center">
                                <RefreshCw className="w-4 h-4" />
                            </a>
                            <a className="w-5 h-5 ml-5 flex items-center justify-center">
                                <MoreHorizontal className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="flex items-center sm:ml-auto">
                            <div className="">1 - 58 of 58</div>
                            <a className="w-5 h-5 ml-5 flex items-center justify-center">
                                <ChevronLeft className="w-4 h-4" />
                            </a>
                            <a className="w-5 h-5 ml-5 flex items-center justify-center">
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a className="w-5 h-5 ml-5 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto sm:overflow-x-visible">
                        {wilayas.map((wilaya) => (
                            <div key={wilaya.id} className="intro-y">
                                <Link href={route('admins.deliveryTeam.edit', {wilaya: wilaya})}>
                                    <div className="inbox__item inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex px-5 py-3">
                                            <div className="flex-none flex items-center mr-5">
                                                <input
                                                    className="form-check-input flex-none"
                                                    type="checkbox"
                                                />
                                                <a className="w-5 h-5 flex-none ml-4 flex items-center justify-center text-slate-400">
                                                    <Star className="w-4 h-4" />
                                                </a>
                                                <a className="w-5 h-5 flex-none ml-2 flex items-center justify-center text-slate-400">
                                                    <Bookmark className="w-4 h-4" />
                                                </a>
                                                <div className="inbox__item--sender truncate ml-3">
                                                    {wilaya.id}
                                                </div>
                                            </div>
                                            <div className="w-64 sm:w-auto truncate">
                                                {wilaya.name} - {wilaya.name_ar}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                        <div className="sm:ml-auto mt-2 sm:mt-0">
                            Last account activity: 36 minutes ago
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};
export default DeliveryTeam;
