import React, { ReactNode, useEffect } from 'react';
import MobileMenu from './Partiels/MobileMenu';
import SideMenu from './Partiels/SideMenu';
import InvestorTopbar from './Partiels/InvestorTopbar';
import { Investor, User } from '@/types';
import { MenuItem } from '@/types/MenuItem'

interface InvestorLayoutProps {
    investor: Investor;
    menu: MenuItem[];
    breadcrumb?: ReactNode;
    children?: React.ReactNode;
}


const InvestorLayout: React.FC<InvestorLayoutProps> = ({ investor, menu, breadcrumb, children  }) => {

    return (
        <>
            <MobileMenu menuItems={menu}/>
            <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
                <SideMenu menuItems={menu} />
                <div className="content">
                    <InvestorTopbar breadcrumb={breadcrumb} investor={investor}/>
                    {children}
                </div>
            </div>
        </>
    );
}
export default InvestorLayout;