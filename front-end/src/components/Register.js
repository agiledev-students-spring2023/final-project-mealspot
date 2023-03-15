const Register = () => {
    return (
        <div className="register">
            <div>
                <img src="../public/logo512.png"></img>
                Register
            </div>
            <form>
                <input type="text" id="email" placeholder="enter email..."></input><br></br>
                <input type="text" id="login" placeholder="enter username..."></input><br></br>
                <input type="text" id="pw" placeholder="enter password..."></input>
            </form>
            <button type="button">Register</button>
        </div>
    )
}

export default Register