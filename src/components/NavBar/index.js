import React from "react";
import "./index.css";
import Logo from '../../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import PilledButton from "../Buttons/pilledButton";
import {Link} from "react-router-dom";

function NavBar() {
    return (
        
        <div className="header_wrapper">

            <div className="header_logo">
                <img src={Logo} width={45} />
                <div className="header_menuItems">
                    <a href="/">Home</a>
                    <a href="/">Search</a>
                    <a href="/">About</a>
                </div>
            </div>


            {/* TODO render the header_menuItems by the user*/}
            <div className="header_menuItems">
                <Link to="/">
                    <PilledButton buttonText="Log In" textColor="text-white" backgroundColor="btn-dark" />
                </Link>

                <Link to="/">
                    <PilledButton buttonText="Sign Up" textColor="text-black" backgroundColor="btn-light" />
                </Link>


            </div>

        </div>

    )
}

export default NavBar;