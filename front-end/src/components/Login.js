const Login = () => {
    return (
        <div className="login">
            <div>
                <img src="../public/logo512.png"></img>
                Login
            </div>
            <form>
            <input type="text" id="email" placeholder="enter email..."></input><br></br>
                <input type="text" id="login" placeholder="enter username..."></input><br></br>
            </form>
            <button type="button">Login</button><br></br>
            <button type="button">Register</button>
        </div>
    )
}

export default Login