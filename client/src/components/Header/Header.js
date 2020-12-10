import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";
import { Link, withRouter } from "react-router-dom";
import Avatar from "react-avatar";
import firebase from "../../config";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Header({ history, isLoggedIn }) {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const [showMenus, setShowMenus] = useState(false);
  const [showDesktopCollapsible, setShowDesktopCollapsible] = useState(false);

  const handleNavBarClick = () => {
    showMenus ? setShowMenus(false) : setShowMenus(true);
  };

  const handleCollapsibleClick = () => {
    showDesktopCollapsible
      ? setShowDesktopCollapsible(false)
      : setShowDesktopCollapsible(true);
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__logo-link'>
          <img src={logo} alt='logo' className='header__logo-image' />
        </Link>
      </div>
      {!isLoggedIn && (
        <div className='header__login-register'>
          <Link>Login</Link>
          <Link>Signup</Link>
        </div>
      )}
      {!isDesktop && isLoggedIn && (
        <div className='header-menu-bar'>
          <FontAwesomeIcon
            icon={showMenus ? faTimesCircle : faBars}
            className='header-menu-bar__nav-bar-icon'
            onClick={handleNavBarClick}
          />
        </div>
      )}
      {!isDesktop && isLoggedIn && showMenus && (
        <nav className='header-menus-kebab'>
          <ul className='header-menus-kebab__list'>
            <li className='header-menus-kebab__list-item'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className='header-menus-kebab__list-item'>
              <Link to='/my-account'>My Account</Link>
            </li>
            <li
              className='header-menus-kebab__list-item'
              onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      )}

      {isLoggedIn && isDesktop && (
        <nav className='header-menus'>
          <div className='header-menus__buttons'>
            <Link to='/dashboard' className='header-menus__dashboard'>
              Dashboard
            </Link>
          </div>
          <div className='header-menus__collapse'>
            <Avatar
              name='Nahid Hossain'
              size='50'
              className='header-menus__avatar'
              onClick={handleCollapsibleClick}
              textSizeRatio={1.75}
              color='#3bc371'
            />
          </div>
          {showDesktopCollapsible && (
            <ul className='header-menus__items'>
              <li className='header-menus__item'>Nahid Hossain</li>
              <li className='header-menus__item'>oikantik@gmail.com</li>
              <li className='header-menus__item'>
                <Link to='/my-account'>My Account</Link>
              </li>
              <li className='header-menus__item' onClick={handleLogout}>
                Logout
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
}

Header.proptype = {
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
