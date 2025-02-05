import { createContext, useContext, useEffect, useState } from "react";
import { LoginResponse, User } from "../types/user";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext<{
    user: User | undefined, 
    token: string | null,
    login: (credentials: {email: string; password: string; }) => void
}>({
    user: undefined, 
    token: null, 
    login: () => null,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axiosInstance.get("/client/users/me")
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                });
        }
    }, []);

    const login = ({email, password}: {email: string; password: string; }) => {
        axiosInstance.post<LoginResponse>(
                "/client/auth/login", 
                {email, password}
            )
            .then((response) => {
                const data = response.data.data;
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("token", data.token);
            });
    };

    return (
        <AuthContext.Provider value={{ user, token, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
