import { ChevronDownIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/products";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import { useEffect, useState } from "react";
import { ProductQuantityControls } from "./ProductQuantityControls";

type Props = {
    store: Store,
    product: Product,
    onSelectProduct: (product: Product) => void,
};

export function StoreProduct({ store, product, onSelectProduct }: Props) {
    const productQuantity = useCartStore(state => state.selectProduct(store.id, product.id)?.quantity);
    const removeItem = useCartStore(state => state.removeItem);
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);

    const [showQuantity, setShowQuantity] = useState(false);

    useEffect(() => {
        if (!productQuantity) {
            setShowQuantity(false);
        }
    }, [productQuantity]);

    return (
        <div key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`relative flex justify-between gap-2 py-3`}
        >
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm">
                    {product.name}
                </h3>
                {
                    product.description &&
                    <p className="text-gray-500 text-xs">{product.description}</p>
                }
                <div className="text-sm">
                    From {product.price}€
                </div>
            </div>

            <div>
                <div className="avatar">
                    <div className="w-26 rounded-xl">
                        <img src={product.mainImage} />
                    </div>
                </div>
            </div>

            <div
                className="absolute"
                style={{ right: "-.5rem", bottom: 0 }}
            >
                {
                    !!productQuantity ? (
                        !showQuantity ? (
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowQuantity(true);
                                }}
                                className="btn btn-neutral btn-square size-8"
                            >
                                {productQuantity}
                                <ChevronDownIcon className="size-2 text-white" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button 
                                    className="btn btn-square size-8"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setShowQuantity(false);
                                    }}
                                >
                                    <XMarkIcon className="size-4 text-gray-500"/>
                                </button>
                                <button 
                                    className="btn btn-square size-8"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeItem(store.id, product);
                                        setShowQuantity(false);
                                    }}
                                >
                                    <TrashIcon className="size-4 text-gray-500"/>
                                </button>
                                <div className="p-1 bg-white border border-gray-200 rounded">
                                    <ProductQuantityControls
                                        quantity={productQuantity}
                                        onIncreaseQuantity={(event) => {
                                            event.stopPropagation();
                                            increaseQuantity(store.id, product)
                                        }}
                                        onDecreaseQuantity={(event) => {
                                            event.stopPropagation();
                                            decreaseQuantity(store.id, product);
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    ) : (
                        <button
                            className="btn btn-success btn-square size-8"
                        >
                            <PlusIcon className="size-6 text-white" />
                        </button>
                    )
                }
            </div>

        </div>
    );
}