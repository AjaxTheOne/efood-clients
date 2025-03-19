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
                        <Link to={"/login"}>
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
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                            { user ? (
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="size-8 rounded-full"
                                        />
                                    </MenuButton>
                                ) : (
                                    <NavLink
                                        to={"/login"}
                                        className={({ isActive }) => {
                                            return classNames(
                                                isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        }
                                    >
                                        Login
                                    </NavLink>
                                )
                            }
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <div className="block px-4 py-2 text-sm text-gray-700">
                                    Hello, {user?.name}
                                </div>
                                <MenuItem>
                                    <NavLink
                                        to={"/profile"}
                                        className={({ isActive }) => {
                                            return classNames(
                                                isActive
                                                    ? 'bg-gray-200'
                                                    : '',
                                                'block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden',
                                            )}
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        onClick={logout}
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Header;
