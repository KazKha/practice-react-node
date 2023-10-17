import React , { useContext, useState } from "react";
import "../assets/login.css";
import axios from "axios"; 
import {  LoginApi } from "../helper/Constacts";
import { validateEmail, ValidateEmpCode } from "../helper/Vaildations";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../Contexts/ContextStateManage";
// import { appContext } from "../App_withoutContextApi";



const SignIn = () => {
    const  navigate = useNavigate()
    // const  dataId   = useContext(appContext);
    const { state, dispatch } = useContext(StateContext);
    const IsSession = JSON.parse(sessionStorage.getItem('items'));
   // IsSession  ? dataId.setdataId( {...dataId.dataId , islogin : true} ) :'';

    const [loginForm, setLoginForm] = useState({
        email: "",
        empCode: "",
    });

    const [errMsg, setErrMsg] = useState({
        errMsgEmail: "",
        errMsgEmpCode: "",
        errMsgResponse: "",
    });
    const {  empCode, email } = loginForm;

    const SetHandlerFun = (events) => {
        const { name, value } = events.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    // validation  Form 
    const formErr = {};
    const  validateForm = async (events) =>{
        events.preventDefault();
       
        if(  !validateEmail(email) ) formErr.errMsgEmail = 'Invalid Email-Id';
        if(  !ValidateEmpCode(Number(empCode)) ) formErr.errMsgEmpCode    =   'Invalid  EmpCode . Enter 4 digit EmpCode ';
       
        if (Object.keys(formErr).length > 0 ) {
            setErrMsg( formErr );
            return false
        }
       loginApiHit();
    }


    const loginApiHit = async () => {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          
        };
        const apiReturn   =  await axios.post(LoginApi, loginForm, { headers });
        const apiResposne =  await apiReturn.data.apiRes;
        if( apiResposne.status === 'fail' ){
            formErr.errMsgResponse = apiResposne.message; 
            setErrMsg( formErr );
            return false
        }

        dispatch({ type: 'LOGIN', payload: {token:  apiResposne.tokenKey, loginId:  apiResposne.data.employeeNumber } });

        //dataId.setdataId( {...dataId.dataId , '__tokenKey' : apiResposne.tokenKey , 'islogin' : true  } )
        
        // dataId.setdataId( {...dataId.dataId , 'islogin' : true } );
        sessionStorage.setItem("expirationTime", new Date(Date.now() + 1200000)); // 20 min


        sessionStorage.setItem("items", JSON.stringify(apiResposne.tokenKey));
        navigate('/user-listing');
        console.log(apiResposne)
    }


    return (
        <div>
            <h1 className="text-center">Sign In</h1>
            <br />
            {errMsg.errMsgResponse && <small className="errMsg">{errMsg.errMsgResponse}</small >}
            <form action = "#" method ="post">
                <div className="container">
                    <label>Employee Code:</label>
                    <input
                        type="text"
                        name="empCode"
                        value={empCode}
                        onChange={SetHandlerFun}
                    />
                    <small style={{ color: "red" }}>{errMsg.errMsgEmpCode}</small>
                </div>
                <div className="container">
                    <label>Email-ID:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={SetHandlerFun}
                    />
                    <small style={{ color: "red" }}>{errMsg.errMsgEmail}</small>
                </div>
                 <button onClick={(e)=>validateForm(e)}>Submit</button> 

            </form>
        </div>
    );
};

export default SignIn;
