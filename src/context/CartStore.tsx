import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/products";
import { PaymentMethod, ShippingMethod, Store } from "../types/stores";

export type CartProduct = {
    product: Product,
    quantity: number,
    note?: string
};
export type CartStoreStore = {
    products: CartProduct[];
    shippingMethod: ShippingMethod
    paymentMethod: PaymentMethod;
    couponCode: string;
};
type CartStore = {
    stores: Record<number,CartStoreStore>,

    selectStore: (storeId: number) => CartStoreStore,
    selectProduct: (storeId: number, productId: number) => CartProduct | undefined;
    storeTotalProducts: (storeId: number) => number;
    storeTotalPrice: (storeId: number) => number;

    removeStore: (storeId: number) => void;

    addItem: (storeId: number, product: Product, quantity: number, note?: string) => void;
    removeItem: (storeId: number, product: Product) => void;

    increaseQuantity: (storeId: number, product: Product, by?: number) => void;
    decreaseQuantity: (storeId: number, product: Product, by?: number) => void;

    updateShippingMethod: (storeId: number, shippingMethod: ShippingMethod) => void;
    updatePaymentMethod: (storeId: number, paymentMethod: PaymentMethod) => void;
    
    setCouponCode: (storeId: number, couponCode: string) => void;
    clearStore: (storeId: number) => void;
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
            storeTotalProducts: (storeId: number) => {
                return get().stores?.[storeId]?.products.reduce((total, product) => total + product.quantity, 0)
            },
            storeTotalPrice: (storeId: number) => {
                return get().stores?.[storeId]?.products.reduce((total, product) => total + (product.quantity * product.product.price), 0)
            },

            removeStore: (storeId: number) => set((state) => {
                delete state.stores[storeId];
                return {...state};
            }),

            addItem: (storeId: number, product: Product, quantity: number, note?: string) => set((state) => {
                let stores = state.stores;

                if (!stores[storeId]) {
                    stores[storeId] = {
                        products: [],
                        shippingMethod: "delivery",
                        paymentMethod: "card",
                        couponCode: ""
                    };
                }

                const productIndex = stores[storeId].products.findIndex(i => i.product.id === product.id);
        
                if (productIndex !== -1) {
                    stores[storeId].products[productIndex].quantity += quantity;
                    stores[storeId].products[productIndex].note = note;
                    stores[storeId].products = [...stores[storeId].products];
                } else {
                    stores[storeId].products = [
                        ...stores[storeId].products,
                        {
                            product,
                            quantity,
                            note
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
                    // get().removeStore(storeId);
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

            updateShippingMethod: (storeId: number, shippingMethod: ShippingMethod) => set((state) => {
                const stores = state.stores;
                if (!stores[storeId]) { return state; }

                stores[storeId].shippingMethod = shippingMethod;
                state.stores = stores;

                return {...state};
            }),
            updatePaymentMethod: (storeId: number, paymentMethod: PaymentMethod) => set((state) => {
                const stores = state.stores;
                if (!stores[storeId]) { return state; }

                stores[storeId].paymentMethod = paymentMethod;
                state.stores = stores;

                return {...state};
            }),

            setCouponCode: (storeId: number, couponCode: string) => set((state) => {
                const stores = state.stores;
                if (!stores[storeId]) { return state; }

                stores[storeId].couponCode = couponCode;
                state.stores = stores;

                return {...state};
            }),

            clearStore: (storeId: number) => set((state) => {
                const stores = state.stores;
                if (!stores[storeId]) { return state; }

                delete stores[storeId];
                state.stores = stores;

                return {...state};
            })
        }),
        {
            name: "cart"
        }
    )
);