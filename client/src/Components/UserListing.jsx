import React, { useState, useContext, useEffect } from "react";
import { ListOfUser } from "../helper/Constacts";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../App";
import axios from "axios";
//import axios from './lib/axios.js'

function UserListing() {
  const navigate = useNavigate();
  const dataId = useContext(appContext);
  const [userList, setUserList] = useState([]);
  const [errMrsg, setErrMrsg] = useState("");
//   const [paging, setPaging] = useState({
//     pre: 0,
//     next: 1,
//   });
  const [page, setPage] = useState(1);

  const authToken = JSON.parse(sessionStorage.getItem("items"));

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    useEffect(() => {
      dataId.dataId.islogin === false && navigate("/sign-in");
      //api with fetch
      async function fectUserData() {
        const apiReturn = await axios.get(ListOfUser + "?page=" + page, {
          headers,
        });
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

        // setPaging({ ...paging, pre: apiResposne.pageno - 1 });
        // setPaging({ ...paging, next: apiResposne.pageno });
        setUserList(apiResposne.data);
      }

      fectUserData();
    }, [page]);
  } catch (error) {
    console.log("error", error.message);
    navigate("/");
  }

  const buttonHalders = (params) => {
    if (params === false && page > 1) {
      setPage(page - 1);
    }
    if (params === true && userList.length == 10) {
      setPage(page + 1);
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
        <br />
        <br />
        {errMrsg && <small className="errMsg">{errMrsg}</small>}
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
                    <Link to={`/user-detail/${item.employeeNumber}`}>
                      {item.firstName} {item.lastName}
                    </Link>
                  </td>
                  <td> {item.email} </td>
                  <td> {item.jobTitle} </td>

                  <td>
                    <Link
                      to={`/user-detail/${item.employeeNumber}`}
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
