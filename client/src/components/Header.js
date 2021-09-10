import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  return (
    <div className="header">
      <header className="container align-items-center">
        <div className="logo">
          <h4>
            <Link to="/">CodeBlogs</Link>
          </h4>
        </div>
        <div>
          <ul style={styleMenu}>
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              <NavLink to="/books">free books</NavLink>
            </li>
            <li>
              <NavLink to="/tips">tips & tricks</NavLink>
            </li>
            <li>
              <NavLink to="/about">about me</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact me</NavLink>
            </li>
            <li className="menu cross" onClick={() => setMenu(!menu)}>
              <i className="fas fa-times"></i>
            </li>
          </ul>
        </div>
        <div className="menu" onClick={() => setMenu(!menu)}>
          <i className="fas fa-bars icon me-1"></i>
        </div>
      </header>
    </div>
  );
}

export default Header;
