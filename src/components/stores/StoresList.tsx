import { Link } from "react-router";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import { useTranslation } from "react-i18next";

type Props = {
    layout: "list" | "grid";
    isFetched: boolean;
    stores: Store[];
};

function StoresList({ layout, stores, isFetched }: Props) {
    const { t } = useTranslation(undefined, {keyPrefix: "stores.list"});
    const cartStores = useCartStore(state => state.stores);

    const activeCart = (store: Store, size: string = "badge-sm") => {
        console.log(cartStores);
        return cartStores?.[store.id]?.products?.length ? (
            <div className="mb-3">
                <div className={"badge badge-error text-white " + size}>
                    {
                        t("products_in_cart", {
                            count: cartStores?.[store.id]?.products.reduce((total, product) => {
                            return total + product.quantity;
                        }, 0)})
                    }
                </div>
            </div>
        ) : (
            null
        );
    }
        
    

    const gridStore = (store: Store) => (
        <Link to={"/stores/" + store.id} key={store.id}>
            <div className="card bg-base-100 w-full shadow-sm">
                <figure className="relative">
                    <img
                        src={store.cover}
                    />
                    {
                        store.logo &&
                        <div
                            className="avatar absolute"
                            style={{ left: "15px", bottom: "15px" }}
                        >
                            <div className="w-[40px] ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2">
                                <img src={store.logo} />
                            </div>
                        </div>
                    }
                    
                        
                        <div
                            className="absolute"
                            style={{ right: "10px", bottom: "0" }}
                        >
                            {activeCart(store)}
                            {
                                store.shipping_price && 
                                <div className="px-1.5 bg-white rounded-t-lg text-center">
                                    <span className="text-xs">
                                        {t("delivery_fee", {fee: store.shipping_price})}
                                    </span>
                                </div>
                            }
                        </div>
                    
                </figure>
                <div className="card-body p-3">
                    <h2 className="card-title">
                        {store.name}
                    </h2>
                    <div className="flex items-center gap-1">
                        {
                            store.categories?.[0] ? (
                                <>
                                    <b>{store.categories[0].name}</b>
                                    <span>·</span>
                                </>
                            ) : null
                        }
                        <span>{store.minimum_cart_value}€</span>
                    </div>
                </div>
            </div>
        </Link>
    );

    const listStores = () => (
        <ul role="list" className="divide-y divide-gray-100">
            {stores.map((store) => (
                <li key={store.id}>
                    <Link to={"/stores/" + store.id} className="flex gap-x-4 py-5">
                        <img alt="" src={store.logo} className="size-12 flex-none rounded-full bg-gray-50" />
                        <div className="min-w-0">
                            <p className="text-sm/6 font-semibold text-gray-900">{store.name}</p>
                            <div className="mt-1 truncate text-xs/5 text-gray-500 flex items-center gap-1">
                                {
                                    store.categories?.[0] ? (
                                        <>
                                            <b>{store.categories[0].name}</b>
                                            <span>·</span>
                                        </>
                                    ) : null
                                }
                                <span>{store.minimum_cart_value}€</span>
                                <span>·</span>
                                { !!store.shipping_price && <span>{t("delivery_fee", {fee: store.shipping_price})}</span>}
                            </div>
                            {activeCart(store, 'badge-xs')}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="flex flex-col gap-3">
            {
                isFetched ? (
                    stores.length ? (
                        layout === "grid"
                            ? stores.map(store => gridStore(store))
                            : listStores()
                    ) : (
                        <div className="text-gray-500 text-center text-lg my-10">{t("no_stores_filters")}</div>
                    )
                ) : (
                    <div className="flex flex-col gap-3 items-center">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8].map(_ =>
                                <div key={_} className="skeleton h-[238px] w-full"></div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default StoresList;