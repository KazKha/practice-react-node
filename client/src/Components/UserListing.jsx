import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ListOfUser } from "../helper/Constacts";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../App";

function UserListing() {
    const dataId = useContext(appContext);
    dataId.dataId.islogin == true && navigate("/sign-in");
    const navigate = useNavigate();


    console.log(ListOfUser);
    const [userList, setUserList] = useState([]);
    const authToken = JSON.parse(sessionStorage.getItem("items"));

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${authToken}`,
    };

    useEffect(() => {
        //api with fetch
        async function fectUserData() {
            const fetchData = await fetch(ListOfUser, {
                method: "GET",
                headers: headers,
            });
            const res = await fetchData.json();

            console.log(res);
            setUserList(res);
        }
        fectUserData();
        // axios
        //   .get(
        //     `https://hub.dummyapis.com/employee?noofRecords=100&idStarts=${inputval.current}`
        //   )
        //   .then((response) => {
        //     setUserList(response.data);
        //     console.log(response.data);
        //     document.title = ` ${response.data.length}  records `;
        //   });
    }, [authToken]);

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
                onClick={() => {
                    buttonHalders(false);
                }}
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
                <table>
                    <thead>
                        <tr>
                            <th> Srno </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Dob </th>
                            <th> Age </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> {item.id}</td>
                                    <td>
                                        <Link to={`/user-detail/:${item.id}`}>
                                            {item.firstName} {item.lastName}
                                        </Link>
                                    </td>
                                    <td> {item.email} </td>
                                    <td> {item.contactNumber} </td>
                                    <td> {item.dob} </td>
                                    <td> {item.age} </td>
                                    <td>
                                        <Link
                                            to={`/user-detail/:${item.id}`}
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
                            <th> Phone </th>
                            <th> Dob </th>
                            <th> Age </th>
                            <th> Action </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default UserListing;
