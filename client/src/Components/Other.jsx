import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyComponent = () => {
  const navigate = useNavigate();


  const handleApiCall = async () => {
    try {
        const apiUrl = "http://localhost:3300/api/login";
        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        };
        axios
          .post(apiUrl, {
            "empCode": "1002",
            "email": "dmurphy@classicmodelcars.com"
        }, { headers })
          .then((response) => {
            console.log(response.status);
            const res = response.data.apiRes;
            if (res && res.status === "fail") {
              console.log(res);
            }
            localStorage.setItem("__token", JSON.stringify(res.tokenKey));
            
            navigate('/user-listing');
            
          })
           
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Make API Call</button>
    </div>
  );
};

export default MyComponent;
