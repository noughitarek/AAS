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

const Advertisings: React.FC<PageProps<{ fundings: Data<Funding> }>> = ({auth, menu, fundings}) => {

    const { data, setData, post, processing } = useForm({
        fundings: fundings.data.map(funding => ({
            id: funding.id,
            funding: funding,
            daym2: funding.daym2 || 0,
            daym1: funding.daym1 || 0,
            day0: funding.day0 || 0,
            dayp1: funding.dayp1 || 0,
            dayp2: funding.dayp2 || 0,
        }))
    });
    const handleFundingChange = (fundingId: number, field: string, value: number) => {
        setData({
            ...data,
            fundings: data.fundings.map(funding => 
                funding.id === fundingId 
                ? { ...funding, [field]: value } 
                : funding
            )
        });
    };

    const saveChanges: FormEventHandler = async (e) => {
        e.preventDefault();
        await post(route('admins.advertisings.save'));
    }
    

    const getDateOffset = (offset: number) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
            <Head title="Advertisings" />

            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            <InertiaLink href={route("admins.dashboard")}>Admins</InertiaLink>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            Fundings
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Advertisings
                        </li>
                    </>}
            >
                <Page title="Advertisings" header=''>
                    <div className="grid grid-cols-12 gap-6 mt-8">
                        <div className="col-span-12">
                            <div className="intro-y overflow-auto">
                                <table className="table table-report -mt-2">
                                    <thead>
                                        <tr>
                                            <th>Fundings</th>
                                            <th className="whitespace-nowrap">{getDateOffset(-2)}</th>
                                            <th className="whitespace-nowrap">{getDateOffset(-1)}</th>
                                            <th className="whitespace-nowrap">{getDateOffset(0)} (Today)</th>
                                            <th className="whitespace-nowrap">{getDateOffset(1)}</th>
                                            <th className="whitespace-nowrap">{getDateOffset(2)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.fundings.map(funding=>(
                                            <tr key={funding.id} className="intro-x">
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
                                                            {funding.funding.investor.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Box className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {funding.funding.product.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={getDateOffset(-2)}
                                                        className="w-full border border-gray-300 rounded p-2"
                                                        value={funding.daym2}
                                                        onChange={(e) => handleFundingChange(funding.id, 'daym2', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={getDateOffset(-1)}
                                                        className="w-full border border-gray-300 rounded p-2"
                                                        value={funding.daym1}
                                                        onChange={(e) => handleFundingChange(funding.id, 'daym1', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={getDateOffset(0)}
                                                        className="w-full border border-gray-300 rounded p-2"
                                                        value={funding.day0}
                                                        onChange={(e) => handleFundingChange(funding.id, 'day0', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={getDateOffset(1)}
                                                        className="w-full border border-gray-300 rounded p-2"
                                                        value={funding.dayp1}
                                                        onChange={(e) => handleFundingChange(funding.id, 'dayp1', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder={getDateOffset(2)}
                                                        className="w-full border border-gray-300 rounded p-2"
                                                        value={funding.dayp2}
                                                        onChange={(e) => handleFundingChange(funding.id, 'dayp2', Number(e.target.value))}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="btn btn-primary" disabled={processing} onClick={saveChanges}>{processing?'Saving ..':'Save'}</button>
                        </div>
                    </div>
                </Page>
            </AdminLayout>
        </>
    );
};
export default Advertisings;
