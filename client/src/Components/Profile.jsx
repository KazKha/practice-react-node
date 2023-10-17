import React ,{ useContext ,  useState, useMemo, useEffect } from 'react';
import { StateContext } from '../Contexts/ContextStateManage';
import axios from 'axios';
import { SingleUserDetails } from '../helper/Constacts';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';




const Profile = () => {
    const navigate=  useNavigate();
    const { state }  = useContext(StateContext);    
    const [ userData, setUserData] = useState('');

    document.title = "Profile";
    const authToken  = (  state.__tokenKey !== ''  && state.islogin === true ) ? state.__tokenKey : null; 
     
    useEffect(() => {
        const getPersonlData = async () =>{
            const headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${authToken}`,
            };
            
            const req = {
                getDataOf: state.loginId
            };
            const apiReturn  =  await axios.post(SingleUserDetails, req, { headers } );
            const apiResp    =  await apiReturn.data.apiRes;
            if (apiResp.status === "fail") {
                return false;
            }
           
            setUserData(apiResp.data);
          
           
        }
        authToken === null ? navigate('/sign-in') : getPersonlData();       
    },[]);     

    return (
        <div>
             User profile
        </div>
    );
}

export default Profile;
