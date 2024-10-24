import InvestorLayout from "@/Layouts/InvestorLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Page from "@/Components/Page";
import SettingsSideNav from "./Partiels/SettingsSideNav";
import { useState } from "react";
import GeneralSettings from "./Partiels/GeneralSettings";

const Settings: React.FC<PageProps> = ({ auth, menu, settings }) => {
    const [activeMenu, setActiveMenu] = useState<string>("general")
    const handleMenuClick = (menu: string)=>{
        setActiveMenu(menu)
    }
    return (
        <>
            <Head title="Settings" />

            <InvestorLayout
                investor={auth.investor}
                menu={menu}
                breadcrumb={
                    <li className="breadcrumb-item active" aria-current="page">
                        Settings
                    </li>
                }
            >
            <Page title="Settings" header="">
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <SettingsSideNav settings={settings} auth={auth} menu={menu} active={activeMenu} handleMenuClick={handleMenuClick}/>
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        {activeMenu == "general" && settings && (<GeneralSettings settings={settings}/>)}
                    </div>
                </div>
            </Page>
            </InvestorLayout>
        </>
    );
}
export default Settings;