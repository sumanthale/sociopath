import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import { loggedInUser, signOut } from '../../../redux/user/user.actions';
import UsersList from './UsersList';
import NavSideBar from './NavSideBar';
const NavBar = () => {
  const dispatch = useDispatch();
  const screen = window.screen;

  const [search, setSearch] = useState(false);

  const [sideBar, setsideBar] = useState(false);
  useEffect(() => {
    dispatch(loggedInUser());
  }, []);

  const largeScreen = (
    <>
      <form className="ml-auto d-none d-sm-block w-50">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onFocus={() => {
            setSearch(true);
          }}
        />
      </form>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item m-2">
          <NavLink className="nav-link" to="/" activeClassName="active">
            <i className="fas fa-home fa-2x"></i>
          </NavLink>
        </li>
        <li className="nav-item m-2">
          <NavLink className="nav-link" to="/notifications" activeClassName="">
            <i className="fas fa-bell text-dark fa-2x"></i>
          </NavLink>
        </li>

        <li className="nav-item m-2 dropdown ">
          <div
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="far fa-user fa-2x"></i>
          </div>
          <div
            className="dropdown-menu"
            style={{
              minWidth: 'fit-content',
              left: '-50px',
            }}
            aria-labelledby="navbarDropdown"
          >
            <Link
              className="dropdown-item"
              to={auth.currentUser.email.split('@')[0]}
            >
              Profile
            </Link>

            <button
              className="dropdown-item"
              onClick={() => dispatch(signOut())}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </>
  );
  const mobileScreen = (
    <>
      <ul className="navbar-nav ">
        <li className="nav-item m-2">
          <NavLink className="nav-link" to="/" activeClassName="active">
            <i
              className="fas fa-home"
              style={{
                fontSize: '26px',
              }}
            ></i>
          </NavLink>
        </li>
        <li className="nav-item m-2">
          <div className="nav-link">
            <i
              className="fas fa-search text-dark"
              style={{
                fontSize: '26px',
              }}
              onClick={() => setSearch(true)}
            ></i>
          </div>
        </li>
        <li className="nav-item m-2 notification">
          <NavLink className="nav-link " to="/notifications">
            {/* <span class="badge badge-primary notification_level-1">1</span> */}
            <i
              className="fas fa-bell text-dark"
              style={{
                fontSize: '26px',
              }}
            ></i>
          </NavLink>
        </li>

        <li className="nav-item m-2 dropdown ">
          <div
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i
              className="far fa-user"
              style={{
                fontSize: '26px',
              }}
            ></i>
          </div>
          <div
            className="dropdown-menu"
            style={{
              minWidth: 'fit-content',
              left: '-50px',
            }}
            aria-labelledby="navbarDropdown"
          >
            <Link
              className="dropdown-item"
              to={auth.currentUser.email.split('@')[0]}
            >
              Profile
            </Link>

            <button
              className="dropdown-item"
              onClick={() => dispatch(signOut())}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </>
  );
  const removeSearch = () => {
    setSearch(false);
  };

  const hamBurger = (e) => {
    console.log('ham' + sideBar);
    let el = e.target;
    if (el.nodeName === 'LI') {
      el = el.parentElement;
    }
    console.log(el.classList);
    el.classList.toggle('active');
    setsideBar(!sideBar);
  };

  const handelSidebar = () => {
    document.getElementById('ul').classList.toggle('active');
    setsideBar(false);
  };
  return (
    <>
      <nav className="navbar fixed-top navbar-expand navbar-primary bg-light">
        <div className="container-md">
          {screen && screen.width > 575 ? (
            <Link className="navbar-brand" to="/">
              <span
                className="h3 font-weight-bold"
                style={{
                  color: '#E84545',
                }}
              >
                Ask Osmanian
              </span>
            </Link>
          ) : (
            <ul className="ul" id="ul" onClick={hamBurger}>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          )}

          {screen && screen.width > 575 ? largeScreen : mobileScreen}
        </div>
      </nav>

      <NavSideBar sideBar={sideBar} handelSidebar={handelSidebar} />

      {search && <UsersList setSearch={removeSearch} />}
    </>
  );
};

export default NavBar;
