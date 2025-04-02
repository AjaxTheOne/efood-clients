import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/products";
import { ShippingMethods, Store } from "../types/stores";

export type CartProduct = {
    product: Product,
    quantity: number,
};
export type CartStoreStore = {
    products: CartProduct[];
    shippingMethod: ShippingMethods
};
type CartStore = {
    stores: Record<number,CartStoreStore>,

    selectStore: (storeId: number) => CartStoreStore,
    selectProduct: (storeId: number, productId: number) => CartProduct | undefined;

    removeStore: (storeId: number) => void;

    addItem: (storeId: number, product: Product, quantity: number) => void;
    removeItem: (storeId: number, product: Product) => void;

    increaseQuantity: (storeId: number, product: Product, by?: number) => void;
    decreaseQuantity: (storeId: number, product: Product, by?: number) => void;

    updateShippingMethod: (storeId: number, shippingMethod: ShippingMethods) => void;
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

            removeStore: (storeId: number) => set((state) => {
                delete state.stores[storeId];
                return {...state};
            }),

            addItem: (storeId: number, product: Product, quantity: number) => set((state) => {
                let stores = state.stores;

                if (!stores[storeId]) {
                    stores[storeId] = {
                        products: [],
                        shippingMethod: "delivery"
                    };
                }

                const productIndex = stores[storeId].products.findIndex(i => i.product.id === product.id);
        
                if (productIndex !== -1) {
                    stores[storeId].products[productIndex].quantity += quantity;
                    stores[storeId].products = [...stores[storeId].products];
                } else {
                    stores[storeId].products = [
                        ...stores[storeId].products,
                        {
                            product,
                            quantity
                        }
                    ];
                }
        
                state.stores = stores;

                return {...state};
            }),

            removeItem: (storeId: number, product: Product) => set((state) => {
                if (!state.selectProduct(storeId, product.id)) { return state; }
                const stores = state.stores;

                stores[storeId].products = stores[storeId].products.filter(p => p.product.id !== product.id);
                
                if (stores[storeId].products.length === 0) {
                    get().removeStore(storeId);
                    return {...state};
                }

                state.stores = stores;
                return {...state};
            }),

            increaseQuantity: (storeId: number, product: Product, by: number = 1) => set((state) => {
                const productInCart = state.selectProduct(storeId, product.id);                
                if (!productInCart) { return state; }

                const stores = state.stores;

                const productIndex = stores[storeId].products.findIndex(i => i.product.id === product.id);  
                stores[storeId].products[productIndex].quantity += by;
                stores[storeId].products = [...stores[storeId].products];
                state.stores = stores;

                return {...state};
            }),

            decreaseQuantity: (storeId: number, product: Product, by: number = 1) => set((state) => {
                const productInCart = state.selectProduct(storeId, product.id);
                if (!productInCart) { return state; }

                let stores = state.stores;

                const productIndex = stores[storeId].products.findIndex(i => i.product.id === product.id);        
                stores[storeId].products[productIndex].quantity -= by;

                if (stores[storeId].products[productIndex].quantity === 0) {
                    get().removeItem(storeId, stores[storeId].products[productIndex].product);
                    return {...state};
                }

                stores[storeId].products = [...stores[storeId].products];

                state.stores = stores;

                
                
                return {...state};
            }),

            updateShippingMethod: (storeId: number, shippingMethod: ShippingMethods) => set((state) => {
                const stores = state.stores;
                if (!stores[storeId]) { return state; }

                stores[storeId].shippingMethod = shippingMethod;
                state.stores = stores;

                return {...state};
            })
        }),
        {
            name: "cart"
        }
    )
);