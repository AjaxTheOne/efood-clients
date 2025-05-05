import { createContext, use, useContext, useEffect, useState } from "react";
import { LoginResponse, RegisterCredentials, LoginCredentials, RegisterResponse, User } from "../types/user";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { socket } from "../api/sockets";

const AuthContext = createContext<{
    user: User | null, 
    token: string | null,
    loading: boolean,
    login: (credentials: LoginCredentials) => void,
    register: (credentials: RegisterCredentials) => void,
    logout: () => void
}>({
    user: null, 
    token: null, 
    loading: false,
    login: () => null,
    logout: () => null,
    register: () => null
});

export const AuthProvider = ({ children }) => {
    const localStorageUser = localStorage.getItem("user");
    const [user, setUser] = useState<User | null>(
        localStorageUser 
            ? JSON.parse(localStorageUser) as User
            : null
    );
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axiosInstance.get("/client/users/me")
                .then((response) => {
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                });
        }
    }, []);

    const login = ({email, password}: LoginCredentials) => {
        setLoading(true);
        axiosInstance.post<LoginResponse>(
                "/client/auth/login", 
                {email, password}
            )
            .then((response) => {
                if (!response.data.success) {
                    return;
                }

                const data = response.data.data;
                afterAuthentication(data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const register = ({name, email, password}: RegisterCredentials) => {
        setLoading(true);
        axiosInstance.post<RegisterResponse>(
                "/client/auth/register", 
                {name, email, password}
            )
            .then((response) => {
                if (!response.data.success) {
                    return;
                }

                const data = response.data.data;
                afterAuthentication(data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const afterAuthentication = (data: RegisterResponse["data"] | LoginResponse["data"]) => {
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        navigate("/");
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
        socket.emit("user-id", {user_id: user?.id});
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
