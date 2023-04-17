import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import './Account.css';


const Account = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [newBudget, setNewBudget] = useState(0.0)
    const [currentBudget, setCurrentBudget] = useState(0.0)
    const userID = useParams()
  
    useEffect(() => {
      axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`)
        .then(response => {
          // extract the data from the server response
          setFirstName(response.data[0].first_name)
          setLastName(response.data[0].last_name)
          setEmail(response.data[0].email)
          setCurrentBudget(response.data[0].weekly_budget)
        })
        .catch(err => {
          console.error(err) 

        })
    }, [userID])

    const submitForm = async(e) => {
      e.preventDefault() // prevent normal browser submit behavior
  
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`, { budget: newBudget })
        // update current budget
        setCurrentBudget(res.data.budget)
        // clear form
        setNewBudget(0.0)
      } catch(err) {
        console.log(err)
      }
    }  

    return (
      <div className="UserAccount">
        <div className='profilepic'>
            <p>Profile Picture</p>
        </div>
        
        {<div className='account'>
            <div>
                <p>Name: {firstName} {lastName}</p>
                <p>Email: {email}</p>
                <p>Weekly budget: {currentBudget}</p>
            </div>
            <form className="budgetForm" onSubmit={submitForm}>
              <input
                type="number"
                step="0.01"
                placeholder="Edit budget..."
                value={newBudget}
                onChange={e => setNewBudget(e.target.value)}
              />
              <input type="submit" disabled={!newBudget} value="Save" />
            </form>
        </div>}
        <button>
            Logout
        </button>
      </div> 
    )
  }

export default Account