import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, ShoppingCartIcon, MapPinIcon, CreditCardIcon, BanknotesIcon, BriefcaseIcon, DocumentCurrencyEuroIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import { Order as O, OrderResponse } from '../types/orders';
import dayjs from "dayjs";
import { socket } from "../api/sockets";
import GoogleMap, { Map } from 'google-maps-react-markers';
import MapMarker from '../components/profile/MapMarker';
import { useTranslation } from 'react-i18next';

type DriverLocation = {
    driver_id: number;
    latitude: number;
    longitude: number;
};

const containerStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "20px"
};

function Order() {
    const params = useParams();
    const general = useTranslation();
    const { t } = useTranslation(undefined, { keyPrefix: "order" });
    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<O>();
    const [driverLocation, setDriverLocation] = useState<DriverLocation>();
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: 40.63947387520466, lng: 22.94160166642903 });

    useEffect(() => {
        axiosInstance.get<OrderResponse>("/client/orders/" + params.id)
            .then(response => {
                if (!response.data.success) {
                    return;
                }

                setOrder(response.data.data.order);
            })
            .finally(() => {
                setLoading(false);
            });

        socket.on("driver-tracking-" + params.id, (data) => {
            setOrder((o) => {
                setDriverLocation(data);
                const bounds = new window.google.maps.LatLngBounds();

                [
                    { lat: +data.latitude, lng: +data.longitude },
                    { lat: +o!.address.latitude, lng: +o!.address.longitude },
                ].map((item, index) => {
                    bounds.extend(item);
                    return index;
                });

                mapRef.current.fitBounds(bounds);
                return o;
            });
        });
        socket.on("order-update-" + params.id, (data) => {
            setOrder((o) => {
                const copy = { ...o! };
                copy.status = data.order.status;
                return copy;
            });
        });


        return () => {
            socket.off("driver-tracking-" + params.id);
        };
    }, []);

    const mapRef = useRef<Map>(null);
    const [mapReady, setMapReady] = useState(false);

    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        setMapReady(true);
    };

    const renderStatus = () => {
        const text = general.t("orders.status." + order?.status);
        switch (order?.status) {
            case "pending":
                return <div className="badge badge-ghost">{text}</div>;
            case "processing":
                return <div className="badge badge-info">{text}</div>;
            case "out_for_delivery":
                return <div className="badge badge-neutral">{text}</div>;
            case "completed":
                return <div className="badge badge-success">{text}</div>;
            case "cancelled":
                return <div className="badge badge-error">{text}</div>;
        }
    };

    return (
        <div>
            <div className='my-4 px-2'>
                <Link to={"/account"}>
                    <button className="btn btn-circle btn-ghost">
                        <ChevronLeftIcon className="size-8" />
                    </button>
                </Link>
            </div>
            <div className='p-4'>
                <div className='font-bold text-2xl'>
                    {t("title")}
                </div>
                {
                    loading || !order ? (
                        t("loading")
                    ) : (
                        <div className='mt-5'>
                            <div className='flex items-center justify-between mb-5'>
                                <div className='text-gray-500'>
                                    {general.t(
                                        "orders.details",
                                        {
                                            date: dayjs(order.created_at).format("DD/MM/YYYY"),
                                            time: dayjs(order.created_at).format("HH:mm"),
                                            id: order.id
                                        }
                                    )}
                                </div>
                                <div>{renderStatus()}</div>
                            </div>
                            {
                                order?.status === "out_for_delivery" &&
                                <div
                                    style={containerStyle}
                                >
                                    <GoogleMap
                                        apiKey="AIzaSyDDU8PFyo5R2GIJfRWKbrIiu6sDYVVCRTw"
                                        defaultCenter={center}
                                        defaultZoom={5}
                                        options={{
                                            center
                                        }}
                                        style={containerStyle}
                                        mapMinHeight="100vh"
                                        onGoogleApiLoaded={onGoogleApiLoaded}
                                    >
                                        {
                                            !!driverLocation && (
                                                <MapMarker
                                                    image={"/pin-driver.png"}
                                                    lat={driverLocation.latitude}
                                                    lng={driverLocation.longitude}
                                                    markerId={"driver"}
                                                />
                                            )
                                        }
                                        {
                                            !!order && (
                                                <MapMarker
                                                    image={"/pin-client.png"}
                                                    lat={+order.address.latitude}
                                                    lng={+order.address.longitude}
                                                    markerId={"client"}
                                                />
                                            )
                                        }
                                        {
                                            !!order && (
                                                <MapMarker
                                                    image={"/pin-store.png"}
                                                    lat={+order.store.latitude}
                                                    lng={+order.store.longitude}
                                                    markerId={"store"}
                                                />
                                            )
                                        }

                                    </GoogleMap>
                                </div>
                            }
                            <div className='px-5 mt-5'>
                                <div className='py-3 flex items-center gap-7'>
                                    <div className="avatar shrink">
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={order.store.logo} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-bold text-sm'>{t("store")}</div>
                                        <div>{order.store.name}</div>
                                    </div>
                                </div>
                                <div className='py-3 flex items-center gap-7'>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                                        <MapPinIcon className='size-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-bold text-sm'>{t("deliver_to")}</div>
                                        <div>{t(
                                            "deliver_to_address",
                                            {
                                                street: order.address.street,
                                                number: order.address.number,
                                                city: order.address.city,
                                                postal_code: order.address.postal_code
                                            }
                                            )}</div>
                                    </div>
                                </div>
                                <div className='py-3 flex items-center gap-7'>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                                        <ShoppingCartIcon className='size-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-bold text-sm'>{t("total")}</div>
                                        <div>{order.total_price}€</div>
                                    </div>
                                </div>
                                <div className='py-3 flex items-center gap-7'>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-200">
                                        {order.payment_method === "card" && <CreditCardIcon className="size-5" />}
                                        {order.payment_method === "cod" && <BanknotesIcon className="size-5" />}
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-bold text-sm'>{t("payment_type")}</div>
                                        <div>
                                            {general.t("payment_method." + order.payment_method)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='font-bold text-xl px-5 mt-5'>
                                {t("cart")}
                            </div>
                            <ul className='divide-y divide-gray-100 px-5 mt-5'>
                                {
                                    order.products.map(product =>
                                        <li className='flex gap-4 items-center py-5' key={product.id}>
                                            <div className='w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0'>
                                                {product.quantity}
                                            </div>
                                            <div className='flex flex-col grow-1'>
                                                <div>{product.product_name}</div>
                                                <div className='font-bold text-sm'>{product.price}€</div>
                                            </div>
                                            <div className='grow-0 w-[70px] h-[56px]'>
                                                <img className='object-cover w-full h-full rounded-xl' src={product.product.mainImage} />
                                            </div>
                                        </li>
                                    )
                                }
                                <li className='flex gap-4 items-center py-5'>
                                    <div className='w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0'>
                                        <BriefcaseIcon className='size-4' />
                                    </div>
                                    <div className='flex flex-col grow-1'>
                                        {t("service_fee")}
                                    </div>
                                    <div className='grow-0'>
                                        <div className='font-bold text-sm'>{order.shipping_price}€</div>
                                    </div>
                                </li>
                                <li className='flex gap-4 items-center py-5'>
                                    <div className='w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0'>
                                        <DocumentCurrencyEuroIcon className='size-4' />
                                    </div>
                                    <div className='flex flex-col grow-1'>
                                        {t("total_price")}
                                    </div>
                                    <div className='grow-0'>
                                        <div className='font-bold text-sm'>{order.total_price}€</div>
                                    </div>
                                </li>
                                {
                                    order.note &&
                                    <li className='flex gap-4 items-center py-5'>
                                        <div className='w-[25px] h-[25px] flex items-center justify-center rounded-md text-sm font-bold bg-gray-200 grow-0'>
                                            <ChatBubbleBottomCenterTextIcon className='size-4' />
                                        </div>
                                        <div className='flex flex-col grow-1'>
                                            {order.note}
                                        </div>
                                    </li>
                                }
                            </ul>
                        </div>
                    )
                }

            </div>
        </div >
    );
}

export default Order;