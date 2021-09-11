import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GlobalState } from "../context/GlobalState";

function Header() {
  const [menu, setMenu] = useState(false);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  const logOut = async () => {
    await axios.get("https://code-blogs-tech.herokuapp.com/user/logout");
    setIsLogged(false);
    window.location.href = "/";
  };

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
            {isLogged ? (
              <li>
                <NavLink to="/category">category</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/tips">tips & tricks</NavLink>
              </li>
            )}
            {isLogged ? (
              <li>
                <NavLink to="/create_post">post</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/about">about me</NavLink>
              </li>
            )}
            {isLogged ? (
              <li className="btn btn-outline-danger ps-3 ms-3" onClick={logOut}>
                Log out <i className="fas fa-sign-out-alt mx-1"></i>
              </li>
            ) : (
              <li>
                <NavLink to="/contact">contact me</NavLink>
              </li>
            )}
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
