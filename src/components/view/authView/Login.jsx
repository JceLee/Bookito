import React, {useEffect, useState} from 'react';
import { Link } from "@reach/router";
import { Modal, Button } from 'antd';
import { firebaseDB, auth } from '../../../config/fbConfig';
import {useDispatch, useSelector} from "react-redux";
import {sign_in_with_google} from "../../../actions/googleSignIn";

export default function Login() {
    const [isLoginShowing, setIsLoginShowing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler =
        (event, email, password) => {
            event.preventDefault();
        };

    const signedInUser = useSelector((state) => state.signedInUser.signedInUser);
    const dispatch = useDispatch();

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    const provider = new firebaseDB.auth.GoogleAuthProvider();

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then(function(result) {
            // The signed-in user info.
            const user = result.user;
            dispatch(sign_in_with_google(user));
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

        });
        handleLoginCancel();
    };

    const showLoginModal = () => {
        setIsLoginShowing(!isLoginShowing);
    };

    const handleLoginOk = () => {
        setIsLoginShowing(!isLoginShowing);
    };

    const handleLoginCancel = () => {
        setIsLoginShowing(!isLoginShowing);
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };

    return (
        <div>
            <Button className='login' onClick={showLoginModal} shape='round'>
                Login
            </Button>
            <Modal
                title='Login'
                visible={isLoginShowing}
                onOk={handleLoginOk}
                okText='Continue'
                onCancel={handleLoginCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div className="mt-8">
                    <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
                    <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                        <form className="">
                            <label htmlFor="userEmail" className="block">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="my-1 p-1 w-full"
                                name="userEmail"
                                value = {email}
                                placeholder="E.g: faruq123@gmail.com"
                                id="userEmail"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                            <br/>
                            <label htmlFor="userPassword" className="block">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="mt-1 mb-3 p-1 w-full"
                                name="userPassword"
                                value = {password}
                                placeholder="Your Password"
                                id="userPassword"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                            <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                                Sign in
                            </button>
                        </form>
                        <br/>
                        <p className="text-center my-3">or</p>
                        <br/>
                        <button onClick={handleGoogleSignIn}
                            className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
                            Sign in with Google
                        </button>
                        <br/>
                        <p className="text-center my-3">
                            Don't have an account?{" "}
                            <br/>
                            <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                                Sign up here
                            </Link>{" "}
                            <br />{" "}
                            <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}