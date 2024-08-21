import React, { ReactNode, useEffect } from 'react';
import MobileMenu from './Partiels/MobileMenu';
import SideMenu from './Partiels/SideMenu';
import Topbar from './Partiels/Topbar';
import { User } from '@/types';
import { MenuItem } from '@/types/MenuItem'

interface AdminLayoutProps {
    user: User;
    menu: MenuItem[];
    breadcrumb?: ReactNode;
    children?: React.ReactNode;
}


const AdminLayout: React.FC<AdminLayoutProps> = ({ user, menu, breadcrumb, children  }) => {
    
    return (
        <>
            <MobileMenu menuItems={menu}/>
            <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
                <SideMenu menuItems={menu} />
                <div className="content">
                    <Topbar breadcrumb={breadcrumb} user={user}/>
                    {children}
                </div>
            </div>
        </>
    );
}
export default AdminLayout;