import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ShippingMethod, StoreResponse, Store as StoreType } from "../types/stores";
import axiosInstance from "../api/axiosInstance";
import { Product, ProductCategory } from "../types/products";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import GoogleMap from "google-maps-react-markers";
import MapMarker from "../components/profile/MapMarker";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../context/CartStore";
import { StoreProduct } from "../components/stores/StoreProduct";
import { ProductQuantityControls } from "../components/stores/ProductQuantityControls";
import { StoreInformationDialog } from "../components/stores/StoreInformationDialog";
import { StoreProductDialog } from "../components/stores/StoreProductDialog";
import { StoreCartSummaryDialog } from "../components/stores/StoreCartSummaryDialog";
import { StoreShippingMethodDialog } from "../components/stores/StoreShippingMethodDialog";
import { StorePaymentMethodDialog } from "../components/stores/StorePaymentMethodDialog";
import { OrderCreatePayload, OrderCreateResponse } from "../types/orders";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import { Box, Button, Container, Fab, IconButton, Paper, useMediaQuery, useTheme } from "@mui/material";

function Store() {
    const params = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation(undefined, { keyPrefix: 'store' });
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    const cartProducts = useCartStore(state => state.selectStore(+params.id!)?.products);
    const paymentMethod = useCartStore(state => state.selectStore(+params.id!)?.paymentMethod);
    const shippingMethod = useCartStore(state => state.selectStore(+params.id!)?.shippingMethod);
    const couponCode = useCartStore(state => state.selectStore(+params.id!)?.couponCode);
    const clearCart = useCartStore(state => state.clearStore);

    const [orderLoading, setOrderLoading] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [showStoreName, setShowStoreName] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const [openInformation, setOpenInformation] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openCartSummary, setOpenCartSummary] = useState(false);
    const [openShippingMethod, setOpenShippingMethod] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState(0);

    const { data: store, isLoading } = useQuery({
        queryKey: ["store", params.id],
        queryFn: () => axiosInstance.get<StoreResponse>("/client/stores/" + params.id),
        select: (response) => response.data.data.store,
    });

    useEffect(() => {
        const id = params.id;

        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };

    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        setShowBanner(scrollTop >= 150);
        setShowStoreName(scrollTop >= 150 && scrollTop < 250);
        setShowCategories(scrollTop >= 250);
    };

    const scrollToCategory = (category: ProductCategory) => {
        var scrollTop = document.getElementById("category-" + category.id)?.offsetTop || 0;
        window.scrollTo({ top: scrollTop - 70, behavior: 'smooth' });
    };

    const onSelectProduct = (product: Product) => {
        setOpenProduct(true);
        setSelectedProduct(product);

        setProductQuantity(1);
    };

    const onSendOrder = () => {
        setOrderLoading(true);
        const address = localStorage.getItem("address") || "{}";
        const payload: OrderCreatePayload = {
            address_id: JSON.parse(address).id,
            store_id: store!.id,
            payment_method: paymentMethod,
            shipping_method: shippingMethod,
            note: "",
            tip: 0,
            coupon_code: couponCode || null,
            products: cartProducts.map(product => ({
                product_id: product.product.id,
                quantity: product.quantity,
                note: product.note || ""
            }))
        };

        axiosInstance.post<OrderCreateResponse>("/client/orders", payload)
            .then(response => {
                if (!response.data.success) {
                    // TODO: Show a failed message
                    return;
                }

                // clear cart
                clearCart(+params.id!);

                if (response.data.data.viva_redirect_url) {
                    window.location.href = response.data.data.viva_redirect_url;
                } else {
                    console.log(response.data.data.order.id);
                    navigate("/orders/" + response.data.data.order.id);
                }
            })
            .finally(() => {
                setOrderLoading(false);
            });
    };

    const skeleton = (
        <div>
            <div className="hero relative h-[200px] skeleton"></div>

            <section className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className="skeleton h-[28px] w-[120px]"></h1>
                    <div className="avatar">
                        <div className="w-[50px] skeleton ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2">
                        </div>
                    </div>
                </div>
                <div className="mt-3 truncate text-xs/5 text-gray-500 flex items-center gap-1 justify-end">
                    <span className="skeleton h-[20px] w-[120px]"></span>
                    <span className="skeleton h-[20px] w-[60px]"></span>
                </div>

                <div className="mt-4">
                    {
                        [1, 2, 3].map(category => (
                            <div key={category} >
                                <h2 className="skeleton h-[28px] w-[120px] mb-3">
                                </h2>
                                <div className="border-b border-black"></div>
                                {
                                    [1, 2, 3]?.map((product, index, array) => (
                                        <div key={product}
                                            className={`flex justify-between gap-2 py-3 ${index !== array.length - 1 ? "border-b border-gray-200" : ""}`}
                                        >
                                            <div className="flex flex-col gap-3">
                                                <h3 className="skeleton h-[20px] w-[100px]">
                                                </h3>
                                                <p className="skeleton h-[20px] w-[150px]"></p>
                                                <div className="skeleton h-[20px] w-[80px]"></div>
                                            </div>

                                            <div>
                                                <div className="avatar">
                                                    <div className="w-26 rounded-xl skeleton">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );

    return (
        isLoading ? (
            skeleton
        ) :
            <>
                <Container disableGutters sx={{
                    p: {
                        xs: 0,
                        md: 2
                    },
                }}>
                    <Box
                        className="hero relative"
                        sx={{
                            height: {
                                xs: "200px",
                                md: "300px"
                            },
                            borderRadius: {
                                xs: 0,
                                md: 2
                            }
                        }}
                        style={{
                            backgroundImage: "url(" + store?.cover + ")",
                        }}
                    >
                        <div className="flex justify-between items-center absolute p-4 w-full top-0">
                            {
                                md ? (
                                    <Link to={"/stores"}>
                                        <button className="btn btn-circle size-8">
                                            <ChevronLeftIcon className="size-4" />
                                        </button>
                                    </Link>
                                ) : (
                                    <span></span>
                                )
                            }
                            <button
                                className="btn btn-circle size-8"
                                onClick={() => setOpenInformation(true)}
                            >
                                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" width="18px" height="18px"><path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"></path></svg>
                            </button>
                        </div>
                    </Box>
                </Container>

                <Container
                    sx={{ bgcolor: 'background.default' }}>

                    {
                        showBanner &&
                        <Paper square elevation={2} className="h-[64px] fixed p-3 w-full z-1 top-0 left-0">
                            {
                                showStoreName &&
                                <div className="h-full flex justify-center items-center font-bold text-xl">{store?.name}</div>
                            }
                            {
                                showCategories &&
                                <div className=" flex flex-row gap-3 items-center overflow-x-auto">
                                    {
                                        store?.product_categories?.map(category => (
                                            <button
                                                className="btn btn-ghost"
                                                key={category.id}
                                                onClick={() => scrollToCategory(category)}
                                            >
                                                {category.name}
                                            </button>
                                        ))
                                    }
                                </div>
                            }
                        </Paper>
                    }

                    <section className="p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-lg">{store?.name}</h1>
                            <div className="avatar">
                                <div className="w-[50px] ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2">
                                    <img src={store?.logo} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 truncate text-xs/5 text-gray-500 flex items-center gap-1 justify-end">
                            <span>{t("minimum_cart_value", { minimumCartValue: store?.minimum_cart_value })}</span>
                            <span>·</span>
                            <span>{t("delivery_fee", { fee: store?.shipping_price })}</span>
                        </div>

                        <div className="mt-4 pb-14">
                            {
                                store?.product_categories?.map(category => (
                                    <div key={category.id} id={"category-" + category.id}>
                                        <h2 className="font-bold text-lg pb-2 border-b border-base-300">
                                            {category.name}
                                        </h2>
                                        {
                                            category.products?.map((product, index, array) =>
                                                <div
                                                    key={product.id}
                                                    className={"pb-4 " + (index !== array.length - 1 ? "border-b border-base-300" : "")}
                                                >
                                                    <StoreProduct
                                                        store={store!}
                                                        product={product}
                                                        onSelectProduct={onSelectProduct}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    {
                        cartProducts?.length > 0 &&
                        <div className="fixed p-3 w-full bg-white z-1" style={{ bottom: 0, left: 0 }}>
                            <button
                                className="btn btn-lg btn-success text-white btn-block p-2 grid grid-cols-3"
                                onClick={() => setOpenCartSummary(true)}
                            >
                                <div className="col-span-1 text-start">
                                    <span className="inline-block p-1 min-w-[28px] font-bold text-black text-center rounded-lg bg-white text-sm">
                                        {
                                            cartProducts.reduce((total, product) => {
                                                return total + product.quantity;
                                            }, 0)
                                        }
                                    </span>
                                </div>
                                <div className="col-span-1 font-bold text-lg text-black text-center">{t("cart.title")}</div>
                                <div className="col-span-1 font-bold text-black text-end">
                                    {
                                        cartProducts.reduce((total, product) => {
                                            return total + (product.quantity * product.product.price);
                                        }, 0).toFixed(2)
                                    }€
                                </div>
                            </button>
                        </div>
                    }

                    <StoreInformationDialog
                        open={openInformation}
                        setOpen={setOpenInformation}
                        store={store!}
                    />

                    <StoreProductDialog
                        open={openProduct}
                        productQuantity={productQuantity}
                        store={store!}
                        setOpen={setOpenProduct}
                        selectedProduct={selectedProduct}
                        onDecreaseQuantity={() => setProductQuantity(prev => prev > 1 ? prev - 1 : 1)}
                        onIncreaseQuantity={() => setProductQuantity(prev => prev + 1)}
                    />

                    {!!store &&
                        <StoreCartSummaryDialog
                            open={openCartSummary}
                            setOpen={setOpenCartSummary}
                            store={store}
                            loading={orderLoading}
                            onOpenShippingMethod={() => setOpenShippingMethod(true)}
                            onOpenPaymentMethod={() => setOpenPaymentMethod(true)}
                            onSendOrder={() => onSendOrder()}
                        />
                    }

                    {!!store &&
                        <StoreShippingMethodDialog
                            open={openShippingMethod}
                            setOpen={setOpenShippingMethod}
                            store={store}
                        />
                    }

                    {!!store &&
                        <StorePaymentMethodDialog
                            open={openPaymentMethod}
                            setOpen={setOpenPaymentMethod}
                            store={store}
                        />
                    }

                </Container>
            </>
    );
}

export default Store;
