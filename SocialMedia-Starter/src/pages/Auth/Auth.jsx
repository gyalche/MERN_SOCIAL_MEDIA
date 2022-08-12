import React from 'react'
import './Auth.css';
import Logo from "../../img/logo.png"
const Auth = () => {
  return (
    <div className="Auth">
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="Webname">
                <h1>Dawa Media</h1>
                <h6>Explore the idea of content
                 throughtout the world</h6>
            </div>
        </div>

        {/*SignUp /> */}
        <Login />
    </div>
  )
}

function SignUp(){
    return (

        <div className="a-right">
            <form className="infoForm authForm">
                <h3>Sign up</h3>
                <div>
                    <input type="text" placeholder="First Name"
                    className="infoInput" name="firstName"/>
                    <input type="text" placeholder="Last Name"
                    className="infoInput" name="lastName"/>
                </div>

                <div>
                    <input type="text" placeholder="username"
                    className="infoInput" name="usernames"/>
                </div>

                <div>
                    <input type="password" placeholder="password"
                    className="infoInput" name="password" />

                     <input type="password" placeholder="conform password"
                    className="infoInput" name="conformPassword" />
                </div>
                <div>
                    <spa style={{fontSize: "12px"}}n>Already have an account. Login!</spa>
                </div>

                <button className="button infoButton" type="submit">
                    Signup
                </button>
            </form>
        </div>
    )
}

function Login() {
    return(
        <div className="a-right">
            <form className="infoForm authForm">
                <h3>Log In</h3>
                <div>
                    <input type="text" placeholder="Username"
                    className="infoInput"
                    name="username" />

                </div>

                <div>
                    <input type="password" className="infoInput"
                    placeholder="Password" name="password" />

                </div>

                 <div>
                    <spa style={{fontSize: "12px"}}> Dont have an account?. Signup!</spa>
                </div>

                <button className="button infoButton" type="submit">
                    Login
                </button>
            </form>
        
        </div>
    )
}
export default Auth