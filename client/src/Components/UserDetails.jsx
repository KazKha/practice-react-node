import React, { useState, useEffect, useContext } from "react";
import { SingleUserDetails } from "../helper/Constacts";
import { useParams, useNavigate } from "react-router-dom";
import { appContext } from "../App";
 import axios from "axios";
//import axios from './lib/axios.js'



const UserDetails = () => {
    const userId = useParams();
    const dataId = useContext(appContext);
    const nagivate = useNavigate();
    const [singleData, setSingleData] = useState([]);
    document.title = "User-Detail";
    const authToken = JSON.parse(sessionStorage.getItem("items"));

     console.log(JSON.parse(sessionStorage.getItem("items")));
      
  

   

    const req = {
        getDataOf: userId.id,
    };
    useEffect(() => {

       
        const getDetails = async () => {
            const headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${authToken}`,
            };
            const apiReturn = await axios.post(SingleUserDetails, req, {
                headers,
            });
            const apiResposne = await apiReturn.data.apiRes;
            if (apiResposne.status === "fail") {
                return false;
            }
            setSingleData(apiResposne.data);
            console.log(apiResposne.data);
        };

        authToken != null ?  getDetails() : nagivate('/sign-in');
    }, [userId]);
    return (
        <div>
            <ul>
                <li> EmpCode : {singleData.employeeNumber} </li>
                <li>
                    Name : {singleData.firstName} {singleData.lastName}{" "}
                </li>
                <li>Email : {singleData.email} </li>
                <li>Phone : {singleData.extension}</li>
                <li>jobTitle : {singleData.jobTitle} </li>
            </ul>

            <button onClick={() => nagivate(-1)}> Go Back List</button>
        </div>
    );
};

export default UserDetails;
