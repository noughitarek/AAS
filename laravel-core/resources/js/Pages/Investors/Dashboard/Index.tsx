import InvestorLayout from '@/Layouts/InvestorLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth, investor_menu }: PageProps) {
    return (
        <>
            <Head title="Dashboard" />
            
            <InvestorLayout
                investor={auth.investor}
                menu={investor_menu}
                breadcrumb={<li className="breadcrumb-item active" aria-current="page">Dashboard</li>}
            >
s

            </InvestorLayout>
        </>
    )
}