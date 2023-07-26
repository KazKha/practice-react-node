import React from 'react'
import {  NavLink } from 'react-router-dom'


function Headers() {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline"
    };
  };
  return (
    <div className = 'header-sections'>
      <div  className = 'nav-bar'>

        < NavLink style ={navLinkStyles} to = "/" >CompanyLogo</NavLink>
          
        < NavLink style = {navLinkStyles} to ="/"> Home</NavLink>
        < NavLink style = {navLinkStyles} to ="/user-listing"> User List</NavLink>
        < NavLink style = {navLinkStyles} to ="/about-us"> About</NavLink>
        < NavLink style = {navLinkStyles} to ="/Contact-us"> Contact</NavLink>
      </div>
    </div>
  )
}

export default Headers