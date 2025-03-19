import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Register() {
    const { loading, register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onRegister = () => {
        if (password !== confirmPassword) {
            alert("Password do not match!");
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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            <input
                                value={password}
                                onChange={(ev) => { setPassword(ev.target.value) }}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={confirmPassword}
                                onChange={(ev) => { setConfirmPassword(ev.target.value) }}
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
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