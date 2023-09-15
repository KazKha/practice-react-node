
import { NavLink, useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { useContext } from "react";

function Headers() {
     
    const dataId = useContext(appContext)
    const nagivate = useNavigate()
    console.log(dataId);
  
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "none" : "underline",
        };
    };

    const Logout = () => {
        const result =  window.confirm("Are you sure you want to Logout ?");
        if (result) {
            sessionStorage.clear();   
            dataId.dataId.updateData({
                ...dataId.dataId.data,
                islogin:false
            });
            nagivate('/sign-in')
        }
    }



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
               
                { dataId.dataId.islogin === true  ? <NavLink style={navLinkStyles} to="/user-listing">
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
                { dataId.dataId.islogin === false  ?<NavLink style={navLinkStyles} to="/sign-in">
                    {" "}
                    Sign-In
                </NavLink> : <NavLink style={navLinkStyles}   onClick={() => {
                    Logout(true);
                }}>
                    {" "}
                     Logout 
                </NavLink>}
                
            </div>
        </div>
    );
}

export default Headers;
