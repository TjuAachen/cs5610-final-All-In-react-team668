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
import { findCurrentUserThunk } from "../../services/users/users-thunks";

function NavBar() {
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(findCurrentUserThunk());
  }, [])

  useEffect(() => {
    setLogin(loginUser ? true : false);
  }, [loginUser]);
  console.log(currentUser, "debug currentUser in NavBar")
  return (
    <div className="header_wrapper">
      <div className="header_logo">
        <img src={Logo} width={45} />
        <div className="header_menuItems">
          <Link to="/">
            <a href="/">Home</a>
          </Link>
          <Link to="/search" onClick={() => dispatch(cleanSearchReducer())}>
            <a href="/search">Search</a>
          </Link>
          <Link to="/about">
            <a href="/about">About</a>
          </Link>
          {(loginUser && loginUser.isAdmin) &&(
          <Link to="/admin">
            <a href="/admin">Admin</a>
          </Link>)}
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
          {loginUser && (
            <div className="header_wrapper">
              <div className="header_menuItems">

                <Link to="/profile">
                  <a href="/profile">
                    Hi {loginUser.userName}
                  </a>
                </Link>
                {loginUser.isVip && (<Link to={`/portfolio/${loginUser._id}`}>
                  <a href={`/portfolio/${loginUser._id}`}>
                    Portfolio
                  </a>
                </Link>)}
                <Link to="/login" className="text-muted pt-2 navbar-text mx-3" onClick={() => {
                  dispatch(logoutThunk());
                  dispatch(cleanSearchReducer());
                  navigate("/login");
                }}>
                  <PilledButton
                    buttonText="Log out"
                    textColor="text-white"
                    backgroundColor="btn-danger"
                  />

                </Link>
              </div>
            </div>
          )}


        </div>
      )}
    </div>
  );
}

export default NavBar;
