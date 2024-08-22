import { Product, Data, PageProps, Link } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link as InertiaLink, useForm } from "@inertiajs/react";
import Page from "@/Components/Page";
import { Button } from "@headlessui/react";
import { Building2, Calendar, ChevronDown, Hash, Link as IconLink, Pencil, Search, SearchCheck, Trash2, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import DeleteModal from "@/Components/DeleteModal";

const Products: React.FC<PageProps<{ products: Data<Product> }>> = ({auth, menu, products}) => {

    const { data, setData, delete: deleteFunction, processing } = useForm({productId: 0});
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [activeProducts, setActiveProducts] = useState<Data<Product>>(products);
    const submit = () =>{
        deleteFunction(route('admins.products.destroy', data.productId));
    }
    useEffect(()=>{

        if (search) {
            let default_products = products.data.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase())
            );
            setActiveProducts({
                ...products,
                data:default_products
            });
        }else{
            setActiveProducts(products);
        }
    

    }, [search])
    return (
        <>
            <Head title="Products" />

            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            <InertiaLink href={route("admins.dashboard")}>Admins</InertiaLink>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Products
                        </li>
                    </>}
            >
                <Page title="Products" header="">
                    <div className="grid grid-cols-12 gap-6 mt-8">
                        <div className="col-span-12">
                            <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
                                <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
                                    <Search className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500" />
                                    <input
                                        type="text"
                                        className="form-control w-full sm:w-64 box px-10"
                                        placeholder="Search products"
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
                                        href={route("admins.products.create")}
                                        className="btn btn-primary shadow-md mr-2"
                                    >
                                        Create product
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="intro-y overflow-auto">
                                <table className="table table-report -mt-2">
                                    <thead>
                                        <tr>
                                            <th className="whitespace-nowrap">
                                                #
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
                                        {activeProducts.data.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="intro-x"
                                            >
                                                <td>
                                                    <div className="flex items-center">
                                                        <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {product.id}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Building2 className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <SearchCheck className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {product.reference}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <User className="h-4 w-4 text-gray-500 mr-1" />
                                                        <span className="text-sm text-gray-500">
                                                            {product.created_by.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                product.created_at
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
                                                        className="btn btn-warning"
                                                        href={route(
                                                            "admins.products.edit",
                                                            { product: product.id }
                                                        )}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </InertiaLink>
                                                    &nbsp;
                                                    <Button className="btn btn-danger" onClick={(e) =>{
                                                        e.preventDefault()
                                                        setData('productId', product.id);
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
                                            {products.links.map(
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
                                                Last activity: {lastActivityAt(products.data)} by {lastActivityBy(products.data)}
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
export default Products;
