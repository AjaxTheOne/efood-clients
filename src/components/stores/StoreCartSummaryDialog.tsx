import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeftIcon, ChevronDownIcon, TrashIcon, XMarkIcon, ReceiptPercentIcon, DocumentCurrencyEuroIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/products";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import Addresses from "../header/Addresses";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { StoreCartSummaryProduct } from "./StoreCartSummaryProduct";

type Props = {
    open: boolean;
    store: Store;
    setOpen: (value: boolean) => void;
    onOpenShippingMethod: () => void;
};

export function StoreCartSummaryDialog({ open, store, setOpen, onOpenShippingMethod }: Props) {

    const cartProducts = useCartStore(state => state.selectStore(+store.id!)?.products);
    const shippingMethod = useCartStore(state => state.selectStore(+store.id)?.shippingMethod);

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
                        className="relative bg-white min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
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
                            <h1 className="font-bold text-2xl">Cart</h1>
                            <a
                                href="javascript:void(0)"
                                className="flex items-center gap-2"
                                onClick={() => onOpenShippingMethod()}
                            >
                                <span className="text-xs capitalize">{shippingMethod}: 10' - 20'</span>
                                <ChevronDownIcon className="size-3" />
                            </a>
                        </div>
                        <div className="mt-3 px-4 pb-6 border-b border-gray-300">
                            <Addresses cartSummary={true} />
                        </div>
                        <div className="p-4">
                            {
                                cartProducts.map((cartProduct, index, array) => {
                                    return (
                                        <div key={index} 
                                            className={"pb-6 border-b border-gray-300" + (index !== array.length - 1 ? " mb-6 ":"")}>
                                            <StoreCartSummaryProduct
                                                store={store}
                                                product={cartProduct}
                                                onSelectProduct={(product) => {}}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="p-4 flex items-center gap-4 pb-14">
                            <div className="grow-0">
                                <span className="inline-flex items-center justify-center w-[26px] h-[26px] bg-gray-200 rounded">
                                    <DocumentCurrencyEuroIcon className="size-3"/>
                                </span>
                            </div>
                            <div className="grow-1">
                                Cart total
                            </div>
                            <div className="grow-0 font-bold text-xs">
                                {
                                    cartProducts.reduce((total, product) => {
                                        return total + (product.quantity * product.product.price);
                                    }, 0).toFixed(2)
                                }€
                            </div>
                        </div>
                        <div className="fixed p-3 w-full bg-white z-1" style={{ bottom: 0, left: 0 }}>
                            <button
                                className="btn btn-lg btn-success text-white btn-block p-2 grid grid-cols-3"
                            >
                                <div className="col-span-1 text-start">
                                    <span className="inline-block p-1 min-w-[28px] font-bold text-black text-center rounded-lg bg-white text-sm">
                                        {
                                            cartProducts.reduce((total, product) => {
                                                return total + product.quantity;  
                                            }, 0)
                                        }
                                    </span>
                                </div>
                                <div className="col-span-1 font-bold text-lg text-black text-center">Continue</div>
                                <div className="col-span-1 font-bold text-black text-end">
                                    {
                                        cartProducts.reduce((total, product) => {
                                            return total + (product.quantity * product.product.price);  
                                        }, 0).toFixed(2)
                                    }€
                                </div>
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}