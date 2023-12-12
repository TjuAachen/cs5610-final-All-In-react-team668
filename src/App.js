import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./pages/userPages/Register";
import Login from "./pages/userPages/Login";
import Profile from "./pages/userPages/Profile";
import Premium from "./pages/userPages/Premium";
import { Routes, Route, useNavigate } from "react-router";
import Home from "./pages/homePage/Home";
import Admin from "./pages/userPages/Admin";
import Search from "./pages/searchPages/index.js";
import WatchListDetail from "./pages/detailPages/watchlistDetailPage/watchlistDetail.js";
import StockDetail from "./pages/detailPages/stockDetailPage/stockDetail.js";
import PortfolioPage from "./pages/portfolioPage/index.js";
import About from "./pages/aboutPage/index.js";

function App() {

  return (
    <Provider store={store}>
      <div className="app">
        <div className="app_header">
          <NavBar />
        </div>
        <div className="app_body page-min-height">
          {/*<div className="app_container">
            <p className="title">All-In</p>
            <p className="subtitle">
              Search stocks <span className="underline-text">All-In</span> here
            </p>
  </div>*/}
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/profile/admin/*" element={<Admin />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/details/watchlist/:wid" element={<WatchListDetail />} />
            <Route path="/details/:ticker" element={<StockDetail />} />
            <Route path="/portfolio/:uid" element={<PortfolioPage />} />
            <Route path="/about" element={<About />} />
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
