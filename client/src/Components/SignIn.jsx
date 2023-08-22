import React, { useState } from "react";
import "../assets/login.css";
import axios from "axios";

const SignIn = () => {
  const [postData, setPostData] = useState({
    empCode: "",
    email: "",
  });

  

  const loginIn =   () => {
    const apiUrl = 'http://localhost:3001/api/login';

    const headers = {
        "Content-Type": "application/json", 
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*" 
    };

    // useEffect(() => {

        axios.post(apiUrl , JSON.stringify(postData) ,  {headers} )
        .then((req) => {
            console.log(req.data);
        })
        .catch((error) => {
            console.error("Error posting data:", error.message);
        });

    // }, [] );



    
  };

  const storeInputValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const pageStyle = {
    sign_in_blog: {
      padding: "15px",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    },
  };

  return (
    <div className="signIn_blog" style={pageStyle.sign_in_blog}>
      <p> Please Sign-In </p>
      <br />

      <div className="container">
        <label htmlFor="empCode">
          <b>Emp Code</b>
        </label>
        <input
          type="text"
          name="empCode"
          id="empCode"
          value={postData.empCode}
          placeholder="Emp Code"
          onChange={storeInputValue}
        />
      </div>

      <div className="container">
        <label htmlFor="email">
          <b> Email </b>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={postData.email}
          placeholder="Email"
          onChange={storeInputValue}
        />
      </div>
      <button onClick={loginIn} id="SignIn">
        Login
      </button>
    </div>
  );
};

export default SignIn;
