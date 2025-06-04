import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export function ChangePasswordDialog({ open, setOpen }: Props) {
        const { t } = useTranslation(undefined, { keyPrefix: "profile.change_password_dialog" });
    const {loading, error: authError, changePassword} = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const onChangePassword = () => {
        setError("");

        if (password !== confirmPassword) {
            setError(t("password_match_error"));
            return;
        }

        if (password.length < 6) {
            setError(t("password_length_error", {count: 6}));
            return;
        }

        changePassword(currentPassword, password);
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative bg-white min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >

                        <div className="flex justify-start items-center p-4 w-full" style={{ top: 0 }}>
                            <button
                                className="btn btn-circle size-8"
                                onClick={() => setOpen(false)}
                            >
                                <ChevronLeftIcon className="size-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h1 className="font-bold text-2xl">{t("title")}</h1>
                        </div>
                        <div className='p-4 flex flex-col gap-8'>
                            <label className="input input-lg w-full">
                                <input 
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={ev => setCurrentPassword(ev.target.value)}
                                    name="current-password"
                                    placeholder={t("form.current_password_placeholder")}
                                    className="grow" 
                                />
                                <button className="btn btn-sm btn-circle" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    { 
                                        showCurrentPassword ? <EyeSlashIcon className="size-4"/> : <EyeIcon className="size-4"/>
                                    }
                                </button>
                            </label>
                            <label className="input input-lg w-full">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    name="password"
                                    placeholder={t("form.password_placeholder")}
                                    className="grow" 
                                />
                                <button className="btn btn-sm btn-circle" onClick={() => setShowPassword(!showPassword)}>
                                    { 
                                        showPassword ? <EyeSlashIcon className="size-4"/> : <EyeIcon className="size-4"/>
                                    }
                                </button>
                            </label>
                            <label className="input input-lg w-full">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={ev => setConfirmPassword(ev.target.value)}
                                    name="confirm-password"
                                    placeholder={t("form.confirm_password_placeholder")}
                                    className="grow" 
                                />
                                <button className="btn btn-sm btn-circle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    { 
                                        showConfirmPassword ? <EyeSlashIcon className="size-4"/> : <EyeIcon className="size-4"/>
                                    }
                                </button>
                            </label>
                            <p>{t("password_length_warning", {count: 6})}</p>

                            {
                                (error || authError) && 
                                <div className='text-error text-center'>{error || authError}</div>
                            }
                            <button 
                                className='btn btn-success btn-lg'
                                disabled={loading}
                                onClick={() => onChangePassword()}
                            >
                                {
                                    loading
                                        ? <span className="loading loading-spinner"></span>
                                        : t("change_password")
                                }
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}