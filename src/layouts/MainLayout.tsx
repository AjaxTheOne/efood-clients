import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";

function MainLayout() {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const hideHeader = [
            "/stores/", 
            "/account",
            "/orders",
            "/profile",
            "/addresses"
        ].some(path => location.pathname.includes(path));
        
        setShowHeader(!hideHeader);
    }, [location]);

    return (
        <div>
            { showHeader && <Header /> }
            <div>
                <Outlet />
            </div>
            {/* <Footer/> */}
        </div>
    );
}

export default MainLayout;