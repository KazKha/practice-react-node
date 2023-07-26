import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams , useNavigate } from 'react-router-dom';


const UserDetails = () => {

    const userId     = useParams();
    const nagivate   = useNavigate();
    const [singleData, setSingleData] = useState([])
    document.title = 'User-Detail';
    useEffect(() => {
        axios
          .get(
            `https://hub.dummyapis.com/employee?noofRecords=1&idStarts=${userId.id}`
          )
          .then((response) => {
            setSingleData( response.data );
           
          });
          document.title = 'User-Detail';

      }, [userId.id]);
    return (
        <div>
            
            {
                singleData.map((items, index) => {
                    return(<ul key ={index}>
                        <li>Name  :  {items.firstName} {items.lastName} </li> 
                        <li>Email :  {items.email}  </li>
                        <li>Phone : {items.contactNumber}</li>  
                        <li>Dob :   {items.dob} </li>
                        <li> Age :  {items.age}  </li>
                        </ul>
                        
                    )
                })
            }
            <button onClick={() => nagivate(-1)} > Go Back List</button>
        </div>
    );
}

export default UserDetails;
