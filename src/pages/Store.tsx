import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { StoreResponse, Store as StoreType } from "../types/stores";
import axiosInstance from "../api/axiosInstance";
import { ProductCategory } from "../types/products";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import GoogleMap from "google-maps-react-markers";
import MapMarker from "../components/profile/MapMarker";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

function Store() {
    const params = useParams();

    const [store, setStore] = useState<StoreType | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [showStoreName, setShowStoreName] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [openInformation, setOpenInformation] = useState(false);

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
            .finally();

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

    return (
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

                <div className="mt-4">
                    {
                        store?.product_categories?.map(category => (
                            <div key={category.id} id={"category-" + category.id}>
                                <h2 className="font-bold text-lg pb-2 border-b border-black">
                                    {category.name}
                                </h2>
                                {
                                    category.products?.map((product, index, array) => (
                                        <div key={product.id}
                                            className={`flex justify-between gap-2 py-3 ${index !== array.length - 1 ? "border-b border-gray-200" : ""}`}
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
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </section>

            <Dialog open={openInformation} onClose={setOpenInformation} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative min-w-[90%] transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 lg:max-w-[90%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-circle size-8"
                                    onClick={() => setOpenInformation(false)}
                                >
                                    <XMarkIcon className="size-4" />
                                </button>
                            </div>
                            <div>
                                <h2 className="font-bold text-md">
                                    Store Address
                                </h2>
                                <p className="text-gray-400 mb-2">
                                    {store?.address}
                                </p>
                                <div>
                                    { openInformation && store &&
                                        <GoogleMap
                                            apiKey=""
                                            defaultCenter={{
                                                lat: +store?.latitude,
                                                lng: +store?.longitude
                                            }}
                                            defaultZoom={5}
                                            options={{}}
                                            mapMinHeight="400px"
                                        >
                                            <MapMarker
                                                lat={+store?.latitude}
                                                lng={+store?.longitude}
                                                markerId={"address-location"}
                                            >
                                            </MapMarker>
                                        </GoogleMap>
                                    }
                                </div>
                                {
                                    store?.working_hours?.length &&
                                    <>
                                        <h2 className="font-bold text-md mt-4">
                                            Working Hours
                                        </h2>
                                        <ul className="divide-y divide-gray-200">
                                            {
                                                store?.working_hours.map((wh, index) => (
                                                    <li key={index} className="py-3 flex items-center justify-between">
                                                        <div className="font-bold text-sm">{days[index]}</div>
                                                        <div className="text-gray-500 text-sm">{wh.start} - {wh.end}</div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                }
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </main>
    );
}

export default Store;
