import React from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";
import Button from '@mui/material/Button';



const cookies = new Cookies();

function Auth(props) {
  const { setIsAuth } = props;
  const signinwithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <div>
        <h1 className="head">THE chat APP</h1>
      </div>
      <div>
      <Button
  disabled={false}
  size="small"
  variant="elevated"
  onClick={signinwithgoogle}
>
      Sign in with google</Button>
      </div>
    </div>
  );
}

export default Auth;
