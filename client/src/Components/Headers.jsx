
import { NavLink } from "react-router-dom";
import { appContext } from "../App";
import { useContext } from "react";

function Headers() {
     
    const dataId = useContext(appContext)
     console.log( dataId.dataId );
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "none" : "underline",
        };
    };
    return (
        <div className="header-sections">
            <div className="nav-bar">
                <NavLink style={navLinkStyles} to="/">
                    CompanyLogo
                </NavLink>

                <NavLink style={navLinkStyles} to="/">
                    {" "}
                    Home
                </NavLink>
               
                { dataId.dataId.listform === true  ? <NavLink style={navLinkStyles} to="/user-listing">
                    {" "}
                    User List
                </NavLink> :''}
                <NavLink style={navLinkStyles} to="/about-us">
                    {" "}
                    About
                </NavLink>
                <NavLink style={navLinkStyles} to="/Contact-us">
                    {" "}
                    Contact
                </NavLink>
                <NavLink style={navLinkStyles} to="/sign-in">
                    {" "}
                    Sign-In
                </NavLink>
            </div>
        </div>
    );
}

export default Headers;
