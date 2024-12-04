import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { NavLink } from "react-router-dom";
import axios from "axios";
import MenuIcon from "./icon/menu.svg";
import CloseIcon from "./icon/close.svg";
import CartIcon from "./icon/cart.svg";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminLinks = () => (
    <>
      <li>
        <NavLink to="/create_product" activeClassName="active">Create Product</NavLink>
      </li>
      <li>
        <NavLink to="/category" activeClassName="active">Categories</NavLink>
      </li>
      <li>
        <NavLink to="/curOrders" activeClassName="active">Current Orders</NavLink>
      </li>
    </>
  );

  const userLinks = () => (
    <>
      {!isAdmin && (
        <li>
          <NavLink to="/history" activeClassName="active">History</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
      </li>
    </>
  );

  return (
    <nav className="header">
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={MenuIcon} alt="Menu" width="30" />
      </div>

      <div className="logo">
        <h1>
          <NavLink to="/">{isAdmin ? "Admin" : "Amul Parlor"}</NavLink>
        </h1>
      </div>

      <ul className={`nav-links ${menu ? "active" : ""}`}>
              <li className={`home ${menu?"active":""}`}>
          <NavLink to="/" activeClassName="active">
            {isAdmin ? "Products" : "Home"}
          </NavLink>
        </li>
        {isAdmin && adminLinks()}
        {isLogged ? userLinks() : (
          <li>
            <NavLink to="/login" class="login-btn" activeClassName="active">Sign IN</NavLink>
          </li>
        )}
        <li className="close-menu" onClick={() => setMenu(!menu)}>
          <img src={CloseIcon} alt="Close" width="30" />
        </li>
      </ul>

      {!isAdmin && isLogged && (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <NavLink to="/cart">
            <img src={CartIcon} alt="Cart" width="30" />
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Header;
