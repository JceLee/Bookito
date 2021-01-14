import React, {useState, useEffect} from "react";
import {Modal, Divider, Button} from "antd";
import firebase from "firebase/app";
import {useHistory} from "react-router-dom";
import {firebaseAuth} from "../../../config/fbConfig";
import {useDispatch} from "react-redux";
import {sign_in_with_facebook, sign_in_with_google} from "../../../actions/currentUser";
import {generateUserDocument} from "../../../helpers/getUserDocument";
import googleLogo from "../../../assets/images/googleLogo.png";
import facebookLogo from "../../../assets/images/facebookLogo.png";
import {designerTypes} from "../../../constants/designerTypes";

export default function SignIn() {
  const [isLoginShowing, setIsLoginShowing] = useState();
  const dispatch = useDispatch();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const faceBookProvider = new firebase.auth.FacebookAuthProvider();

  const hide = (element) => {
    if (document.getElementById(element) !== null) {
      document.getElementById(element).style.display = "none";
    }
  };


  const show = (element) => {
    if (document.getElementById(element) !== null) {
      document.getElementById(element).style.display = "flex";
    }
  };

  useEffect(() => {
    hide("signInBtn");
    return () => {
      show("signInBtn");
    }
  }, [])

  const signInWithGoogle = () => {
    firebaseAuth
      .signInWithPopup(googleProvider)
      .then(function (result) {
        const user = result.user;
        generateUserDocument(user).then(function (result) {
          dispatch(sign_in_with_google(result));
          if (result.accountType === designerTypes.newClient) {
            directProfile();
          } else {
            directToHome();
          }
        });
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      })
      .then(function () {
        handleLoginCancel();
      });
  };

  const signInWithFaceBook = () => {
    firebaseAuth
      .signInWithPopup(faceBookProvider)
      .then(function (result) {
        // The signed-in user info.
        const user = result.user;
        generateUserDocument(user).then(function (result) {
          dispatch(sign_in_with_facebook(result));
          if (result.accountType === designerTypes.newClient) {
            directProfile();
          } else {
            directToHome();
          }
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      })
      .then(function () {
        handleLoginCancel();
      });
  };

  const history = useHistory();

  const directProfile = () => {
    history.push("/client_profile");
  };

  const directToHome = () => {
    history.push("/");
  };

  const showLoginModal = () => {
    setIsLoginShowing(!isLoginShowing);
  };

  const handleLoginCancel = () => {
    setIsLoginShowing(!isLoginShowing);
  };

  // Sample accounts

  const testAccount = (name) => {
    const user = {
      email: "",
      displayName: name,
      photoURL: "",
      uid: name,
    };
    generateUserDocument(user).then(function (result) {
      dispatch(sign_in_with_facebook(result));
      if (result.accountType === designerTypes.newClient) {
        directProfile();
      } else {
        directToHome();
      }
    });
  };

  return (
    <div>
      <div className="loginContainer">
        <div className="loginContents">
          <div className="loginMessageContainer">
            <p id="loginMessageHeader">Sign In / Sign Up</p>
            <p className="loginMessage">
              We are happy to see you!
            </p>
          </div>
          <div className="loginBtnContainer">
            <button onClick={signInWithGoogle} className="loginBtn loginBtn--google">
              <img src={googleLogo} className="loginBtnLogo" alt="Google Logo"/>
              <div className="loginBtnText">Sign in with Google</div>
            </button>
            <button onClick={signInWithFaceBook} className="loginBtn loginBtn--facebook">
              <img src={facebookLogo} className="loginBtnLogo" alt="Facebook Logo"/>
              <div className="loginBtnText">Sign in with Facebook</div>
            </button>
            <p className="loginMessage">
              No sign up required. Start using our app in less than a minute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
