import { TextField, Box, Button } from '@mui/material'
import axios from 'axios'

const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const info = [...data.entries()]
    const url = process.env.REACT_APP_SERVER_HOSTNAME + '/register'
    axios.post(url, {
        username: info[0][1],
        email: info[1][1],
        password:  info[2][1]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const Register = () => {
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
                <Button
                    variant="contained"
                    type="submit"
                >
                    Register
                </Button>
            </Box>
        </div>
    )
}

export default Register