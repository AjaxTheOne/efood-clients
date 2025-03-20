import { Link } from "react-router";
import { Store } from "../../types/stores";

type Props = {
    layout: "list" | "grid";
    stores: Store[];
};

function StoresList({ layout, stores }: Props) {

    const cardStore = (store: Store) => (
        <Link to={"/stores/" + store.id} key={store.id}>
            <div className="card bg-base-100 w-full shadow-sm">
                <figure className="relative">
                    <img
                        src={store.cover}
                        alt="Shoes"
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
                    {
                        store.shipping_price &&
                        <div
                            className="absolute px-1.5 bg-white rounded-t-lg"
                            style={{ right: "10px", bottom: "0" }}
                        >
                            <span className="text-xs">Delivery {store.shipping_price}€</span>
                        </div>
                    }
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
                                <span>Delivery {store.shipping_price}€</span>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="flex flex-col gap-3">
            {
                stores?.length ? (
                    layout === "grid"
                        ? stores.map(store => cardStore(store))
                        : listStores()
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
    )
}

export default StoresList;