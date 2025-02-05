import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user } = useAuth();

    return (
        <div className="px-10 py-6 navbar bg-base-100 ">
            <div className="flex-1">
                <Link
                    to="/"
                >
                    Efood 360
                </Link>
            </div>
            <div className="flex-none">
                {
                    user
                        ? <p>Hello, {user.name}</p>
                        : (
                            <ul className="menu menu-horizontal px-1">
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive ? "bg-gray-300" : ""
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            isActive ? "bg-gray-300" : ""
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                        )
                }

            </div>
        </div>
    );
}

export default Header;