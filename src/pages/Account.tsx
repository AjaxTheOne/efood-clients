import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, ShoppingCartIcon, MapPinIcon, ArrowLeftStartOnRectangleIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router';

function Account() {
    const { user, logout } = useAuth();

    return (
        <div>
            <div className='my-4 px-2'>
                <Link to={"/stores"}>
                    <button className="btn btn-circle btn-ghost">
                        <ChevronLeftIcon className="size-8" />
                    </button>
                </Link>
            </div>
            <div className="px-4 flex items-center justify-between">
                <div className="font-bold text-2xl">
                    {user?.name}
                </div>
                {
                    user?.avatar &&
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={user?.avatar} />
                        </div>
                    </div>
                }
            </div>

            <ul className="divide-y divide-gray-100">
                <li>
                    <Link to={"/profile"} className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <UserIcon className='size-5'/>
                            Profile
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={"/orders"} className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <ShoppingCartIcon className='size-5'/>
                            Orders
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={"/addresses"} className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <MapPinIcon className='size-5'/>
                            Addresses
                        </div>
                    </Link>
                </li>
                <li>
                    <a 
                        href="javascript:void(0)" 
                        className="p-4 block text-error"
                        onClick={() => logout() }
                    >
                        <div className='flex items-center gap-2'>
                            <ArrowLeftStartOnRectangleIcon className='size-5'/>
                            Sign out
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Account;