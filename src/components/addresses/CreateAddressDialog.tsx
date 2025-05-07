import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import AddressForm from "../profile/AddressForm";
import { CreateAddressPayload } from "../../types/addresses";

type Props = {
    open: boolean;
    loading: boolean;
    setOpen: (value: boolean) => void;
    onCreateAddress: (data: CreateAddressPayload) => void;
};

export function CreateAddressDialog({ open, loading, setOpen, onCreateAddress }: Props) {

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative overflow-y-auto bg-white min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >

                        <div className="flex justify-start items-center p-4 w-full" style={{ top: 0 }}>
                            <button
                                className="btn btn-circle size-8"
                                onClick={() => setOpen(false)}
                            >
                                <ChevronLeftIcon className="size-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h1 className="font-bold text-2xl">Create address</h1>
                        </div>
                        <div className='p-4'>
                            <AddressForm
                                loading={loading}
                                onSubmit={onCreateAddress}
                            />
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}