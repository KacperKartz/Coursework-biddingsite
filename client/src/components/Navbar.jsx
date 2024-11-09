import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/AuctoLogoLarge.svg';
import chevron from '../assets/chevronBlack.svg';
import chevronActive from '../assets/chevronOrange.svg';
import login from '../assets/Login.svg';
import favourites from '../assets/Favourites.svg';
import basket from '../assets/Basket.svg';
import search from '../assets/Search.svg';


const Navbar = () => {
  return (
    <header> 
        <div className='navbar-container'>
            <a href="/" style={{ textDecoration: 'none' }}>
                <img src={ logo } rel='AuctoLogo'/>
                <h1>Aucto</h1>
            </a>
            <ul>
                <li>
                    <a href="/" className='activeLink'>
                        <p>Home</p>
                        <img src={chevronActive} rel='chevron' />
                    </a>
                </li>
                <li>
                    <a href="/shop">
                        <p>Shop</p>
                        <img src={chevron} rel='chevron' />
                    </a>
                </li>
                <li>
                    <a href="/#productCategories-container">
                        <p>Categories</p>
                        <img src={chevron} rel='chevron' />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <p>FAQ</p>
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
                <button type="button">
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
        </div>
    </header>
  );
};

export default Navbar;
