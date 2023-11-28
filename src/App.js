import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./pages/userPages/Register";
import Login from "./pages/userPages/Login";
import { Routes, Route, useNavigate } from "react-router";
import Home from "./pages/homePage/Home";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="app_header">
          <NavBar />
        </div>
        <div className="app_body">
          <div className="app_container">
            <p className="title">All-In</p>
            <p className="subtitle">
              Search stocks <span className="underline-text">All-In</span> here
            </p>
          </div>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <div className="app_footer">
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
