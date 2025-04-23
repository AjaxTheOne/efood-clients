import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import { Order, OrderListResponse } from '../types/orders';
import dayjs from "dayjs";

function Orders() {
    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        axiosInstance.get<OrderListResponse>("/client/orders")
            .then(response => {
                if (!response.data.success) {
                    return;
                }
                
                setOrders(response.data.data.orders);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                    Orders
                </div>
                <ul className='divide-y divide-gray-100 mt-10'>
                    {
                        loading ? (
                            [1, 2, 3].map(_ => 
                                <li className="flex py-4 gap-2" key={_}>
                                    <div className='skeleton h-14 w-14 rounded-full grow-0'></div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='skeleton h-4 w-35'></div>
                                        <div className='skeleton h-2.5 w-65'></div>
                                        <div className='skeleton h-2.5 w-75'></div>
                                        <div className='skeleton h-2.5 w-55'></div>
                                    </div>
                                </li>
                            )
                        ) : (
                            orders.map(order => 
                                <li key={order.id}>
                                    <Link 
                                        to={order.id.toString()}
                                        className="flex py-4 gap-4"
                                    >
                                        <div className="avatar shrink">
                                            <div className="w-12 h-12 rounded-full">
                                                <img src={order.store.logo} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-bold text-lg'>
                                                {order.store.name}
                                            </div>
                                            <div className='text-gray-500 text-sm'>
                                                {dayjs(order.created_at).format("DD/MM/YYYY")} · {dayjs(order.created_at).format("HH:mm")} · ID: {order.id}
                                            </div>
                                            <div className='text-gray-500 text-sm truncate'>
                                                {order.products.map(product => `${product.quantity}x ${product.product_name}`).join(", ")}
                                            </div>
                                            {
                                                order.note && <div className='text-gray-500 text-sm'>{order.note}</div>
                                            }
                                        </div>
                                    </Link>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Orders;