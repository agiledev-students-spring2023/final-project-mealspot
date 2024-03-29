import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom"
import axios from 'axios';
import { Button, InputLabel, FormControl, Box, Typography, Modal, InputAdornment, OutlinedInput} from '@mui/material';
import './Account.css';
import { Navigate } from "react-router-dom"

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const border = {
  border: 1.4,
  marginLeft: '30%',
  marginRight: '30%',
  marginBottom: '2vh'
}

const Account = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [newBudget, setNewBudget] = useState(0.0)
    const [currentBudget, setCurrentBudget] = useState(0.0)
    const userID = useParams()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
      const jwtToken = localStorage.getItem("token")
      const authToken = 'jwt ' + jwtToken + ''

      axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`, {headers: {Authorization: authToken}})
        .then(response => {
          // extract the data from the server response
          setUsername(response.data.username)
          setEmail(response.data.email)
          setCurrentBudget(response.data.weeklyBudget)
        })
        .catch(err => {
          console.error(err) 

        })
    }, [userID])

    const submitForm = async(e) => {
      e.preventDefault() // prevent normal browser submit behavior
  
      try {
        const jwtToken = localStorage.getItem("token")
        const authToken = 'jwt ' + jwtToken + ''
        const res = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`, { budget: newBudget }, {headers: {Authorization: authToken}})
        // update current budget
        setCurrentBudget(res.data.weeklyBudget)
        // clear form
        setNewBudget(0.0)
      } catch(err) {
        console.log(err)
      }
      handleClose()
    }  
    
    const logoutOnClick = (event) => {
      event.preventDefault()
      console.log('removing')
      localStorage.removeItem("token")
    }

    // redirect if not logged in
    const jwtToken = localStorage.getItem("token")
    if (!jwtToken) {
        console.log("user not logged in")
        return <Navigate to="/login" />
    }

    return (
      <div className="UserAccount">
        <h1 className='titleText'>My Account</h1>
        {<div className='account grayBackground'>
            <div>
                <p className="profileAttribute">Name: {username}</p>
                <p className="profileAttribute">Email: {email}</p>
                {currentBudget === 0 ? <p className="profileAttribute">Weekly budget: $0</p> : <p className="profileAttribute">Weekly budget: ${currentBudget}</p>}
                <Button sx={border} variant="outlined" onClick={handleOpen}>Edit Budget</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={boxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">Enter New Budget</Typography>
                <br/>
                <form onSubmit={submitForm}>
                <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                  onChange={e => setNewBudget(e.target.value)} //user changing the budget in account to be reflected in their meal plan
                />
                <br/>
                <Button sx={border} variant="outlined" type="submit">Submit</Button>
                </FormControl>
                </form>
                </Box> 
                </Modal>
            </div>
        </div>}
        <br/><br/>
        <Button sx={border} type="submit" variant="outlined" onClick={logoutOnClick}><Link to="/login">Logout</Link></Button>
        </div> 
    )
  }

export default Account