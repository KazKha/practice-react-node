import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";


function UserListing() {

  const [userList, setUserList] = useState([]);
  const [dataId   , setdataId ] = useState({
    listform :'1'
  });
  
  useEffect(() => {
    //api with fetch
    async function fectUserData() {
      const fetchData = await fetch(
         `https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1`
      );
      const res = await fetchData.json();
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


  }, [dataId.data.listform]);






  const buttonHalders = (params) => {
    if (params === true) {
      let incre = dataId.listform+100
      setdataId({...dataId, listform: incre });
      
    } else if (params === false && dataId.data.listform > 0) {
      let decre = dataId.data.listform - 100

      setdataId({...dataId, listform : decre});
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
                    <Link to={`/user-detail/:${item.id}`} className="button">
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
