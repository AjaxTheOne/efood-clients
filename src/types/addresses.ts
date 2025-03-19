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

export type CreateAddressPayload = {
    street: string;
    number?: string;
    city?: string;
    postalCode?: string;

    latitude: number;
    longitude: number;

    phone?: string;
    floor?: string;
    door?: string;
};

export type AddressResponse = BaseResponse<{
    addresses: Address[];
}>;

export type CreateAddressResponse = BaseResponse<{
    address: Address;
}>;