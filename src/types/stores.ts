import { Category } from "./categories";

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
};

export type StoreWorkingHour = {
    start: string;
    end: string;
};