import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/AuctoLogoLarge.svg';
import chevron from '../assets/chevronBlack.svg';
import chevronActive from '../assets/chevronOrange.svg';
import login from '../assets/Login.svg';
import favourites from '../assets/Favourites.svg';
import basket from '../assets/Basket.svg';
import search from '../assets/Search.svg';
import UserContainer from './UserContainer';
import UserProfilePicture from './UserProfilePicture';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/appUserSlice';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
      setIsOpen(!isOpen);  // Toggle between true/false
    };

  const user = useSelector((state) =>state.appUser.user)
  const location = useLocation

  const navigateLogin = () => {
    closeMenu()
    navigate("/login");
  };

  const logout = () => {
    console.log("logout")
    dispatch(logoutUser())
    navigate("/")
  }

  const loginProp = () => {
    console.log("login")
    navigate("/login")
  }

  const closeMenu = () =>{
    setIsOpen(false);
  }

    return (
    <header> 
        <div className={`hamburger-navbar ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
        <div className={`navbar-container ${isOpen ? 'open' : ''}`}>
            <a href="/" style={{ textDecoration: 'none' }}>
                <img src={ logo } rel='AuctoLogo'/>
                <h1>Aucto</h1>
            </a>
            <ul>
                <li>
                    <Link to="/" onClick={closeMenu}>
                        <p>Home</p>
                        <img src={chevron} rel='chevron' />
                    </Link>
                </li>
                <li>
                    <Link to="/shop" onClick={closeMenu}>
                        <p>Shop</p>
                        <img src={chevron} rel='chevron' />
                    </Link>
                </li>
                <li>
                    <Link to="#" onClick={closeMenu}>
                        <p>FAQ</p>
                        <img src={chevron} rel='chevron' />
                    </Link>
                </li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                <button>
                    <img src={ search } rel='search icon'/>
                </button>
            </form>
            <div>

                    {user? (
                        <Link to='/user-dashboard' onClick={closeMenu}>
                            <UserProfilePicture />
                            <p>Hi {user.username}!</p>
                            <a onClick={logout} className="logout-button">
                                <img src={login}></img>  
                                <p>
                                    Logout
                                </p>  
                            </a>
                        </Link>
                    ):
                    (        
                    <button className='login-btn' type="button" onClick={navigateLogin}>
                        <img src={ login } rel='login'/>
                        <p>Login</p>                        
                    </button>
                    )}
                <a href="#">
                    <img src={ favourites } rel='chevron' />
                </a>
                <a href="#">
                    <img src={ basket } rel='chevron' />
                </a>
            </div>
        </div>
    </header>
  );
};

export default Navbar;
