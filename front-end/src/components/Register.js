import { TextField, Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

const border = {
    border: 1.4,
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: '2vh'
  }

const Register = () => {
    const [response, setResponse] = useState({})

    useEffect(() => {
        if (response.success && response.token) {
          console.log(`User successfully logged in: ${response.username}`)
          localStorage.setItem("token", response.token) // store the token into localStorage
        }
      }, [response])

    const handleSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.target)
        const info = [...data.entries()]
        const url = process.env.REACT_APP_SERVER_HOSTNAME + '/auth/register'
        axios.post(url, {
            username: info[0][1],
            email: info[1][1],
            password:  info[2][1],
            weeklyBudget: 0
            })
            .then(function (response) {
            console.log(response);
            setResponse(response.data)
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    if (!response.success) {
        return (
            <div className="register">
                <h1>Register</h1>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        required
                        margin="normal"
                        id="username"
                        label="Username"
                        name="username"
                    ></TextField><br/>
                    <TextField
                        required
                        margin="normal"
                        id="email"
                        label="Email"
                        name="email"
                    ></TextField><br/>
                    <TextField
                        required
                        margin="normal"
                        id="password"
                        label="Password"
                        name="password"
                    ></TextField><br/>
                    <br/>
                    <br/>
                    <Button sx={border}
                        variant="outlined"
                        type="submit"
                    >
                        Register
                    </Button>
                    <br/>
                    <br/>
                    <Button sx={border}
                        variant="outlined"
                        href="/login"
                    >
                        Login
                    </Button>
                </Box>
            </div>
        )
    }
    else {
        return <Navigate to="/" />
    }
}

export default Register