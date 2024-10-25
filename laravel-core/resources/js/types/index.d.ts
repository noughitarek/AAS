import { MenuItem } from './MenuItem'

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    permissions: string;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}
type DynamicSetting = {
    [key: string]: any;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        investor: Investor;
    };
    menu: MenuItem[];
    investor_menu: MenuItem[];
    settings?: DynamicSetting;
};

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
export interface Product{
    id: number;
    name: string;
    reference?: string;
    stock: number;
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
export interface Wilaya{
    id: number;
    name: string;
    name_ar: string;
    communes: Commune[];
}
export interface Commune{
    id: number;
    name: string;
    name_ar: string;
    wilaya_id: number;
    wilaya: Wilaya;
}
export interface DeliveryMen{
    id: number;
    phone: string;
    commune_id: number;
    commune: Commune;
    desk_id : number;
    desk : Desk;
}
export interface Investor {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    permissions: string[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}
export interface Funding {
    id: number;
    total_amount: number;
    products_percentage: number;
    products_part: number;

    totalPurchaseAmount: number;
    totalPurchaseQuantity: number;
    firstPurchaseAt: Date | null;

    totalAdvertisements: number;
    firstAdvertisementAt: Date | null;

    advertising_percentage: number;
    advertising_part: number;
    workers_percentage: number;
    workers_part: number;
    product_id: number;
    product: Product;
    desk_id: number;
    desk: Desk;
    investor_id: number;
    investor: Investor;
    type: number;
    investor_percentage: number;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
    daym2?: number;
    daym1?: number;
    day0?: number;
    dayp1?: number;
    dayp2?: number;
}
export interface Order{
    id: number;
    name: string;
    phone: string;
    phone2: string;
    address: string;
    commune_id: number;
    commune: Commune;
    total_price: number;
    delivery_fee: number;
    clean_price: number;
    tracking: string;
    intern_tracking: string;
    fragile: number;
    stopdesk: number;
    desk_id: number;
    desk: Desk;
    funding_id: number;
    validated_at: Date;
    shipped_at: Date;
    wilaya_at: Date;
    delivery_at: Date;
    delivered_at: Date;
    ready_at: Date;
    recovered_at: Date;
    returned_at: Date;
    returned_ready_at: Date;
    order_products: OrderProducts[];
    created_at: Date;
    created_by: User;
    updated_by: User;
    deleted_by: User;
}
export interface OrderProducts{
    id: number;
    quantity: number;
    product: Product;
    order: Order;
}
export interface Invoice{
    id: number;
    desk: Desk;
    desk_id: number;
    total_amount: number;
    total_orders: number;
    order_id: number;
    order: Order;
    product_id: number;
    product: Product;
    quantity: number;
}