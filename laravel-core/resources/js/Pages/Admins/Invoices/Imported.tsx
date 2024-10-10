import { Order, Data, PageProps, Link } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link as InertiaLink, router, useForm } from "@inertiajs/react";
import Page from "@/Components/Page";
import { Button } from "@headlessui/react";
import { Archive, AtSign, Barcode, Box, Building2, Calendar, ChevronDown, DollarSign, Hash, Home, Link as IconLink, MapPin, Pencil, Phone, PinIcon, QrCode, Search, SearchCheck, ShoppingCart, Trash2, User, User2, UserCog } from "lucide-react";
import React, { useState, useEffect, FormEventHandler } from "react";
import { lastActivityAt, lastActivityBy } from "@/types/functions";
import DeleteModal from "@/Components/DeleteModal";
import Grid from "@/Components/Grid";
import { useRef } from 'react'

const Orders: React.FC<PageProps<{ orders: Data<Order> }>> = ({auth, menu, orders}) => {
    const [search, setSearch] = useState<string>("");
    const [activeOrders, setActiveOrders] = useState<Data<Order>>(orders);
    const { data, setData, post, processing, errors } = useForm<number[]>([]);
    
    useEffect(()=>{
        const orderIds = activeOrders.data.map(order => order.id);
        setData(orderIds);
    }, [activeOrders])
    
    useEffect(()=>{

        if (search) {
            let default_orders = orders.data.filter(order => 
                order.name.toLowerCase().includes(search.toLowerCase())
            );
            setActiveOrders({
                ...orders,
                data:default_orders
            });
        }else{
            setActiveOrders(orders);
        }
    

    }, [search])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admins.orders.imported'));
    };
    return (
        <>
            <Head title="Orders" />

            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            <InertiaLink href={route("admins.dashboard")}>Admins</InertiaLink>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        Orders
                        </li>
                    </>}
            >
                <Page title="Orders" header="">
                    <Grid title="Orders" header={<button disabled={processing} onClick={handleSubmit} className="btn btn-primary">Save</button>}>
                        <div className="grid grid-cols-12 gap-6 mt-8">
                            <div className="col-span-12">
                                <div className="intro-y overflow-auto">
                                    <table className="table table-report -mt-2">
                                        <thead>
                                            <tr>
                                                <th className="whitespace-nowrap">Order</th>
                                                <th className="whitespace-nowrap">Customer</th>
                                                <th className="whitespace-nowrap">Address</th>
                                                <th className="whitespace-nowrap">Information</th>
                                                <th className="whitespace-nowrap">Price</th>
                                                <th className="whitespace-nowrap">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            activeOrders.data.map((order) => (
                                                <tr key={order.id} className="intro-x">
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={data.includes(order.id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setData(prevData => [...prevData, order.id]);
                                                                } else {
                                                                    setData(prevData => prevData.filter(id => id !== order.id));
                                                                }
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.id}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    new Date(order.created_at).toLocaleString(
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
                                                        <div className="flex items-center">
                                                            <Barcode className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                            <a target="_blank" href={'https://suivi.ecotrack.dz/suivi/'+order.tracking}>{order.tracking}</a>
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <QrCode className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.intern_tracking}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <User2 className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Phone className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.phone}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Phone className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.phone2}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Home className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.address}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.commune?.name ?? 'NA' }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <PinIcon className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.commune?.wilaya.name ?? 'NA'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <UserCog className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.created_by.name}
                                                            </span>
                                                        </div>
                                                        {order.order_products.map(order_product=>(
                                                            <div className="flex items-center" key={order_product.id}>
                                                                <Box className="h-4 w-4 text-gray-500 mr-1" />
                                                                <span className="text-sm text-gray-500">
                                                                    {order_product.quantity} X {order_product.product.name}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.total_price} DZD
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <ShoppingCart className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.delivery_fee} DZD
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">
                                                                {order.clean_price} DZD
                                                            </span>
                                                        </div>
                                                    </td>
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
export default Orders;
