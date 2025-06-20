import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeftIcon, ChevronDownIcon, TrashIcon, XMarkIcon, ReceiptPercentIcon, DocumentCurrencyEuroIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/products";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import Addresses from "../header/Addresses";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { StoreCartSummaryProduct } from "./StoreCartSummaryProduct";
import { StorePaymentMethod } from "./StorePaymentMethod";
import { useTranslation } from "react-i18next";

type Props = {
    open: boolean;
    loading?: boolean;
    store: Store;
    setOpen: (value: boolean) => void;
    onOpenShippingMethod: () => void;
    onOpenPaymentMethod: () => void;
    onSendOrder: () => void;
};

export function StoreCartSummaryDialog({ open, loading, store, setOpen, onOpenShippingMethod, onOpenPaymentMethod, onSendOrder }: Props) {

    const { t } = useTranslation(undefined, { keyPrefix: 'store.summary' });
    const general = useTranslation();
    const cartProducts = useCartStore(state => state.selectStore(+store.id!)?.products);
    const cartTotalProducts = useCartStore(state => state.storeTotalProducts(+store.id!));
    const cartTotalPrice = useCartStore(state => state.storeTotalPrice(+store.id!));
    const shippingMethod = useCartStore(state => state.selectStore(+store.id)?.shippingMethod);
    const paymentMethod = useCartStore(state => state.selectStore(+store.id!)?.paymentMethod);
    const couponCode = useCartStore(state => state.selectStore(+store.id!)?.couponCode);
    const setCouponCode = useCartStore(state => state.setCouponCode);

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
                            <h1 className="font-bold text-2xl">{t("title")}</h1>
                            <a
                                href="javascript:void(0)"
                                className="inline-flex items-center gap-2"
                                onClick={() => onOpenShippingMethod()}
                            >
                                <span className="text-xs capitalize">{general.t(`shipping_method.${shippingMethod}_estimation`, {estimation: "10' - 20'"})}</span>
                                <ChevronDownIcon className="size-3" />
                            </a>
                        </div>
                        <div className="mt-3 px-4 pb-6 border-b border-gray-300">
                            <div><Addresses cartSummary={true} /></div>
                            <div className="flex gap-4 mt-5">
                                <input
                                    id="coupon"
                                    name="coupon"
                                    type="text"
                                    placeholder={t("coupon_placeholder")}
                                    required
                                    autoComplete="off"
                                    className="input input-lg"
                                    defaultValue={couponCode}
                                    onChange={(e) => setCouponCode(store.id!, e.target.value)}
                                />
                                <StorePaymentMethod
                                    paymentMethod={paymentMethod}
                                    onClick={onOpenPaymentMethod}
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            {
                                cartProducts?.map((cartProduct, index, array) => {
                                    return (
                                        <div key={index}
                                            className={"pb-6 border-b border-gray-300" + (index !== array.length - 1 ? " mb-6 " : "")}>
                                            <StoreCartSummaryProduct
                                                store={store}
                                                product={cartProduct}
                                                onSelectProduct={(product) => { }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="p-4 flex items-center gap-4 pb-14">
                            <div className="grow-0">
                                <span className="inline-flex items-center justify-center w-[26px] h-[26px] bg-gray-200 rounded">
                                    <DocumentCurrencyEuroIcon className="size-3" />
                                </span>
                            </div>
                            <div className="grow-1">
                                {t("cart_total")}
                            </div>
                            <div className="grow-0 font-bold text-xs">
                                { cartTotalPrice?.toFixed(2) }€
                            </div>
                        </div>
                        <div className="fixed p-3 w-full bg-white z-1" style={{ bottom: 0, left: 0 }}>
                            <button
                                className="btn btn-lg btn-success text-white btn-block p-2 grid grid-cols-7"
                                disabled={loading}
                                onClick={() => {
                                    if (cartTotalProducts > 0) {
                                        onSendOrder();
                                    } else {
                                        setOpen(false);
                                    }
                                }}
                            >
                                {
                                loading 
                                    ? (
                                        <span className="loading loading-spinner"></span>
                                    )
                                    : (
                                        cartTotalProducts > 0 ? (
                                            <>
                                                <div className="col-span-1 text-start">
                                                    <span className="inline-block p-1 min-w-[28px] font-bold text-black text-center rounded-lg bg-white text-sm">
                                                        { cartTotalProducts }
                                                    </span>
                                                </div>
                                                <div className="col-span-5 font-bold text-lg text-black text-center">{t("send_order")}</div>
                                                <div className="col-span-1 font-bold text-black text-end">
                                                    { cartTotalPrice?.toFixed(2) }€
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center text-black col-span-full">
                                                {t("add_more")}
                                            </div>
                                        )
                                    )
                                }
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}