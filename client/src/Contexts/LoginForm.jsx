import React ,{ useState } from 'react';
import { LoginApi } from '../helper/Constacts';
import { Auth } from './AuthContext';
import { validateEmail , ValidateEmpCode } from '../helper/Vaildations';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {
    const  userLogin  = Auth();
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState( {
        empCode :'',
        email :''
    });

    const [errMsg, setErrMsg] = useState({
        errEpCode :'',
        errEmail :'',
        errResposne :'',
    });

    const {  empCode, email } = loginForm;
    // adding Forms data 
    const SetHandlerFun = (events) => {
        const { name, value } = events.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

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


    // Calling Login Api// 
    
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
    
}

export default LoginForm;
