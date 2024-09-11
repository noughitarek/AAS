import { Desk, Funding, Investor, PageProps, Product } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Components/Page";
import Grid from "@/Components/Grid";
import { useState, useEffect, FormEventHandler } from 'react';
import { Button } from "@headlessui/react";

type FundingtForm = {
    total_amount: number;
    products_percentage: number;
    advertising_percentage: number;
    workers_percentage: number;
    product_id: number;
    desk_id: number;
    investor_id: number;
    type: number;
    investor_percentage: number;
  };

const EditFunding: React.FC<PageProps<{investors: Investor[], products: Product[], desks: Desk[], funding: Funding}>> = ({ auth, menu, investors, products, desks, funding }) => {
    const { data, setData, put, processing, errors } = useForm<FundingtForm>({
        total_amount: funding.total_amount,
        products_percentage: funding.products_percentage,
        advertising_percentage: funding.advertising_percentage,
        workers_percentage: funding.workers_percentage,
        product_id: funding.product_id,
        desk_id: funding.desk_id,
        investor_id: funding.investor_id,
        type: funding.type,
        investor_percentage: funding.investor_percentage,
    });
    const [products_amounts, setProducts_amounts] = useState(0);
    const [advertising_amounts, setAdvertising_amounts] = useState(0);
    const [workers_amounts, setWorkers_amounts] = useState(0);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admins.fundings.update', {funding}));
    };

    const [debouncedData, setDebouncedData] = useState(data);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedData(data);
        }, 5000);

        return () => {
            clearTimeout(handler);
        };
    }, [data]);

    useEffect(() => {
        const total = debouncedData.products_percentage + debouncedData.advertising_percentage + debouncedData.workers_percentage;
    
        if (total != 100) {
            setData(prevData => ({
                ...prevData,
                products_percentage: (prevData.products_percentage / total) * 100,
                advertising_percentage: (prevData.advertising_percentage / total) * 100,
                workers_percentage: (prevData.workers_percentage / total) * 100,
            }));
        }
        setProducts_amounts(data.products_percentage*data.total_amount/100);
        setAdvertising_amounts(data.advertising_percentage*data.total_amount/100);
        setWorkers_amounts(data.workers_percentage*data.total_amount/100);
    }, [debouncedData]);

    return (
        <>
            <Head title="Edit a funding" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.fundings.index")}>
                                Fundings
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </>
                }
            >
                <Page title="Edit a funding" header={<></>}>
                    <Grid title="Funding's information">
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Amount</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The amount of the funding
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.total_amount}
                                    placeholder="The total amount"
                                    type="number"
                                    onChange={(e) => setData('total_amount', parseFloat(e.target.value))}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.total_amount ? "text-danger" : ""}`}>
                                    {errors.total_amount ? `${errors.total_amount} - ` : ""}A number
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Investor benefits part</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The pourcentage of the investor from benefits
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <input
                                    value={data.investor_percentage}
                                    placeholder="A number between 0 and 100"
                                    type="number"
                                    onChange={(e) => setData('investor_percentage', parseFloat(e.target.value))}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.investor_percentage ? "text-danger" : ""}`}>
                                    {errors.investor_percentage ? `${errors.investor_percentage} - ` : ""}A number between 0 and 100
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Type</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The type of the funding
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', parseFloat(e.target.value))}
                                    className="form-control"
                                >
                                    <option value={0}>Select the type</option>
                                    <option value={1}>Test</option>
                                    <option value={2}>Product</option>
                                </select>
                                <div className={`form-help text-right mt-2 ${errors.type ? "text-danger" : ""}`}>
                                    {errors.type ? `${errors.type} - ` : ""}Select from the list 
                                </div>
                            </div>
                        </div>

                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Parts</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The parts of the funding
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <div className="font-medium">Products</div>
                                <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                    {products_amounts} DZD
                                </div>
                                <input
                                    value={data.products_percentage}
                                    placeholder="A number between 0 and 100"
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={(e) => setData('products_percentage', parseFloat(e.target.value))}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.products_percentage ? "text-danger" : ""}`}>
                                    {errors.products_percentage ? `${errors.products_percentage} - ` : ""}A number
                                </div>
                            </div>&nbsp;

                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <div className="font-medium">Advertising</div>
                                <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                    {advertising_amounts} DZD
                                </div>
                                <input
                                    value={data.advertising_percentage}
                                    placeholder="A number between 0 and 100"
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={(e) => setData('advertising_percentage', parseFloat(e.target.value))}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.advertising_percentage ? "text-danger" : ""}`}>
                                    {errors.advertising_percentage ? `${errors.advertising_percentage} - ` : ""}A number
                                </div>
                            </div>&nbsp;
                            
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <div className="font-medium">Workers</div>
                                <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                    {workers_amounts} DZD
                                </div>
                                <input
                                    value={data.workers_percentage}
                                    placeholder="A number between 0 and 100"
                                    min={0}
                                    max={100}
                                    type="number"
                                    onChange={(e) => setData('workers_percentage', parseFloat(e.target.value))}
                                    className="form-control"
                                />
                                <div className={`form-help text-right mt-2 ${errors.workers_percentage ? "text-danger" : ""}`}>
                                    {errors.workers_percentage ? `${errors.workers_percentage} - ` : ""}A number
                                </div>
                            </div>&nbsp;
                        </div>
                    </Grid><br/>
                    <Grid title="Funding's information">
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Investor</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The Investor
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <select
                                    value={data.investor_id}
                                    onChange={(e) => setData('investor_id', parseFloat(e.target.value))}
                                    className="form-control"
                                >
                                    <option value={0}>Select the investor</option>
                                    {investors.map(investor=>(
                                        <option value={investor.id} key={investor.id}>{investor.name}</option>
                                    ))}
                                </select>
                                <div className={`form-help text-right mt-2 ${errors.investor_id ? "text-danger" : ""}`}>
                                    {errors.investor_id ? `${errors.investor_id} - ` : ""}Select from the list
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Product</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The product
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <select
                                    value={data.product_id}
                                    onChange={(e) => setData('product_id', parseFloat(e.target.value))}
                                    className="form-control"
                                >
                                    <option value={0}>Select the product</option>
                                    {products.map(product=>(
                                        <option value={product.id} key={product.id}>{product.name}</option>
                                    ))}
                                </select>
                                <div className={`form-help text-right mt-2 ${errors.product_id ? "text-danger" : ""}`}>
                                    {errors.product_id ? `${errors.product_id} - ` : ""}Select from the list
                                </div>
                            </div>
                        </div>
                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                            <div className="form-label xl:w-64 xl:!mr-10">
                                <div className="text-left">
                                    <div className="flex items-center">
                                        <div className="font-medium">Desk</div>
                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                            Required
                                        </div>
                                    </div>
                                    <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        The desk
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <select
                                    value={data.desk_id}
                                    onChange={(e) => setData('desk_id', parseFloat(e.target.value))}
                                    className="form-control"
                                >
                                    <option value={0}>Select the desk</option>
                                    {desks.map(desk=>(
                                        <option value={desk.id} key={desk.id}>{desk.name}</option>
                                    ))}
                                </select>
                                <div className={`form-help text-right mt-2 ${errors.desk_id ? "text-danger" : ""}`}>
                                    {errors.desk_id ? `${errors.desk_id} - ` : ""}Select from the list
                                </div>
                            </div>
                        </div>
                        
                    </Grid><br/>
                    <Button className="btn btn-primary" disabled={processing} onClick={submit}>{processing?"Updating..":"Update"}</Button>
                </Page>
            </AdminLayout>
        </>
    );
};

export default EditFunding;
