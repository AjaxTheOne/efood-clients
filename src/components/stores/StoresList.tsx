import { Link } from "react-router";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Card, CardMedia, Paper, Typography } from "@mui/material";

type Props = {
    layout: "list" | "grid";
    isFetched: boolean;
    stores: Store[];
};

function StoresList({ layout, stores, isFetched }: Props) {
    const { t } = useTranslation(undefined, { keyPrefix: "stores.list" });
    const cartStores = useCartStore(state => state.stores);

    const activeCart = (store: Store, size: string = "badge-sm") => {
        return cartStores?.[store.id]?.products?.length ? (
            <div className="mb-3">
                <div className={"badge badge-error text-white " + size}>
                    {
                        t("products_in_cart", {
                            count: cartStores?.[store.id]?.products.reduce((total, product) => {
                                return total + product.quantity;
                            }, 0)
                        })
                    }
                </div>
            </div>
        ) : (
            null
        );
    };


    const gridStore = (store: Store) => (
        <Link to={"/stores/" + store.id} key={store.id}>
            <Card elevation={1}>
                <Box className="relative">
                    <CardMedia
                        component="img"
                        height="194"
                        image={store.cover}
                        alt="Paella dish"
                    />
                        {
                            !!store.logo && (
                                <Box
                                    className="avatar absolute left-[15px] bottom-[15px]"
                                >
                                    <Avatar alt="Remy Sharp" src={store.logo} />
                                </Box>
                            )
                        }
                        <Box
                            className="absolute bottom-[15px] right-[10px]"
                        >
                            {activeCart(store)}
                            {
                                store.shipping_price &&
                                <Paper elevation={1} className="px-1.5 rounded-t-lg rounded-b-none text-center">
                                    <Typography>
                                        {t("delivery_fee", { fee: store.shipping_price })}
                                    </Typography>
                                </Paper>
                            }
                        </Box>
                </Box>
                <div className="p-3">
                    <Typography component={"h2"}>{store.name}</Typography>
                    <div className="flex items-center gap-1">
                        {
                            store.categories?.[0] ? (
                                <>
                                    <Typography component={"b"}>{store.categories[0].name}</Typography>
                                    <span>·</span>
                                </>
                            ) : null
                        }
                        <Typography component={"span"}>{store.minimum_cart_value}€</Typography>
                    </div>
                </div>
            </Card>
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
                                {!!store.shipping_price && <span>{t("delivery_fee", { fee: store.shipping_price })}</span>}
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