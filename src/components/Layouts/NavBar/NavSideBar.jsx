import React from 'react';

const NavSideBar = ({ sideBar, handelSidebar }) => {
  return (
    <>
      <div
        className={`navSideBar_level_1 ${sideBar ? 'active' : ''}`}
        onClick={handelSidebar}
      ></div>
      <div className={`navSideBar ${sideBar ? 'active' : ''} text-white`}>
        <div
          className="container-fluid"
          style={{
            height: '50vh',
          }}
        >
          <nav className="h-100">
            <div className="h-100">
              <ul className="nav flex-column  align-items-center justify-content-around h-100 mt-3 sidebar-main">
                <li className="nav-item btn ">
                  <span> Menu 1</span>
                </li>
                <li className="nav-item btn ">
                  <span> Menu 2</span>
                </li>
                <li className="nav-item btn ">
                  <span> Menu 3</span>
                </li>
                <li className="nav-item btn ">
                  <span> Menu 4</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavSideBar;
