import { useState } from "react";
import { Address, CreateAddressPayload } from "../../types/addresses";
import { useTranslation } from "react-i18next";

const center = {
    lat: 40.6449329,
    lng: 22.9416259,
};

type Props = {
    loading: boolean;
    address?: Address;
    onSubmit: (data: CreateAddressPayload) => void;
};

function AddressForm({ loading, address, onSubmit }: Props) {

    const { t, i18n } = useTranslation(undefined, { keyPrefix: 'header.addresses.add_new' });
    const [street, setStreet] = useState(address?.street || "");
    const [number, setNumber] = useState(address?.number?.toString() || "");
    const [city, setCity] = useState(address?.city || "");
    const [postalCode, setPostalCode] = useState(address?.postal_code || "");
    const [latitude, setLatitude] = useState(center.lat);
    const [longitude, setLongitude] = useState(center.lng);
    const [phone, setPhone] = useState(address?.phone || "");
    const [floor, setFloor] = useState(address?.floor || "");
    const [door, setDoor] = useState(address?.door || "");

    return (
        <div className="text-left">

            <div className="my-10 grid gap-x-6 gap-y-4 grid-cols-1">

                <div className="col-span-1">
                    <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.street_address")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="street-address"
                            value={street}
                            onChange={ev => setStreet(ev.target.value)}
                            name="street-address"
                            type="text"
                            autoComplete="street-address"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="col-span-1">
                    <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.number")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="street-number"
                            value={number}
                            onChange={ev => setNumber(ev.target.value)}
                            name="street-number"
                            type="text"
                            autoComplete="street-number"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="col-span-1">
                    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.city")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="city"
                            value={city}
                            onChange={ev => setCity(ev.target.value)}
                            name="city"
                            type="text"
                            autoComplete="address-level2"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="col-span-1">
                    <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.postal")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="postal-code"
                            value={postalCode}
                            onChange={ev => setPostalCode(ev.target.value)}
                            name="postal-code"
                            type="text"
                            autoComplete="postal-code"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="">
                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.phone")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="phone"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                            name="phone"
                            type="text"
                            autoComplete="phone"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="">
                    <label htmlFor="floor" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.floor")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="floor"
                            value={floor}
                            onChange={ev => setFloor(ev.target.value)}
                            name="floor"
                            type="text"
                            autoComplete="floor"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="">
                    <label htmlFor="door" className="block text-sm/6 font-medium text-gray-900">
                        {t("form.door")}
                    </label>
                    <div className="mt-2">
                        <input
                            id="door"
                            value={door}
                            onChange={ev => setDoor(ev.target.value)}
                            name="door"
                            type="text"
                            autoComplete="door"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
            </div>
            <button
                type="button"
                disabled={loading}
                onClick={() => onSubmit({
                    street,
                    number,
                    postalCode,
                    latitude,
                    longitude,
                    floor,
                    door,
                    city,
                    phone
                })}
                className="inline-flex w-full justify-center btn btn-accent"
            >
                {
                    loading
                        ? <span className="loading loading-spinner"></span>
                        : (
                            address 
                            ? t("edit_address")
                            : t("create_address")
                        )
                }
            </button>
        </div>
    );
}

export default AddressForm;