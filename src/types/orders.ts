import { Address } from "./addresses";
import { BaseResponse } from "./helpers";
import { Product } from "./products";
import { PaymentMethod, ShippingMethod, Store } from "./stores";

export type PaymentStatus = "pending" | "completed" | "failed";
export type ShippingStatus = "pending" | "completed" | "failed";
export type OrderStatus = 'pending' | 'processing' | 'out_for_delivery' | 'completed' | 'cancelled';

export type Order = {
    id: number;

    address_id: number;
    address: Address;
    coupon_code: string | null;
    delivery_time: number;
    discount: number;
    note: string | null;
    payment_id: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    products: OrderProduct[];
    products_price: number;
    shipping_method: ShippingMethod;
    shipping_price: number;
    shipping_status: ShippingStatus;
    status: OrderStatus;
    store_id: number;
    store: Store;
    tip: number;
    total_price: number;

    created_at: string;
    updated_at: string;
};

export type OrderProduct = {
    id: number;
    note: string;
    price: number;
    product_name: string;
    quantity: number;
    total_price: number;
    product: Product;
};

export type OrderCreatePayload = {
    address_id: number;
    store_id: number;
    payment_method: PaymentMethod;
    shipping_method: ShippingMethod;
    products: {
        product_id: number;
        quantity: number;
        note: string;
    }[];
    note?: string;
    tip?: number;
    coupon_code?: null | string;
};

export type OrderCreateResponse = BaseResponse<{
    order: Order;
    viva_redirect_url: string;
}>;

export type OrderListResponse = BaseResponse<{
    orders: Order[];
}>;

export type OrderResponse = BaseResponse<{
    order: Order;
}>;