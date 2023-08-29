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
//import  {AuthProvider}  from "./Contexts/AuthContext";
// import LoginForm from "./Contexts/LoginForm";
// import PrivateRoute from "./Contexts/PrivateRoutes"; //- Assuming this component has not been implemented yet.
const appContext = createContext();
    function App() {
        const [dataId, setdataId] = useState(
            {
                'listform': 1,
                'islogin' : false
            }

        );


    return (
        <appContext.Provider value={{  dataId, setdataId }}>
            <>
                <Headers />
                <Routes>
                    <Route exact path="/about-us" element={<AboutUs />} />
                    <Route exact path="/user-listing" element={<UserListing />} />
                    <Route exact path="/user-detail/:id" element={<UserDetails />} />
                    <Route path="/user-detail/:id" element={<UserDetails />} />
                    <Route exact path="/contact-us" element={<ContactUs />} />

                    <Route exact path="/sign-in" element={<SignIn />} />
                    <Route exact path="/other" element={<Other />} />
                    <Route exact path="/" element={<MainPage />} />
                </Routes>
            </>
        </appContext.Provider>
    );
}

export default App;
export { appContext };