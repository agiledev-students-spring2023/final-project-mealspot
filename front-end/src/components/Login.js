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

const Login = () => {
    const [response, setResponse] = useState({})

    useEffect(() => {
        if (response.success && response.token) {
          console.log(`User successfully logged in: ${response.username}`)
          localStorage.setItem("token", response.token)
        }
      }, [response])

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const info = [...data.entries()]
        const url = process.env.REACT_APP_SERVER_HOSTNAME + '/auth/login'
        axios.post(url, {
            username: info[0][1],
            password:  info[1][1]
          })
          .then(function (response) {
            setResponse(response.data)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    if (!response.success) {
        return (
            <div className="login">
                <h1>Login</h1>
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
                        Log In
                    </Button><br/><br/>
                    <Button sx={border}
                        variant="outlined"
                        href="/register"
                    >
                        Register
                    </Button>
                </Box>
            </div>
        )
    }
    else return <Navigate to="/" />

}

export default Login