import React, { useState, useEffect } from 'react';
import {NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
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
import SearchBar from './SearchBar';
import axios from 'axios';



const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
      setIsOpen(!isOpen); 
    };

  const user = useSelector((state) =>state.appUser.user)
  const location = useLocation

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/api/products`)
      .then(response => {
        setData(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error(error);
        setError(error); 
        setLoading(false); 
      });
  }, []);



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
                    <NavLink to="/" onClick={closeMenu}>
                        <p>Home</p>
                    </NavLink>
                </li>
                <li>
                <NavLink
                  to="/shop"
                  onClick={closeMenu}
                >
                  {({ isActive }) => (
                    <>
                      <p>Shop</p>
                      {/* Conditionally render the chevron based on isActive */}
                      <img src={isActive ? chevronActive : chevron} alt="chevron" />
                    </>
                  )}
                </NavLink>
                </li>
                <li>
                    <NavLink to="/user-dashboard?menu=FAQ" onClick={closeMenu}>
                        <p>FAQ</p>
                    </NavLink>
                </li>
            </ul>
            <SearchBar listings={data}></SearchBar>
            <div>

                    {user? (
                      <>
                        <Link to='/user-dashboard?menu=basket' onClick={closeMenu}>
                          <UserProfilePicture />
                          <p>Hi {user.username}!</p>
                        </Link>
                        <a onClick={logout} className="logout-button">
                            <img src={login}></img>  
                            <p>
                                Logout
                            </p>  
                        </a>
                      </>
                    ):
                    (        
                    <button className='login-btn' type="button" onClick={navigateLogin}>
                        <img src={ login } rel='login'/>
                        <p>Login</p>                        
                    </button>
                    )}
                <Link to="/user-dashboard?menu=watchlist">
                    <img src={ favourites } rel='chevron' />
                </Link>
                <Link to="/user-dashboard?menu=basket">
                    <img src={ basket } rel='chevron' />
                </Link>
            </div>
        </div>
    </header>
  );
};

export default Navbar;
