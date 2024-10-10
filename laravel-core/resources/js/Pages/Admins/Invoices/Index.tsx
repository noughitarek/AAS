import { Invoice, Data, PageProps, Link } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link as InertiaLink, router, useForm } from "@inertiajs/react";
import Page from "@/Components/Page";
import { Button } from "@headlessui/react";
import { Archive } from "lucide-react";
import React, { useState, useEffect } from "react";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import DeleteModal from "@/Components/DeleteModal";
import Grid from "@/Components/Grid";
import { useRef } from 'react'

const Invoices: React.FC<PageProps<{ invoices: Data<Invoice> }>> = ({auth, menu, invoices}) => {

    const importInvoicesRef = useRef<HTMLInputElement | null>(null);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);
    
    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        submitButtonRef.current?.click()
    };

    const triggerFileSelect = () => {
        importInvoicesRef.current?.click();
    };

    const [search, setSearch] = useState<string>("");
    const [activeInvoices, setActiveInvoices] = useState<Data<Invoice>>(invoices);
    
    return (
        <>
            <form action={ route('admins.invoices.import') } className='hidden' method="POST" encType="multipart/form-data">
                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                <input type="file" ref={importInvoicesRef} onChange={handleSubmit} name="invoice" accept=".xls,.xlsx" required />
                <button ref={submitButtonRef} type="submit">Submit</button>
            </form>

            <Head title="Invoices" />

            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            <InertiaLink href={route("admins.dashboard")}>Admins</InertiaLink>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        Invoices
                        </li>
                    </>}
            >
                <Page title="Invoices" header="">
                    <Grid title="Invoices" header={<button onClick={triggerFileSelect} className="btn btn-primary">Import</button>}>
                        <div className="grid grid-cols-12 gap-6 mt-8">
                            <div className="col-span-12">
                                <div className="intro-y overflow-auto">
                                    <table className="table table-report -mt-2">
                                        <thead>
                                            <tr>
                                                <th className="whitespace-nowrap">Invoice</th>
                                                <th className="whitespace-nowrap">Information</th>
                                                <th className="whitespace-nowrap">Desk</th>
                                                <th className="whitespace-nowrap">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            activeInvoices.data.map((invoice) => (
                                                <tr key={invoice.id} className="intro-x">
                                                    
                                                    <td>
                                                        <button className="btn btn-warning">
                                                            <Archive className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Page>
            </AdminLayout>
        </>
    );
};
export default Invoices;
