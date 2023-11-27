import './App.css';
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { Routes, Route, useNavigate } from "react-router";
import Home from './pages/homePage/Home';
import Register from './pages/userPages/Register';

function App() {
  return (

    <div className="app">
      <div className="app_header">
        <NavBar />
      </div>
      <div className="app_body">
        <div className="app_container">
          <p className="title">All-In</p>
          <p className="subtitle">Search stocks <span className="underline-text">All-In</span> here</p>
        </div>
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </div>
      <div className="app_footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
