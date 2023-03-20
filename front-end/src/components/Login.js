import { TextField, Box, Button } from '@mui/material'

const handleSubmit = (event) => {
    event.preventDefault()
    const data = event
    console.log(data)
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