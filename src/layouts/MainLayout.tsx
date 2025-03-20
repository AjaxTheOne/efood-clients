import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";

function MainLayout() {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        setShowHeader(
            !location.pathname.includes("/stores/")
        );
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