import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Page from '@/Components/Page';
import ProfileMenu from './Partials/Menu';
import { MenuItem } from '@/types/MenuItem';

export default function Edit({ auth, menu, mustVerifyEmail, status }: PageProps<{ menu:MenuItem, mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AdminLayout
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Profile</li>}
        >
            <Head title="Profile" />
            <Page title="Profile" header="">
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <ProfileMenu auth={auth} menu={menu}/>
                </div>
            </Page>
        </AdminLayout>
    );
}
