import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import Addresses from "../components/header/Addresses";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import { useEffect } from "react";

function Header() {
    const { mode, setMode } = useColorScheme();
    const { user, logout } = useAuth();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", mode || "system");
    }, [mode]);

    const onChangeMode = (mode: "light" | "dark") => {
        document.documentElement.setAttribute("data-theme", mode);
        setMode(mode);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav">
            <Container
                disableGutters
                sx={{ bgcolor: 'background.paper' }}
                maxWidth={false}
            >
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <Link to={"/account"}>
                                <button className="btn btn-circle">
                                    <UserIcon className="size-6" />
                                </button>
                            </Link>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                {
                                    user ? (<Addresses />) : null
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

                        <div>
                            {
                                mode === "dark" && (
                                    <IconButton onClick={() => onChangeMode("light")}>
                                        <SunIcon className="size-[25px]" />
                                    </IconButton>
                                )
                            }
                            {
                                mode === "light" && (
                                    <IconButton onClick={() => onChangeMode("dark")}>
                                        <MoonIcon className="size-[25px]" />
                                    </IconButton>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </Disclosure>
    );
}

export default Header;
