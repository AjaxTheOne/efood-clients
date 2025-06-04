import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, MapPinIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import { Address, UpdateAddressResponse, UpdateAddressPayload, AddressResponse, CreateAddressPayload, CreateAddressResponse } from "../types/addresses";
import { EditAddressDialog } from '../components/addresses/EditAddressDialog';
import { CreateAddressDialog } from '../components/addresses/CreateAddressDialog';
import { useTranslation } from 'react-i18next';

function Addresses() {
    const { user, logout } = useAuth();
    const { t } = useTranslation(undefined, { keyPrefix: "addresses" });

    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const [selectedAddress, setSelectedAddress] = useState<Address>();
    const [openEditAddress, setOpenEditAddress] = useState(false);
    const [openCreateAddress, setOpenCreateAddress] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get<AddressResponse>("/client/addresses")
            .then((response) => {
                if (!response.data.success) {
                    return;
                }

                setAddresses(response.data.data.addresses);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const onUpdateAddress = (data: UpdateAddressPayload) => {
        setLoading(true);
        axiosInstance.put<UpdateAddressResponse>(
            "/client/addresses/" + selectedAddress!.id,
            {
                ...data,
                postal_code: data.postalCode
            }
        )
            .then((response) => {
                if (!response.data.success) {
                    return;
                }
                setAddresses(addresses => addresses.map(address => {
                    if (address.id === response.data.data.address.id) {
                        return response.data.data.address;
                    }
                    return address;
                }));
                setOpenEditAddress(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onCreateAddress = (data: CreateAddressPayload) => {
        setLoading(true);
        axiosInstance.post<CreateAddressResponse>(
            "/client/addresses",
            {
                ...data,
                postal_code: data.postalCode
            }
        )
            .then((response) => {
                if (!response.data.success) {
                    return;
                }
                setAddresses(addresses => [
                    ...addresses,
                    response.data.data.address
                ]);
                setOpenCreateAddress(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDeleteAddress = () => {
        setAddresses(addresses => addresses.filter(address => {
            return address.id !== selectedAddress?.id
        }));
        axiosInstance.delete<UpdateAddressResponse>("/client/addresses/" + selectedAddress!.id)
            .then((response) => {
                if (!response.data.success) {
                    return;
                }
            });
    }

    return (
        <div>
            <div className='my-4 px-2'>
                <Link to={"/account"}>
                    <button className="btn btn-circle btn-ghost">
                        <ChevronLeftIcon className="size-8" />
                    </button>
                </Link>
            </div>
            <div className='p-4'>
                <div className='font-bold text-2xl'>
                    {t("title")}
                </div>
                <ul className='divide-y divide-gray-100 mt-10 mb-5'>
                    {
                        loading ? (
                            [1, 2, 3].map(_ =>
                                <li className="flex flex-col py-4 gap-2" key={_}>
                                    <div className='skeleton h-4 w-35'></div>
                                    <div className='skeleton h-2.5 w-65'></div>
                                    <div className='skeleton h-2.5 w-75'></div>
                                </li>
                            )
                        ) : (
                            addresses.map(address =>
                                <li key={address.id} className='flex items-center justify-between gap-2 py-4'>
                                    <div className='flex flex-col gap-2'>
                                        <span className="flex items-center gap-1 font-medium text-gray-900 group-has-checked:text-indigo-900">
                                            <MapPinIcon className="size-5" /> {address.street} {address.number}
                                        </span>
                                        <span className="block text-xs text-gray-500 group-has-checked:text-indigo-700">
                                            {address.city}, {address.postal_code}
                                        </span>
                                        {
                                            address.floor ? (
                                                <span className="block text-xs text-gray-500 group-has-checked:text-indigo-700">
                                                    {t("floor", {floor: address.floor})}
                                                </span>
                                            ) : null
                                        }
                                    </div>
                                    <div className='flex items-center justify-between shrink-1 gap-3'>
                                        <button
                                            className="btn btn-square btn-sm btn-info"
                                            onClick={() => {
                                                setSelectedAddress(address);
                                                setOpenEditAddress(true);
                                            }}
                                        >
                                            <PencilIcon className='size-3 text-white' />
                                        </button>
                                        <button
                                            className="btn btn-square btn-sm btn-error"
                                            onClick={() => {
                                                setSelectedAddress(address);
                                                // @ts-ignore
                                                document.getElementById('address-delete-confirm').showModal();
                                            }}
                                        >
                                            <TrashIcon className='size-3 text-white' />
                                        </button>
                                    </div>
                                </li>
                            )
                        )
                    }
                </ul>
                <button 
                    className='btn btn-success btn-lg w-full'
                    disabled={loading}
                    onClick={() => setOpenCreateAddress(true)}
                >
                   {t("create_address")}
                </button>
            </div>
            <EditAddressDialog
                open={openEditAddress}
                loading={loading}
                address={selectedAddress!}
                setOpen={setOpenEditAddress}
                onUpdateAddress={onUpdateAddress}
            />
            <CreateAddressDialog
                open={openCreateAddress}
                loading={loading}
                setOpen={setOpenCreateAddress}
                onCreateAddress={onCreateAddress}
            />
            <dialog id="address-delete-confirm" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{t("delete_title")}</h3>
                    <p className="py-4">{t("delete_description")}</p>
                    <div className="modal-action">
                        <form method="dialog" className=' flex gap-2'>
                            <button className="btn btn-sm">{t("delete_close")}</button>
                            <button className="btn btn-sm btn-error text-white" onClick={() => onDeleteAddress()}>{t("delete_action")}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Addresses;