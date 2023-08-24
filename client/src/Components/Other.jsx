// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const MyComponent = () => {
//   const navigate = useNavigate();


//   const handleApiCall = async () => {
//     try {
//         const apiUrl = "http://localhost:3300/api/login";
//         const headers = {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//         };
//         axios
//           .post(apiUrl, {
//             "empCode": "1002",
//             "email": "dmurphy@classicmodelcars.com"
//         }, { headers })
//           .then((response) => {
//             console.log(response.status);
//             const res = response.data.apiRes;
//             if (res && res.status === "fail") {
//               console.log(res);
//             }
//             localStorage.setItem("__token", JSON.stringify(res.tokenKey));
            
//             navigate('/user-listing');
            
//           })
           
//     } catch (error) {
//       // Handle errors
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleApiCall}>Make API Call</button>
//     </div>
//   );
// };

// export default MyComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [empCode, setEmpCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3300/api/login', {
        empCode,
        email,
      });
      setResponseData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred.');
    }
  };

  return (
    <div>
      <h1>API Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee Code:</label>
          <input type="text" value={empCode} onChange={(e) => setEmpCode(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {responseData && (
          <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default MyComponent;
