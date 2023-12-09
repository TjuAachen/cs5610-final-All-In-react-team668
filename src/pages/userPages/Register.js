import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../../services/users/users-thunks";
import { initFollowThunk } from "../../services/thunks/followee-thunk";
import "./Register_styles.css";
import Title from "../../components/Title";

const Register = () => {
  const ADMINCODE = "allinAdmin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [typeofinvestor, setTypeOfInvestor] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [userNameAlert, setUserNameAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [typeofinvestorAlert, setTypeOfInvestorAlert] = useState(false);

  //   const addPlaylist = async (userId) => {
  //     const newPlaylist = {
  //       user: userId,
  //       playListName: `Default`,
  //       description: "",
  //       isDefault: true,
  //       img: "/images/playlist-cover.jpeg",
  //       rating: 0,
  //     };
  //     await createPlaylist({ playlist: newPlaylist, cnt: 1 });
  //   };

  const checkInfo = () => {
    setUserNameAlert(false);
    setPasswordAlert(false);
    setPhoneAlert(false);
    setEmailAlert(false);
    setTypeOfInvestorAlert(false);
    if (userName === "") {
      setUserNameAlert(true);
      return false;
    }
    if (email === "") {
      setEmailAlert(true);
      return false;
    }
    if (cellphone === "") {
      setPhoneAlert(true);
      return false;
    }
    if (password === "") {
      setPasswordAlert(true);
      return false;
    }
    if (typeofinvestor === "") {
      setTypeOfInvestorAlert(true);
      return false;
    }
    return true;
  };

  const register = async () => {
    setAdminError(false);
    try {
      if (isAdmin && adminCode !== ADMINCODE) {
        setAdminError(true);
        return;
      }
      setAdminCode("");
      // check each field before submit
      const isValid = checkInfo();
      console.log("valid", isValid)
      if (!isValid) {
        return;
      }
      localStorage.clear();
      await dispatch(
        registerThunk({
          userName,
          password,
          email,
          cellphone,
          typeofinvestor,
          isAdmin,
        })
      ).then((res) => {
        const user_id = res.payload._id;
        // add empty followeeList for new user
        dispatch(initFollowThunk(user_id));

        // TODO: add content for newly registered user
      });
      await dispatch(loginThunk({ userName, password })).then((res) => {
        const user_id = res.payload._id;
        navigate(`/home?_id=${user_id}`);
      });
    } catch (error) {
      alert("User name or email already exists!");
    }
  };

  return (
    <div>
      <Title />
      <div className={`register-window-div`}>
      <h1 className="text-heading fw-bold">Create a new account</h1>
        <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
          <label htmlFor="userName" className="text-heading">
            UserName
          </label>
          {userNameAlert && (
            <p className={`mb-0 text-danger col p-0`}>Please enter username</p>
          )}
        </div>

        <input className="form-control"
          id="userName"
          placeholder="Enter a userName*"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
          required={true}
        />
      </div>

      <div className={`mt-3`}>
        <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
          <label htmlFor="email" className="text-heading">
            Email
          </label>
          {emailAlert && (
            <p className={`mb-0 text-danger col p-0`}>Please enter email</p>
          )}
        </div>

        <input className="form-control"
          id="email"
          placeholder="Enter your email*"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          required={true}
        />
      </div>

      <div className={`mt-3`}>
        <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
          <label htmlFor="phone" className="text-heading">
            Phone
          </label>
          {phoneAlert && (
            <p className={`mb-0 text-danger col p-0`}>
              Please enter phone number
            </p>
          )}
        </div>

        <input className="form-control"
          id="phone"
          placeholder="Enter your cellphone*"
          value={cellphone}
          onChange={(e) => {
            setCellphone(e.target.value);
          }}
          type="text"
          required={true}
        />
      </div>

      <div className={`mt-3`}>
        <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
          <label htmlFor="password" className="text-heading">
            Password
          </label>
          {passwordAlert && (
            <p className={`mb-0 text-danger col p-0`}>Please enter password</p>
          )}
        </div>

        <input className="form-control"
          id="password"
          placeholder="Create a password*"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          required={true}
        />
      </div>

      <div className={`mt-3`}>
        <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
          <label className="text-heading">Level</label>
          {typeofinvestorAlert && (
            <p className={`mb-0 text-danger col p-0`}>Please select typeofinvestor</p>
          )}
        </div>

        <div className={`mt-2 d-flex justify-content-start`}>
          <label className={`text-muted`}>
            <input
              type="radio"
              name="typeofinvestor"
              value="newbie"
              onChange={(e) => {
                setTypeOfInvestor(e.target.value);
              }}
            />
            Newbie {"(less than 3 year exp.)"}
          </label>
          <label className={`ms-3 text-muted`}>
            <input
              type="radio"
              name="typeofinvestor"
              value="experienced"
              onChange={(e) => {
                setTypeOfInvestor(e.target.value);
              }}
            />
            Experienced {"(No less than 3 year exp.)"}
          </label>
        </div>
      </div>

      <div className={`mt-3`}>
        <label className="text-heading">User Type</label>

        <div className={`mt-2 d-flex justify-content-start align-items-center`}>
          <label className={`text-muted`}>
            <input
              type="radio"
              name="userType"
              value="false"
              onChange={(e) => {
                setIsAdmin(e.target.value === "true");
                setAdminError(false);
                setAdminCode("");
              }}
            />
            Regular
          </label>
          <label className={`ms-2 text-muted`}>
            <input
              type="radio"
              name="userType"
              value="true"
              onChange={(e) => {
                setIsAdmin(e.target.value === "true");
              }}
            />
            Admin
          </label>
          {isAdmin && (
            <label>
              <input
                type="text"
                name="adminCode"
                value={adminCode}
                placeholder="Enter Code"
                onChange={(e) => {
                  setAdminCode(e.target.value);
                }}
                className={`form-control admin-control-input ms-1`}
              />
            </label>
          )}
        </div>
        {adminError && <p className={`text-danger mb-0`}>Wrong Admin Code</p>}
      </div>

      <div className={`mt-5 d-flex justify-content-center `}>
        <button
          type="button"
          onClick={register}
          className={`btn fw-bold`}
          style={{ color: "white", backgroundColor: "#5ac53b" }}
        >
          Create Account
        </button>
      </div>
      <div
        className={`mt-5 d-flex justify-content-center already-have-account text-muted`}
      >
        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
