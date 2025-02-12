import { BaseResponse } from "./helpers";

export type Address = {
    id: number;

    street: string;
    number?: number;
    city?: string;
    postal_code?: string;

    latitude: number;
    longitude: number;

    phone?: string;
    floor?: string;
    door?: string;
};

export type AddressResponse = BaseResponse<{
    addresses: Address[];
}>;