import { TextField, Box, Button } from '@mui/material'
import axios from 'axios'

const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const info = [...data.entries()]
    axios.post('http://localhost:3000/login', {
        username: info[0][1],
        password:  info[1][1]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const Login = () => {
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
                <Button
                    variant="contained"
                    type="submit"
                >
                    Log In
                </Button><br/><br/>
                <Button
                    variant="contained"
                    href="/register"
                >
                    Register
                </Button>
            </Box>
        </div>
    )
}

export default Login