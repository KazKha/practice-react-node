import React, { useContext, useState, useMemo, useEffect } from "react";
import { StateContext } from "../Contexts/ContextStateManage";
import axios from "axios";
import { SingleUserDetails } from "../helper/Constacts";
import { useNavigate } from "react-router-dom";
import { ValidateEmpCode, validateNumber, OnlyChar } from "../helper/Vaildations";

const Profile = () => {
    const navigate = useNavigate();
    const { state } = useContext(StateContext);
    const [userData, setUserData] = useState("");

    

    document.title = "Profile";
    const authToken =
        state.__tokenKey !== "" && state.islogin === true
            ? state.__tokenKey
            : null;

    useEffect(() => {
        const getPersonlData = async () => {
            const headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${authToken}`,
            };

            const req = {
                getDataOf: state.loginId,
            };
            const apiReturn = await axios.post(SingleUserDetails, req, {
                headers,
            });
            const apiResp = await apiReturn.data.apiRes;
            if (apiResp.status === "fail") {
                return false;
            }
            setUserData(apiResp.data);
        };
        authToken === null ? navigate("/sign-in") : getPersonlData();
    }, []);

    const memoizedData = useMemo(() => userData, [userData]);

    const [formData, setFormData] = useState({
        firstName: "",
        jobTitle: "",
        lastName: "",
        extension: "",
        mobile: "",
    });
    const [formErrMSg, setformErr] = useState({
        jobTitleErr: "",
        firstNameErr: "",
        lastNameErr: "",
        extensionErr: "",
        mobileErr: "",
    });

    const formErr ={};

    /// Inute Handler//
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    
    
    /// Input Submits ///
    const handleSubmit = (e) => {
        e.preventDefault();
        if(  !OnlyChar(formData.jobTitle) ) formErr.jobTitleErr = 'Invalid Job Title';
        if(  !validateNumber(formData.mobile) ) formErr.mobileErr = 'Invalid Mobile Number';
        if(  !ValidateEmpCode(Number(formData.extension)) ) formErr.extensionErr    =   'Invalid  Extension . Enter 4 digit EmpCode ';
        
        console.log(formErr.jobTitleErr);
        if (Object.keys(formErr).length > 0 ) {
            setformErr( formErr );
            return false
        }    
        updateData(); 
    };


    const updateData = () => {
        setformErr( formErr );

    }




    return (
        <>
            <div>
                <ul>
                    <li> EmpCode : {memoizedData.employeeNumber} </li>
                    <li>
                        Name : {memoizedData.firstName} {memoizedData.lastName}
                    </li>
                    <li>Email : {memoizedData.email} </li>
                    <li>Mobile : {memoizedData.mobile}</li>
                    <li>Extension : {memoizedData.extension}</li>
                    <li>jobTitle : {memoizedData.jobTitle} </li>
                </ul>

                <button onClick={() => navigate(-1)}> Go Back List</button>
            </div>
            <br />
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">  first Name :</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={memoizedData.firstName}
                        onChange={handleInputChange} readOnly
                    />
                     <small style={{ color: "red" }}>{formErrMSg.firstName}</small>
                </div>
                <div>
                    <label htmlFor="lastName"> last Name :</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={memoizedData.lastName}
                        onChange={handleInputChange} readOnly
                    />
                     <small style={{ color: "red" }}>{formErrMSg.lastName}</small>
                </div>
                <div>
                    <label htmlFor="jobTitle"> Job Title :</label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                    />
                     <small style={{ color: "red" }}>{formErrMSg.jobTitleErr}</small>
                </div>
                <div>
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                     <small style={{ color: "red" }}>{formErrMSg.mobileErr}</small>
                </div>
                <div>
                    <label htmlFor="extension">extension:</label>
                    <input
                        type="text"
                        id="extension"
                        name="extension"
                        value={formData.extension}
                        onChange={handleInputChange}
                    />
                     <small style={{ color: "red" }}>{formErrMSg.extensionErr}</small>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Profile;
