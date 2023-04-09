import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import './Account.css';


const Account = (props) => {
    const [data, setData] = useState([])
    const userID = useParams()
  
    useEffect(() => {
        //console.log("Here")
      // axios("https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0")
      axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`)
        .then(response => {
          // extract the data from the server response
          console.log(response.data[0])
          setData(response.data[0])
        })
        .catch(err => {
          console.error(err) 

        })
    }, [userID])

    return (
      <div className="UserAccount">
        <div className='profilepic'>
            <p>Profile Picture</p>
        </div>
        
        {<div className='account'>
            <div>
                <p>Name: {data.first_name} {data.last_name}</p>
                <p>Email: {data.email}</p>
                <p>Weekly Budget: {data.weekly_budget}</p>
            </div>
            
            {/* {data.map(d => <div>Name: {d.first_name} {d.last_name}</div>)}
            {data.map(d => <div>Email: {d.email}</div>)}
            {data.map(d => <div>Weekly Budget: {d.weekly_budget}</div>)} */}
        </div>}
        <button>
            Logout
        </button>
      </div> 
    )
  }

export default Account