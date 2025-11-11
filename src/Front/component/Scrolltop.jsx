import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // route change pe top par le aata hai
    }, [pathname]);

    return null;
}

export default ScrollToTop;
