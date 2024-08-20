import { DynamicSetting, PageProps } from "@/types";
import { Save } from "lucide-react";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const GeneralSettings: React.FC<{ settings: DynamicSetting }> = ({ settings }) => {
    const [saving, setSaving] = useState<boolean>(false)



    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="intro-y box col-span-12 2xl:col-span-6">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        General settings
                    </h2>
                    <button onClick={()=>{}} disabled={saving} className="btn btn-outline-secondary hidden sm:flex">
                        { !saving && (<><Save className="w-4 h-4 mr-2"/> Save</>)}
                        { saving && (<><ReactLoading type="spin" color="green" height={18} width={18} />&nbsp; Saving</>)}
                    </button>
                </div>
                <div className="p-5">

                </div>
            </div>
        </div>
    );
};
export default GeneralSettings;
