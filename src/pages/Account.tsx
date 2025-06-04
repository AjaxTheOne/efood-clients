import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, ShoppingCartIcon, MapPinIcon, ArrowLeftStartOnRectangleIcon, ChevronLeftIcon, XMarkIcon, LanguageIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const languages = [
    {value: "el", name: "Ελληνικά"},
    {value: "en", name: "English"}
];

function Account() {
    const { user, logout } = useAuth();
    const { t, i18n } = useTranslation(undefined, { keyPrefix: 'account' });

    const [openLocale, setOpenLocale] = useState(false);

    const updateLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        document.documentElement.setAttribute("lang", lang);
    };

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
                    {t("hello", { username: user?.name })}
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
                            <UserIcon className='size-5' />
                            {t("profile")}
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={"/orders"} className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <ShoppingCartIcon className='size-5' />
                            {t("orders")}
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={"/addresses"} className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <MapPinIcon className='size-5' />
                            {t("addresses")}
                        </div>
                    </Link>
                </li>
                <li>
                    <a href="javascript:void(0)"
                        onClick={() => setOpenLocale(true)}
                        className="p-4 block">
                        <div className='flex items-center gap-2'>
                            <LanguageIcon className='size-5' />
                            {languages.find(l => l.value === i18n.language)?.name}
                        </div>
                    </a>
                </li>
                <li>
                    <a
                        href="javascript:void(0)"
                        className="p-4 block text-error"
                        onClick={() => logout()}
                    >
                        <div className='flex items-center gap-2'>
                            <ArrowLeftStartOnRectangleIcon className='size-5' />
                            {t("sign_out")}
                        </div>
                    </a>
                </li>
            </ul>

            <Dialog open={openLocale} onClose={setOpenLocale} className="relative z-10">
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
                            <div className="grid grid-cols-3 items-center">
                                <div></div>

                                <DialogTitle as="h3" className="text-base text-center font-semibold text-gray-900">
                                    {t("locales.header")}
                                </DialogTitle>

                                <div className="text-end">
                                    <button
                                        className="btn btn-circle size-8"
                                        onClick={() => setOpenLocale(false)}
                                    >
                                        <XMarkIcon className="size-4" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="mt-6 space-y-4">
                                    {
                                        languages.map((lang, index, array) => {
                                            return (
                                                <div key={lang.value}
                                                    className={"flex items-center" + (index !== array.length - 1 ? " border-b border-gray-200 pb-4" : "")}>
                                                    <input
                                                        defaultChecked={lang.value === i18n.language}
                                                        id={"language-" + lang.value}
                                                        name="language"
                                                        type="radio"
                                                        value={lang.value}
                                                        className="radio radio-success"
                                                        onChange={() => updateLanguage(lang.value)}
                                                    />
                                                    <label htmlFor={"language-" + lang.value} className="capitalize ml-3 block text-sm/6 font-medium text-gray-900">
                                                        {lang.name}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default Account;