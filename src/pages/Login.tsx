import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Login() {
    const { loading, error, login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = () => {
        login({ email, password });
    };

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(ev) => ev.preventDefault()} className="space-y-6">
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
                                    placeholder="Password" 
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

                    <div className="flex flex-col gap-3">
                        {
                            error && 
                            <div className='text-error text-center'>{error}</div>
                        }
                        <button
                            onClick={onLogin}
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center btn btn-primary"
                        >
                            {
                                loading
                                    ? <span className="loading loading-spinner"></span>
                                    : "Login"
                            }
                        </button>
                        <Link
                            to={"/register"}
                            className="flex w-full justify-center btn btn-soft"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;