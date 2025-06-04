
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import { ChangePasswordDialog } from '../components/profile/ChangePasswordDialog';
import { useTranslation } from 'react-i18next';

function Profile() {
    const { user, loading, error, update, logout } = useAuth();
    const { t } = useTranslation(undefined, { keyPrefix: "profile" });
        

    const [name, setName] = useState(user!.name);
    const [phone, setPhone] = useState(user!.phone || "");

    const [openChangePassword, setOpenChangePassword] = useState(false);

    const onSaveChanges = async () => {
        update(name, phone);
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
                <div className='font-bold text-2xl mb-10'>
                    {t("title")}
                </div>
                <div className='flex flex-col gap-8'>
                    <label className="floating-label">
                        <input type="email" disabled value={user!.email} placeholder={t("form.email_placeholder")} className="input input-lg w-full" />
                        <span>{t("form.email")}</span>
                    </label>
                    <label className="floating-label">
                        <input 
                            type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            name="name"
                            placeholder={t("form.name_placeholder")}
                            className="input input-lg w-full" 
                        />
                        <span>{t("form.name")}</span>
                    </label>
                    <label className="floating-label">
                        <input 
                            type="text"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                            name="phone"
                            placeholder={t("form.phone_placeholder")}
                            className="input input-lg w-full" 
                        />
                        <span>{t("form.phone")}</span>
                    </label>
                    {
                        error && 
                        <div className='text-error text-center'>{error}</div>
                    }
                    <button 
                        className='btn btn-success btn-lg'
                        disabled={loading || !name}
                        onClick={() => onSaveChanges()}
                    >
                        {
                            loading
                                ? <span className="loading loading-spinner"></span>
                                : t("form.save_changes")
                        }
                    </button>
                </div>
            </div>
            <div className='mt-4 px-4'>
                <a 
                    href="javascript:void(0)" 
                    className="py-4 block border-b border-gray-200"
                    onClick={() => setOpenChangePassword(true) }
                >
                    <div className='flex justify-between items-center'>
                        {t("change_password")}
                        <ChevronRightIcon className='size-5 text-gray-500'/>
                    </div>
                </a>
                <a 
                    href="javascript:void(0)" 
                    className="py-4 block text-error"
                    onClick={() => logout() }
                >
                    <div className='flex justify-between items-center'>
                        {t("log_out")}
                        <ChevronRightIcon className='size-5 text-gray-500'/>
                    </div>
                </a>
            </div>

            <ChangePasswordDialog
                open={openChangePassword}
                setOpen={setOpenChangePassword}
            />
        </div>
    );
}

export default Profile;