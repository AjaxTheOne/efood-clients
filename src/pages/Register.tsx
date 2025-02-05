import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = () => {
        // if (password !== confirmPassword) {
        //     alert("Password do not match!");
        //     return;
        // }

        axiosInstance.post("http://efood-api.test/client/auth/register", {name, email, password})
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <div className="flex justify-center min-h-[200px] items-center">
            <form onSubmit={(ev) => ev.preventDefault()} 
                className="flex flex-col gap-4 w-[350px] p-4 rounded-lg">
                <h1 className="heading-1">Register</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(ev) => { setName(ev.target.value) }}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(ev) => { setEmail(ev.target.value) }}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="password" 
                        className="grow" 
                        placeholder="Password"
                        value={password} 
                        onChange={(ev) => { setPassword(ev.target.value) }}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="password" 
                        className="grow" 
                        placeholder="Confirm password"
                        value={confirmPassword} 
                        onChange={(ev) => { setConfirmPassword(ev.target.value) }}
                    />
                </label>
                <button className="btn btn-primary mt-4" onClick={register}>Register</button>
            </form>
        </div>
    );
}

export default Register;