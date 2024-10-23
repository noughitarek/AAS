import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Funding, PageProps } from '@/types';
import Page from '@/Components/Page';

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
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">General Report</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            icon-name="refresh-ccw"
                            data-lucide="refresh-ccw"
                            className="lucide lucide-refresh-ccw w-4 h-4 mr-3"
                            >
                            <path d="M3 2v6h6" />
                            <path d="M21 12A9 9 0 006 5.3L3 8" />
                            <path d="M21 22v-6h-6" />
                            <path d="M3 12a9 9 0 0015 6.7l3-2.7" />
                            </svg>
                            Reload Data
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="shopping-cart"
                                    data-lucide="shopping-cart"
                                    className="lucide lucide-shopping-cart report-box__icon text-primary"
                                >
                                    <circle cx={9} cy={21} r={1} />
                                    <circle cx={20} cy={21} r={1} />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    
                                    33%
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">{funding.totalPurchaseAmount}</div>
                                <div className="text-base text-slate-500 mt-1">total Purchase Amount</div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="credit-card"
                                    data-lucide="credit-card"
                                    className="lucide lucide-credit-card report-box__icon text-pending"
                                >
                                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                                    <line x1={1} y1={10} x2={23} y2={10} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-danger tooltip cursor-pointer">
                                    
                                    2%
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-down"
                                        data-lucide="chevron-down"
                                        className="lucide lucide-chevron-down w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">3.721</div>
                                <div className="text-base text-slate-500 mt-1">New Orders</div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="monitor"
                                    data-lucide="monitor"
                                    className="lucide lucide-monitor report-box__icon text-warning"
                                >
                                    <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
                                    <line x1={8} y1={21} x2={16} y2={21} />
                                    <line x1={12} y1={17} x2={12} y2={21} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    
                                    12%
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">2.149</div>
                                <div className="text-base text-slate-500 mt-1">
                                Total Products
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="user"
                                    data-lucide="user"
                                    className="lucide lucide-user report-box__icon text-success"
                                >
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    
                                    22%
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">
                                152.040
                                </div>
                                <div className="text-base text-slate-500 mt-1">
                                Unique Visitor
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </Page>
            </AdminLayout>
        </>
    )
}
export default FundingShow;