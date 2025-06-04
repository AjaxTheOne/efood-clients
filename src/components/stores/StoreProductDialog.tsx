import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ProductQuantityControls } from "./ProductQuantityControls";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/products";
import { useCartStore } from "../../context/CartStore";
import { Store } from "../../types/stores";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    open: boolean;
    store: Store;
    selectedProduct: Product | null;
    productQuantity: number;

    setOpen: (value: boolean) => void;
    onDecreaseQuantity: (event?) => void;
    onIncreaseQuantity: (event?) => void;
};

export function StoreProductDialog({ open, store, selectedProduct, productQuantity, onDecreaseQuantity, onIncreaseQuantity, setOpen }: Props) {

    const { t } = useTranslation(undefined, { keyPrefix: 'store.product.dialog' });
    const addItem = useCartStore(state => state.addItem);
    const cartProduct = useCartStore(state => state.selectProduct(store!.id, selectedProduct!?.id));
    
    const [note, setNote] = useState(cartProduct?.note || "");

    useEffect(() => {
        setNote(cartProduct?.note || "");
    }, [cartProduct]);

    const addToCart = () => {
        addItem(store!.id, selectedProduct!, productQuantity, note);
        setNote("");
        setOpen(false);
    };

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
                        className="relative bg-gray-50 min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div
                            className="hero relative h-[300px]"
                            style={{
                                backgroundImage: "url(" + selectedProduct?.mainImage + ")",
                            }}
                        >
                            <div className="flex justify-end items-center absolute p-4 w-full" style={{ top: 0 }}>
                                <button
                                    className="btn btn-circle size-8"
                                    onClick={() => setOpen(false)}
                                >
                                    <XMarkIcon className="size-4" />
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-b-2xl p-4 shadow-lg">
                            <h2 className="font-bold text-lg mb-2">{selectedProduct?.name}</h2>
                            <p className="text-gray-500 text-xs mb-5">{selectedProduct?.description}</p>
                            <div className="font-bold text-lg">{selectedProduct?.price.toFixed(2)}€</div>
                        </div>
                        <div className="p-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">{t("notes")}</legend>
                                <textarea 
                                    value={note}
                                    onChange={(ev) => { setNote(ev.target.value) }}
                                    className="textarea h-24 bg-white w-full" 
                                    placeholder={t("preferences_placeholder")}>
                                </textarea>
                            </fieldset>
                        </div>
                        <div className="bg-white p-4 shadow-lg flex justify-between gap-10">
                            <ProductQuantityControls
                                quantity={productQuantity}
                                onDecreaseQuantity={onDecreaseQuantity}
                                onIncreaseQuantity={onIncreaseQuantity}
                            />
                            <div className="grow">
                                <button
                                    className="btn btn-lg btn-success text-white btn-block"
                                    onClick={() => addToCart()}
                                >
                                    {t("add_to_cart")}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}