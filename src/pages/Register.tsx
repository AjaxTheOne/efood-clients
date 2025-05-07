import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Register() {
    const { loading, error: authError, register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const onRegister = () => {
        setError("");

        if (!name) {
            setError("Name is required");
            return;
        }

        if (!email) {
            setError("Email is required");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Password do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password is less than 6 characters");
            return;
        }

        register({
            name,
            email,
            password
        });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Register a new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(ev) => ev.preventDefault()} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                value={name}
                                onChange={(ev) => { setName(ev.target.value) }}
                                name="name"
                                type="text"
                                required
                                autoComplete="off"
                                className="input input-lg w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                value={email}
                                onChange={(ev) => { setEmail(ev.target.value) }}
                                name="email"
                                type="email"
                                required
                                autoComplete="off"
                                className="input input-lg w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                        </div>
                        <div className="mt-2">
                        <label className="input input-lg w-full">
                            <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    name="password"
                                    className="grow" 
                                />
                                <button 
                                    className="btn btn-sm btn-circle" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                >
                                    { 
                                        showPassword ? <EyeSlashIcon className="size-4"/> : <EyeIcon className="size-4"/>
                                    }
                                </button>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="input input-lg w-full">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={ev => setConfirmPassword(ev.target.value)}
                                    name="confirm-password"
                                    className="grow" 
                                />
                                <button 
                                    className="btn btn-sm btn-circle" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    type="button"
                                >
                                    { 
                                        showConfirmPassword ? <EyeSlashIcon className="size-4"/> : <EyeIcon className="size-4"/>
                                    }
                                </button>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {
                            (error || authError) && 
                            <div className='text-error text-center'>{error || authError}</div>
                        }
                        <button
                            disabled={loading}
                            onClick={onRegister}
                            type="submit"
                            className="flex w-full justify-center btn btn-primary"
                        >
                            {
                                loading
                                    ? <span className="loading loading-spinner"></span>
                                    : "Register"
                            }
                        </button>
                        <Link
                            to={"/login"}
                            className="flex w-full justify-center btn btn-soft"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;