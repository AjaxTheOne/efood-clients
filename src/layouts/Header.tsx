import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/solid';
import Addresses from "../components/header/Addresses";

function Header() {
    const { user, logout } = useAuth();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Link to={"/account"}>
                            <button className="btn btn-circle">
                                <UserIcon className="size-6"/>
                            </button>
                        </Link>
                    </div>
                
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            {
                                user ? (<Addresses/>) : null
                            }
                            {/* <Link to={"/"}>
                                <img
                                    alt="Your Company"
                                    src="/logo.png"
                                    className="h-8 w-auto"
                                />
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Header;
