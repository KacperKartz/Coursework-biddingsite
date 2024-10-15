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
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/appUserSlice';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) =>state.appUser.user)
  const location = useLocation

  const navigateLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    console.log("logout")
    dispatch(logoutUser())
    navigate("/")
  }
z
  const loginProp = () => {
    console.log("login")
    navigate("/login")
  }

    return (
    <header> 
        <div className='navbar-container'>
            <a href="/">
                <img src={ logo } rel='AuctoLogo'/>
                <h1>Aucto</h1>
            </a>
            <ul>
                <li>
                    <Link to="/" className='activeLink'>
                        <p>Home</p>
                        <img src={chevronActive} rel='chevron' />
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <p>Shop</p>
                        <img src={chevron} rel='chevron' />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <p>Catagories</p>
                        <img src={chevron} rel='chevron' />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <p>About</p>
                        <img src={chevron} rel='chevron' />
                    </a>
                </li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                <button>
                    <img src={ search } rel='search icon'/>
                </button>
            </form>
            <div>
                <button type="button" onClick={navigateLogin}>
                    <img src={ login } rel='login'/>
                    <p>Login</p>
                </button>
                <a href="#">
                    <img src={ favourites } rel='chevron' />
                </a>
                <a href="#">
                    <img src={ basket } rel='chevron' />
                </a>
            </div>
            <UserContainer user={user} logout={logout} login={loginProp}></UserContainer>
        </div>
    </header>
  );
};

export default Navbar;
