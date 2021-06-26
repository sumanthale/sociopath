import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import { signOut } from '../../../redux/user/user.actions';
import UsersList from './UsersList';

const NavBar = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState(false);

  const removeSearch = () => {
    setSearch(false);
  };
  return (
    <>
      <nav className="navbar fixed-top navbar-expand navbar-primary bg-light">
        <div className="container-md">
          <Link className="navbar-brand" to="/">
            <span className="h3 font-weight-bold">Sociopath</span>
          </Link>

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
            <li className="nav-item m-2 dropdown ">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-bell fa-2x"></i>
              </div>
              <div
                className="dropdown-menu"
                style={{
                  minWidth: 'fit-content',
                  left: '-50px',
                }}
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>

                <Link className="dropdown-item" to="#">
                  Logout
                </Link>
              </div>
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
        </div>
      </nav>
      {search && <UsersList setSearch={removeSearch} />}
    </>
  );
};

export default NavBar;
