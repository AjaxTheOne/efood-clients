import { Category } from "./categories";
import { BaseResponse } from "./helpers";
import { ProductCategory } from "./products";

export type Store = {
    id: number;
    address: string;
    categories: Category[];
    cover: string;
    distance: number; // From the current user address
    latitude: string;
    longitude: string;
    logo: string;
    minimum_cart_value: string;
    name: string;
    phone: string;
    working_hours: StoreWorkingHour[];

    shipping_price?: number; // Calculated for each user based on distance
    product_categories?: ProductCategory[];
};

export type StoreWorkingHour = {
    start: string;
    end: string;
};

export type StoresResponse = BaseResponse<{
    stores: Store[];
}>;

export type StoreResponse = BaseResponse<{
    store: Store;
}>;

export type ShippingMethod = "delivery" | "takeaway";
export type PaymentMethod = "cod" | "card";