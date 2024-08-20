import { PropsWithChildren, useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../assets/css/style.css';

import AdminNavHeader from './Partiels/AdminNavHeader';
import AdminChatbox from './Partiels/AdminChatbox';
import AdminHeader from './Partiels/AdminHeader';
import AdminSidebar from './Partiels/AdminSidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleFinish = () => setLoading(false);
        const handleError = () => setLoading(false);
    
        Inertia.on('start', handleStart);
        Inertia.on('finish', handleFinish);
        Inertia.on('error', handleError);
    
      }, []);
    return (
        <>
            <div id="main-wrapper show">
                <AdminNavHeader />
                <AdminChatbox />
                <AdminHeader />
                <AdminSidebar />
                <div className="content-body">
                    
                </div>
            </div>
        </>
    );
}
