import { useState } from "react";
import { Link } from "react-router-dom";
import Basket from "../assets/Basket.svg";
import Heart from "../assets/Favourites.svg";
import Sell from "../assets/sell.svg";
import MinSubMenu from "../assets/minimise-submenu.svg";
import BasketWhite from "../assets/Basket-white.svg";
import HeartWhite from "../assets/Favourites-white.svg";
import SellWhite from "../assets/sell-white.svg";


const UserDashboard = () => {
    // State to control which submenu is open
    const [openMenu, setOpenMenu] = useState(null);

    // Toggle function to show/hide submenus
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu); // Close if it's open, otherwise open it
    };

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
            </div>

            {/* Render submenu content in the main area based on openMenu state */}
            {openMenu === 'basket' && (
                <div className="submenu-content">
                <p>Your basket is currently empty.</p>
                </div>
            )}
            {openMenu === 'watchlist' && (
                <div className="submenu-content">
                <p>You have no items in your watchlist.</p>
                </div>
            )}
            {openMenu === 'selling' && (
                <div className="submenu-content">
                <p>You are not currently selling any items.</p>
                </div>
            )}
            </div>
    );
};

export default UserDashboard;
