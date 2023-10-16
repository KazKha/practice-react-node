
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../Contexts/ContextStateManage";

function Headers() {
    const nagivate = useNavigate();
     
    //const dataId = useContext(appContext)
    const { state, dispatch }  = useContext(StateContext)
    console.log(state);
  
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
            // dataId.dataId.updateData({
            //     ...dataId.dataId.data,
            //     islogin:false
            // });
            nagivate('/sign-in');
            sessionStorage.removeItem("items");
            dispatch({ type: 'LOGOUT' });
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
               
                { state.islogin === true  ? <NavLink style={navLinkStyles} to="/user-listing">
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

                { state.islogin === true  ? <NavLink style={navLinkStyles} to="/profile">
                    Profile
                </NavLink> :''}


                { state.islogin === false  ?<NavLink style={navLinkStyles} to="/sign-in">
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
