import { Store } from "../../types/stores";

type Props = {
    stores: Store[];
};

function StoresList({ stores }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {
                stores?.length ? (
                    stores.map(store =>
                        <div className="card bg-base-100 w-full shadow-sm" key={store.id}>
                            <figure className="relative">
                                <img
                                    src={store.cover}
                                    alt="Shoes"
                                />
                                {
                                    store.logo ? (
                                        <div 
                                            className="avatar absolute" 
                                            style={{left: "15px", bottom: "15px"}}
                                        >
                                            <div className="w-[40px] ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2">
                                                <img src={store.logo} />
                                            </div>
                                        </div>
                                    ) : null
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
    )
}

export default StoresList;