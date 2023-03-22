import { TextField, Box, Button } from '@mui/material'

const handleSubmit = (event) => {
    event.preventDefault()
    const data = event
    console.log(data)
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