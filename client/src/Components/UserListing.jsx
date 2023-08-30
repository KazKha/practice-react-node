import React, { useState, useContext, useEffect  } from "react";
import axios from "axios";
import { ListOfUser, LoginApi } from "../helper/Constacts";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../App";

function UserListing() {
    const navigate  = useNavigate();
    const dataId    = useContext(appContext);
    const [userList, setUserList] = useState([]);
    const [errMrsg, setErrMrsg] = useState("");
    const [paging,  setPaging]  = useState({
        'pre' : 0,
        'next' : 0
    });
    dataId.dataId.islogin === false && navigate("/sign-in");
    const authToken = JSON.parse(sessionStorage.getItem("items"));

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${authToken}`,
    };

    useEffect(() => {
        //api with fetch
        async function fectUserData() {
            var pre , nex ;
            const apiReturn = await axios.get(ListOfUser, { headers });
            const apiResposne = await apiReturn.data.apiRes;
             
             console.log(apiResposne);  
             if (apiResposne.status === "fail") {
                 Number(apiResposne.code) === 401
                 ? dataId.setdataId({
                     ...dataId.dataId,
                     errMsg: apiResposne.message,
                    })
                    : setErrMrsg(apiResposne.message);
                }
                pre =  apiResposne.pageno - 1;
                nex =  apiResposne.pageno ;
                setPaging({...paging , pre : pre})
                setPaging({...paging,next :   nex} )
                setUserList(apiResposne.data);
            }

            fectUserData();
        
    }, [ ]);

    const buttonHalders = (params) => {
        if (params === true) {
            let incre = dataId.dataId.listform + 100;
            dataId.dataId.updateData({
                ...dataId.dataId.data,
                listform: incre,
            });
        } else if (params === false && dataId.dataId.listform > 0) {
            let decre = dataId.dataId.listform - 100;

            dataId.dataId.updateData({
                ...dataId.dataId.data,
                listform: decre,
            });
        }
    };

    return (
        <div className="App">
            <button
                onClick={() =>  {paging.pre > 0 &&  setPaging({...paging , pre : paging.pre++})}}
            >
                Prev page
            </button>

            <button
                onClick={() => {
                    buttonHalders(true);
                }}
            >
                Next page
            </button>

            <br />
            <br />

            <div>
                <h2> User Records </h2>
                <br/>
                <br/>
                {errMrsg && <small className="errMsg">{errMrsg}</small >}
                <table>
                    <thead>
                        <tr>
                            <th> Srno </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Title </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {item.employeeNumber}</td>
                                    <td>
                                        <Link to={`/user-detail/:${item.employeeNumber}`}>
                                            {item.firstName} {item.lastName}
                                        </Link>
                                    </td>
                                    <td> {item.email} </td>
                                    <td> {item.jobTitle} </td>
                                   
                                    <td>
                                        <Link
                                            to={`/user-detail/:${item.employeeNumber}`}
                                            className="button"
                                        >
                                            <span>View Record </span>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th> Srno </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Title </th>
                            <th> Action </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default UserListing;
