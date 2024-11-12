import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Basket from "../assets/Basket.svg";
import Heart from "../assets/Favourites.svg";
import Sell from "../assets/Sell.svg";
import MinSubMenu from "../assets/minimise-submenu.svg";
import FAQ from "../assets/FAQ.svg";
import BasketWhite from "../assets/Basket-white.svg";
import HeartWhite from "../assets/Favourites-white.svg";
import SellWhite from "../assets/sell-white.svg";
import FAQWhite from "../assets/FAQ-white.svg";

import BasketComponenet from "../components/BasketComponenet";
import Plus from "../assets/Plus.svg";
import SellingItems from "../components/SellingItems";
import FAQPage from "../components/FAQPage";
import { useSelector } from 'react-redux';
import Watchlist from "../components/Watchlist";


const UserDashboard = () => {
    // State to control which submenu is open
    const [openMenu, setOpenMenu] = useState(null);

    // Get the URL location object
    const location = useLocation();

    // Toggle function to show/hide submenus
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? menu : menu); // Close if it's open, otherwise open it
        setOpenMenu(openMenu === menu ? menu : menu); // Close if it's open, otherwise open it
    };

    const userId = useSelector((state) => state.appUser.user?.userId);
    console.log(userId)

    // Effect to handle URL parameters and open the submenu
    useEffect(() => {
        // Parse the query parameter to find the "menu" value
        const params = new URLSearchParams(location.search);
        const menu = params.get('menu');
        
        if (menu) {
            setOpenMenu(menu);  // Set the openMenu based on URL parameter
        }
    }, [location.search]);  // Run this effect whenever the URL changes

    return (
        <div className="user-dashboard-wrapper">
            <div className="dashboard-title">
                <h1>
                    <Link>
                        <img src={MinSubMenu} alt="Minimize submenu" />
                    </Link>
                    User Dashboard
                </h1>
            </div>

            <div className="submenu-links">
                {/* Basket Submenu */}
                <Link 
                    to="#" 
                    onClick={() => toggleMenu('basket')}
                    className={openMenu === 'basket' ? 'active' : ''}
                >
                    <img src={openMenu === 'basket' ? BasketWhite : Basket} alt="Basket" /> Basket
                </Link>

                {/* Watchlist Submenu */}
                <Link 
                    to="#" 
                    onClick={() => toggleMenu('watchlist')}
                    className={openMenu === 'watchlist' ? 'active' : ''}
                >
                    <img src={openMenu === 'watchlist' ? HeartWhite : Heart} alt="Watchlist" /> Watchlist
                </Link>

                {/* Selling Submenu */}
                <Link 
                    to="#" 
                    onClick={() => toggleMenu('selling')}
                    className={openMenu === 'selling' ? 'active' : ''}
                    >
                    <img src={openMenu === 'selling' ? SellWhite : Sell} alt="Selling" /> Selling
                </Link>

                {/* FAQ Submenu */}
                <Link 
                    to="#" 
                    onClick={() => toggleMenu('FAQ')}
                    className={openMenu === 'FAQ' ? 'active' : ''}
                    >
                    <img src={openMenu === 'FAQ' ? FAQWhite : FAQ} alt="Selling" /> FAQ
                </Link>
            </div>

            {/* Render submenu content in the main area based on openMenu state */}
            {openMenu === 'basket' && (
                <div className="submenu-content">
                <BasketComponenet user={userId}></BasketComponenet>
                </div>
            )}
            {openMenu === 'watchlist' && (
                <div className="submenu-content">
                    <Watchlist />
                </div>
            )}
            {openMenu === 'selling' && (
                <div className="submenu-content">
                    <SellingItems user={userId}></SellingItems>
                    <Link to="../add-product" className="sellNewBtn">
                        <img src={Plus} alt="Selling" />
                        Add a New Listing
                    </Link>
                </div>
            )}
            {openMenu === 'FAQ' && (
                <div className="submenu-content">
                    <FAQPage />
                </div>
            )}
            {openMenu === 'FAQ' && (
                <div className="submenu-content">
                    <FAQPage />
                </div>
            )}
            </div>
    );
};

export default UserDashboard;
