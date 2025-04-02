import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ShippingMethods, StoreResponse, Store as StoreType } from "../types/stores";
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


function Store() {
    const params = useParams();

    const cartProducts = useCartStore(state => state.selectStore(+params.id!)?.products);

    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState<StoreType | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [showStoreName, setShowStoreName] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const [openInformation, setOpenInformation] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openCartSummary, setOpenCartSummary] = useState(false);
    const [openShippingMethod, setOpenShippingMethod] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
        const id = params.id;

        axiosInstance.get<StoreResponse>("/client/stores/" + id)
            .then(response => {
                if (!response.data.success) {
                    return;
                }
                // TODO Handle this on the backend
                // response.data.data.store.product_categories = response.data.data.store.product_categories?.filter(pc => !!pc.products?.length);
                setStore(response.data.data.store);
            })
            .finally(() => {
                setLoading(false);
            });

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
        loading ? (
            skeleton
        ) :
            <main>
                <div
                    className="hero relative h-[200px]"
                    style={{
                        backgroundImage: "url(" + store?.cover + ")",
                    }}
                >
                    <div className="flex justify-between items-center absolute p-4 w-full" style={{ top: 0 }}>
                        <Link to={"/stores"}>
                            <button className="btn btn-circle size-8">
                                <ChevronLeftIcon className="size-4" />
                            </button>
                        </Link>

                        <button
                            className="btn btn-circle size-8"
                            onClick={() => setOpenInformation(true)}
                        >
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" width="18px" height="18px"><path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"></path></svg>
                        </button>
                    </div>
                </div>

                {
                    showBanner &&
                    <div className="h-[64px] fixed p-3 w-full shadow-gray-400 bg-white shadow-md z-1" style={{ top: 0 }}>
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
                    </div>
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
                        <span>Minimum {store?.minimum_cart_value}€</span>
                        <span>·</span>
                        <span>Delivery {store?.shipping_price}€</span>
                    </div>

                    <div className="mt-4 pb-14">
                        {
                            store?.product_categories?.map(category => (
                                <div key={category.id} id={"category-" + category.id}>
                                    <h2 className="font-bold text-lg pb-2 border-b border-black">
                                        {category.name}
                                    </h2>
                                    {
                                        category.products?.map((product, index, array) =>
                                            <div
                                                key={product.id}
                                                className={"pb-4 " + (index !== array.length - 1 ? "border-b border-gray-200" : "")}
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
                            <div className="col-span-1 font-bold text-lg text-black text-center">Cart</div>
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
                        onOpenShippingMethod={() => setOpenShippingMethod(true)}
                    />
                }

                {!!store && 
                    <StoreShippingMethodDialog
                        open={openShippingMethod}
                        setOpen={setOpenShippingMethod}
                        store={store}
                    />
                }
                
            </main>
    );
}

export default Store;
