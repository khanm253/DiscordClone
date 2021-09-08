import React from 'react'
import './Login.css'
import Button from '@material-ui/core/Button';
import {auth, provider} from './firebase'

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message))
    };

    return (
        <div className="login">

            <div className="login__logo">
                <img src="https://logos-world.net/wp-content/uploads/2020/11/Discord-Logo-2021-Present-700x394.png"/>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
