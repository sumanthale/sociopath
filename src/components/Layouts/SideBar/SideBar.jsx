import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="#">
              <span data-feather="home"></span>
              Menu <span className="sr-only">(current)</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="#">
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <span data-feather="shopping-cart"></span>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <span data-feather="users"></span>
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <span data-feather="bar-chart-2"></span>
              Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <span data-feather="layers"></span>
              Integrations
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
