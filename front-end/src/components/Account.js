import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import './Account.css';


const Account = (props) => {
    const [data, setData] = useState([])
    const userID = useParams()
  
    useEffect(() => {
        console.log("Here")
      axios("https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0")
        .then(response => {
          // extract the data from the server response
          console.log(response)
          setData(response.data)
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
        <div className='account'>
            {data && data.map((d) => (
                <div>
                    <p>Name: {d.first_name} {d.last_name}</p>
                    <p>Email: {d.email}</p>
                    <p>Weekly Budget: {d.weekly_budget}</p>
                </div>
                     
            ))}
            {/* {data.map(d => <div>Name: {d.first_name} {d.last_name}</div>)}
            {data.map(d => <div>Email: {d.email}</div>)}
            {data.map(d => <div>Weekly Budget: {d.weekly_budget}</div>)} */}
        </div>
        <button>
            Logout
        </button>
      </div>
    )
  }

export default Account;