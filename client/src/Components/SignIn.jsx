import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../assets/login.css";

import axios from "axios";
import { validateEmail, ValidateEmpCode } from "../helper/Vaildations";



const SignIn = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    empCode: "",
    email: "",
  });

  const [errMsg, setErrMsg] = useState({
    empCode: "",
    email: "",
    errorMsg: "",
  });




  const loginIn = async  (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!postData.empCode) newErrors.empCode = `EmpCode is required`;
    if (!ValidateEmpCode(Number(postData.empCode)))
      newErrors.empCode = ` Invalid EmpCode  `;

    if (!validateEmail(postData.email)) newErrors.email = `Email is required`;

    setErrMsg(newErrors);

    if (Object.keys(newErrors).length === 0) {
        const apiUrl = "http://localhost:3300/api/login";
        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        };
      

        

      const apiReturn   =  await axios.post(apiUrl, postData, { headers });
      const apiResposne =  await apiReturn.data.apiRes;
     
       if (apiResposne && apiResposne.status === "fail") {
              newErrors.errorMsg = apiResposne.message
              setErrMsg(newErrors);
              
              console.log(apiResposne);
              console.log(apiResposne.message);
  
            
            }

      // apiResposne.then((response) => {
      //     console.log(response.status);
      //     const res = response.data.apiRes;
      //     if (res && res.status === "fail") {
      //       newErrors.errorMsg = res.message
      //       setErrMsg(newErrors);
            
      //       console.log(res );
      //       console.log(res.message);

          
      //     }
      //     console.log(res)
      //     localStorage.setItem("__token", JSON.stringify(res.tokenKey));
      //     navigate('/user-listing');

      //   })
      //   .catch((error) => {
      //     console.error("Error posting data:", error.message);
      //   });

    }
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
      {errMsg.errorMsg && <small className="errMsg">{errMsg.errorMsg}</small >}

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
        {errMsg.empCode && <small className="error">{errMsg.empCode}</small>}
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
        {errMsg.email && <small className="error">{errMsg.email}</small>}
      </div>
      <button onClick={loginIn} id="SignIn">
        Login
      </button>
    </div>
  );
};

export default SignIn;
