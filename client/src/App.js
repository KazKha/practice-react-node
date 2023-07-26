import React, { useState,  createContext} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Headers from "./Components/Headers";
import UserListing from "./Components/UserListing";
import AboutUs from "./Components/AboutUs";
import MainPage from "./Components/MainPage";
import ContactUs from "./Components/ContactUs";
import UserDetails from "./Components/UserDetails";


const appContext = createContext();
function App() {
  const [dataId, setdataId] = useState({'listform': 1} );


  return (
    <appContext.Provider value={ { data : dataId, updateData : setdataId}}>
      <Headers />

      <Routes>
        <Route exact path="/about-us" element={<AboutUs />} />
        
          <Route exact path="/user-listing" element={<UserListing />} />
        
        <Route exact path="/user-detail/:id" element={<UserDetails />} />
        
        <Route exact path="/Contact-us" element={<ContactUs />} />
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
export {appContext};

