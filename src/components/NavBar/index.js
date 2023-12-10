import React, { useEffect, useState } from "react";
import "./index.css";
import Logo from "../../images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import PilledButton from "../Buttons/pilledButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "../../services/users/users-thunks";
import { cleanSearchReducer } from "../../reducers/search-reducer";

function NavBar() {
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(loginUser ? true : false);
  }, [loginUser]);

  return (
    <div className="header_wrapper">
      <div className="header_logo">
        <img src={Logo} width={45} />
        <div className="header_menuItems">
        <Link to="/">
          <a href="/">Home</a>
        </Link>
        <Link to="/search" onClick={() => dispatch(cleanSearchReducer)}>
          <a href="/search">Search</a>
        </Link>
        <Link to="/about">
          <a href="/about">About</a>
        </Link>
        </div>
      </div>

      {!login && (
        <>
          <div className="header_menuItems">
            <Link to="/login">
              <PilledButton
                buttonText="Log In"
                textColor="text-white"
                backgroundColor="btn-dark"
              />
            </Link>

            <Link to="/register">
              <PilledButton
                buttonText="Sign Up"
                textColor="text-black"
                backgroundColor="btn-light"
              />
            </Link>
          </div>
        </>
      )}

      {login && (
        <div className="d-flex">
          {currentUser && (
            <h5 className="text-success fw-bold text-nowrap m-0 pt-2">
              Hi
              <span className="header_menuItems"
              onClick={() => {
                navigate(`/profile`);
              }}
            >
              {currentUser.userName}
            </span>
            <span className="header_menuItems"
              onClick={() => {
                navigate(`/portfolio/${currentUser._id}`);
              }}
            >
              Portfolio
            </span>
            </h5>
          )}

          <Link to="/login" className="text-muted pt-2 navbar-text mx-3">
            <span
              onClick={() => {
                dispatch(logoutThunk());
                navigate("/login");
              }}
            >
              Logout
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
