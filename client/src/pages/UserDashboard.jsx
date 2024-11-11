import { Link } from "react-router-dom";
import Basket from "../assets/Basket.svg";
import Heart from "../assets/Favourites.svg";
import Sell from "../assets/sell.svg";
import MinSubMenu from "../assets/minimise-submenu.svg";

const UserDashboard = () => {
    return(
        <div className="user-dashboard-wrapper">
            <div className="dashboard-title"><h1><Link><img src={MinSubMenu} /></Link>User Dashboard</h1></div>
            <div className="submenu-links">
                <Link to=""><img src={Basket} />Basket</Link>
                <Link to=""><img src={Heart} />Watchlist</Link>
                <Link to=""><img src={Sell} />Selling</Link>
            </div>
        </div>
    )
}
export default UserDashboard;