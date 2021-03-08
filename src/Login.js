import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {

    document.title = "Snapchat Clone | Login";

    const dispatch = useDispatch();

    const signin = () =>{
        auth.signInWithPopup(provider)
        .then((result) =>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }));
        })
        .catch((error) =>{
            alert(error.message);
        });
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="logo.png" alt="" />
                <Button onClick={signin} className="signin" variant="outlined" >SignIn</Button>
            </div>
        </div>
    )
}

export default Login;
