import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Headers from "./Components/Headers";
import UserListing from "./Components/UserListing";
import AboutUs from "./Components/AboutUs";
import MainPage from "./Components/MainPage";
import ContactUs from "./Components/ContactUs";
import UserDetails from "./Components/UserDetails";
import SignIn from "./Components/SignIn";
import Other from "./Components/Other";


import { StateProvider   } from "./Contexts/ContextStateManage";
// import  {AuthProvider}  from "./Contexts/AuthContext";
// import LoginForm from "./Contexts/LoginForm"; 
import PrivateRoute from "./Contexts/PrivateRoutes"; //- Assuming this component has not been implemented yet.
import Profile from "./Components/Profile";

    function App() {
    return (
        // <appContext.Provider value={{  dataId, setdataId }}>
        <StateProvider >
            
            <>
                <Headers />
                <Routes>
                    <Route exact path="/about-us" element={<AboutUs />} />
                    {/* <PrivateRoute path="/user-listing" element={<UserListing />} />
                    <PrivateRoute path="/user-detail/:id" element={<UserDetails />} />                     */}
                    <Route exact path="/user-listing" element={<UserListing />} />
                    <Route exact path="/user-detail/:id" element={<UserDetails />} />                    
                    <Route exact path="/contact-us" element={<ContactUs />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/sign-in" element={<SignIn />} />
                    <Route exact path="/other" element={<Other />} />
                    <Route exact path="/" element={<MainPage />} />
                </Routes>
            </>
        </StateProvider>
        // </appContext.Provider>
    );
}

export default App;
