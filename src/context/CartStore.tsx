import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/products";
import { Store } from "../types/stores";

type CartProduct = {
    product: Product,
    quantity: number,
};
type CartStore = {
    stores: Record<number, 
    {
        products: CartProduct[];
    }>,

    selectStore: (storeId: number) => Record<number, 
        {
            products: CartProduct[];
        }>,
    selectProduct: (storeId: number, productId: number) => CartProduct | undefined;

    addItem: (storeId: number, product: Product, quantity: number) => void;
    removeItem: (storeId: number, product: Product) => void;

    increaseQuantity: (storeId: number, product: Product, by?: number) => void;
    decreaseQuantity: (storeId: number, product: Product, by?: number) => void;
}

export const useCartStore = create(
    persist<CartStore>(
        (set, get) => ({
            stores: {},

            selectStore: (storeId: number) => {
                return get().stores?.[storeId];
            },
            selectProduct: (storeId: number, productId: number) => {
                return get().stores?.[storeId]?.products.find(p => p.product.id === productId);
            },

            addItem: (storeId: number, product: Product, quantity: number) => set((state) => {
                let store = get().stores[storeId];

                if (!store) {
                    get().stores[storeId] = {
                        products: []
                    };
                    store = get().stores[storeId];
                }

                const productInCart = store.products.find(i => i.product.id === product.id);
        
                if (productInCart) {
                    productInCart.quantity = quantity;
                } else {
                    store.products.push({
                        product,
                        quantity
                    });
                }
        
                return state;
            }),
            removeItem: (storeId: number, product: Product) => set((state) => {
                if (!state.selectProduct(storeId, product.id)) { return state; }

                get().stores[storeId].products = get().stores[storeId].products.filter(p => p.product.id !== product.id);
                
                return {...state};
            }),

            increaseQuantity: (storeId: number, product: Product, by: number = 1) => set((state) => {
                const productInCart = state.selectProduct(storeId, product.id);
                
                if (!productInCart) { return state; }

                productInCart.quantity += by;

                return {...state};
            }),
            decreaseQuantity: (storeId: number, product: Product, by: number = 1) => set((state) => {
                const productInCart = state.selectProduct(storeId, product.id);

                if (!productInCart) { return state; }

                productInCart.quantity -= by;

                if (productInCart.quantity === 0) {
                    state.removeItem(storeId, product);
                }

                return {...state};
            }),
        }),
        {
            name: "cart"
        }
    )
);