import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Funding, PageProps } from '@/types';
import Page from '@/Components/Page';
import { RefreshCcw } from 'lucide-react';

const FundingShow: React.FC<PageProps<{ funding: Funding }>> = ({auth, menu, funding}) => {
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout
                user={auth.user}
                menu={menu}
                breadcrumb={<>
                        <li className="breadcrumb-item" aria-current="page">
                            {funding.id}
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route("admins.dashboard")}>Admins</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Fundings
                        </li>
                    </>}
            >
                <Page title="Fundings" header="">
                    {/* Capital report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">معلومات حول رأس المال</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <RefreshCcw className='w-4 h-4 mr-3'/>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                    100 %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.total_amount} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال الكلي</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                    {funding.products_percentage} %
                                                </div>
                                            </div>            
                                        </div>                     
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.products_part} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال السلعة</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                    {funding.advertising_percentage} %
                                                </div>
                                            </div>            
                                        </div>                     
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.advertising_part} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال سبونسور</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                    {funding.workers_percentage} %
                                                </div>
                                            </div>            
                                        </div>                     
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.workers_part} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال الخدامين</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Capital report */}

                    {/* Product report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">معلومات حول المنتج و الشراء</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <RefreshCcw className='w-4 h-4 mr-3'/>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.product.reference}
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.product.name}</div>
                                        <div className="text-base text-slate-500 mt-1">معلومات حول المنتج</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {
                                                funding.firstPurchaseAt !== null 
                                                ? new Date(funding.firstPurchaseAt).toLocaleString("en-GB",{day: "2-digit",month: "2-digit",year: "numeric",})
                                                : 'لم يتم الشراء بعد'
                                            }
                                        </div>
                                        <div className="text-base text-slate-500 mt-1">تاريخ أول شراء للمنتج</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.products_part !== 0 
                                                ? (funding.totalPurchaseAmount / funding.products_part * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalPurchaseAmount} دج</div>
                                        <div className="text-base text-slate-500 mt-1">ثمن شراء الكلي للمنتج</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.products_part !== 0 
                                                ? (100-funding.totalPurchaseAmount / funding.products_part * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>                     
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.products_part-funding.totalPurchaseAmount} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال المتبقي</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">                        
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalPurchaseQuantity}</div>
                                        <div className="text-base text-slate-500 mt-1">الكمية المشترات</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">                        
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalPurchaseAmount/funding.totalPurchaseQuantity} دج</div>
                                        <div className="text-base text-slate-500 mt-1">سعر الوحدة</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Product report */}

                    {/* Advertising report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">معلومات حول سبونسور</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <RefreshCcw className='w-4 h-4 mr-3'/>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {
                                                funding.firstAdvertisementAt !== null 
                                                ? new Date(funding.firstAdvertisementAt).toLocaleString("en-GB",{day: "2-digit",month: "2-digit",year: "numeric",})
                                                : 'لم يتم إطلاق سبونسور'
                                            }
                                        </div>
                                        <div className="text-base text-slate-500 mt-1">تاريخ بداية الإشهار</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.products_part !== 0 
                                                ? (funding.totalAdvertisements / funding.advertising_part * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalAdvertisements} دج</div>
                                        <div className="text-base text-slate-500 mt-1">ثمن الإشهار الكلي للمنتج</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.advertising_part !== 0 
                                                ? (100-funding.totalAdvertisements / funding.advertising_part * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>                     
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.advertising_part-funding.totalAdvertisements} دج</div>
                                        <div className="text-base text-slate-500 mt-1">رأس المال الإشهار المتبقي</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Advertising report */}

                    {/* Orders report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">معلومات حول الطلبيات</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <RefreshCcw className='w-4 h-4 mr-3'/>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {
                                                funding.firstOrderAt !== null 
                                                ? new Date(funding.firstOrderAt).toLocaleString("en-GB",{day: "2-digit",month: "2-digit",year: "numeric",})
                                                : 'لم تخرج أي طلبية بعد'
                                            }
                                        </div>
                                        <div className="text-base text-slate-500 mt-1">تاريخ بداية خروج الطلبيات</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                100 %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalOrders}</div>
                                        <div className="text-base text-slate-500 mt-1">العدد الكلي للطلبيات</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.totalOrders !== 0 
                                                ? (100-funding.totalPendingOrders / funding.totalOrders * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalPendingOrders}</div>
                                        <div className="text-base text-slate-500 mt-1">في طور التوصيل</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.totalOrders !== 0 
                                                ? (100-funding.totalDeliveredOrders / funding.totalOrders * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalDeliveredOrders}</div>
                                        <div className="text-base text-slate-500 mt-1">الطلبيات الموصلة</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                {funding.totalOrders !== 0 
                                                ? (100-funding.totalReturnedOrders / funding.totalOrders * 100).toFixed(0) 
                                                : "N/A"} %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalReturnedOrders}</div>
                                        <div className="text-base text-slate-500 mt-1">الطلبيات الراجعة</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Orders report */}

                    {/* Invoice report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">معلومات حول الطلبيات</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <RefreshCcw className='w-4 h-4 mr-3'/>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {
                                                funding.firstInvoiceAt !== null 
                                                ? new Date(funding.firstInvoiceAt).toLocaleString("en-GB",{day: "2-digit",month: "2-digit",year: "numeric",})
                                                : 'لم يتم إستلام أي شيئ'
                                            }
                                        </div>
                                        <div className="text-base text-slate-500 mt-1">تاريخ بداية إستلام</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">           
                                        <div className="flex">
                                            <div className="ml-auto">
                                                <div className="report-box__indicator bg-primary tooltip cursor-pointer">
                                                100 %
                                                </div>
                                            </div>            
                                        </div>   
                                        <div className="text-3xl font-medium leading-8 mt-6">{funding.totalInvoicesOrders}</div>
                                        <div className="text-base text-slate-500 mt-1">العدد الطلبيات الداخلة</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Invoice report */}
                </Page>
            </AdminLayout>
        </>
    )
}
export default FundingShow;