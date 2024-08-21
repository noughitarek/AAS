import { MenuItem } from './MenuItem'

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
type DynamicSetting = {
    [key: string]: any;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    menu: MenuItem[];
    settings?: DynamicSetting;
};

export interface User{
    id: number;
    name: string;
    role: string;
    permissions: string;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}
export interface Link{
    url: string;
    label: string | number;
    active: boolean;
}
export interface Desk{
    id: number;
    name: string;
    reference?: string;
    from_stock: boolean;
    ecotrack_idf?: string ;
    ecotrack_token?:string;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}
export interface Data<T>{
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}