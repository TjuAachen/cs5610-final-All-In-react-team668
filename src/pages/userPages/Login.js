import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../services/users/users-thunks";
// import {cleanSearchReducer} from "../reducers/search-reducer";
import "./Login_styles.css";
import Title from "../../components/Title";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      //   dispatch(cleanSearchReducer());
    }
  }, []);

  const handleLogin = async () => {
    setShowLoginError(false);
    try {
      localStorage.clear();
      dispatch(loginThunk({ userName, password })).then((res) => {
        const currentUser = window.localStorage.getItem("currentUser");
        if (currentUser) {
          const userID = JSON.parse(
            window.localStorage.getItem("currentUser")
          )._id;
          // navigate(`/home?_id=${userID}`);
          navigate(`/home`);
        } else {
          setShowLoginError(true);
        }
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return <>
    <Title />
    <div className="position-relative">
      <div className="row w-100 p-0 ms-5">
        {/* <div
          className="register-window-div col-9 col-md-7 col-lg-6 col-xl-5 xxl-5 mt-5"
        > */}
        {/* <div className="mt-5"> */}
        <div >
          <h1 className="text-heading fw-bold">Welcome Back!</h1>
          {showLoginError && (
            <div
              className="position-absolute d-flex justify-content-center"
            >
              <h5 className="text-danger">Authentication failed!</h5>
            </div>
          )}
          <div className="mt-0">
            <label
              htmlFor="login-userName"
              className="mt-4 text-heading fw-bold mb-2"
            >
              UserName
            </label>
            <input
              id="login-userName"
              name="userName"
              placeholder="Enter your userName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              required={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="form-control"
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="login-password"
              className="mt-2 text-heading fw-bold mb-2"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required={true}
              className="form-control"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>

          <div className="mt-5 d-flex justify-content-center ">
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-bg-color text-white fw-bold"
            >
              Login
            </button>
          </div>
          <div
            className="mt-5 d-flex justify-content-center already-have-account text-muted"
          >
            <p>
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* <div className="position-absolute login-img-band">
        <img src="/images/welcome-2.avif" height={"800px"} width={"800px"} />
      </div> */}
    </div>
  </>
};

export default Login;