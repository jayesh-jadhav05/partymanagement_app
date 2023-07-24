import React, { useState } from "react";
import "./styles.css";
// import { FcGoogle } from "react-icons/fa";
import Button from "../common/Button"
import InputComponent from "../common/Input"
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// SignUp function
const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  
  // Authenticate the user or basically create a new account using email and password
  const signUnHandle = () => {
    if (
      name !== " " &&
      email !== " " &&
      password !== " " &&
      cfPassword !== " "
    ) {
      setLoading(true);
      if (password !== cfPassword) {
        alert("Password does not match");
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Sign in successfully");
          setLoading(false);
          setLoginForm(true);
          setName("");
          setEmail("");
          setPassword("");
          setcfPassword("");

          // create a doc with user id as the following id
          createDoc(user);
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } else {
      alert("All fields required");
      setLoading(false);
    }
  };

  // Signin function
  const signInHandle = () => {
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          alert("Login successfully");
          setEmail("");
          setPassword("");
          setLoading(false);
          // when user sign in successfully then navigate to the dashboard page
          navigate("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } else {
      alert("All fields required");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    // Make sure that the doc with the uid doesn't exist
    // and after that Create a new doc
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName ? user.displayName : user.email,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // google login or sign up function
  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. you can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          createDoc(user);
          navigate("/dashboard");
          alert("Login successfully");
          // IdP data available using getAdditionlUserInfo(result)
          setLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="box">
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login up on{" "}
            <span style={{ color: "#C5A8DE" }}>Doesily</span>
          </h2>
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
          />
          <Button
            text={loading ? "Loading..." : "Login"}
            disabled={loading}
            onClick={signInHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Login with Google"}
            onClick={googleAuth}
            purple={false}
            // icon={<FcGoogle className="FcGoogle" />}
          ></Button>
          <p className="have-an-account">
            Don't have an account?{" "}
            <span
              onClick={() => setLoginForm(false)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-wrapper container">
          <h2 className="title">
            Sign Up on{" "}
            <span style={{ color: "#b172e8" }}>Doeasily</span>
          </h2>
          <InputComponent
            type={"text"}
            state={name}
            setState={setName}
            placeholder={"Enter your name"}
          />
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
          />
          <InputComponent
            type={"password"}
            state={cfPassword}
            setState={setcfPassword}
            placeholder={"Confirm password"}
          />
          <Button
            text={loading ? "Loading..." : "Sign up"}
            disabled={loading}
            onClick={signUnHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Sign up with Google"}
            purple={false}
            // icon={<FcGoogle className="FcGoogle" />}
            onClick={googleAuth}
          ></Button>
          <p className="have-an-account">
            Already have an account?{" "}
            <span
              onClick={() => setLoginForm(true)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupSignin;
