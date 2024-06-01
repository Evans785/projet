import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createRef } from "react";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function singIn(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(Error);
      });
  }
  async function signInWithGoogle(e) {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((res) => {})
      .catch((err) => {
        Error;
      });
  }

  async function logOut(e) {
    e.preventDefault();
    await signOut(auth)
      .then(() => {
        // setUserGoogle("");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      {" "}
      <form>
        {" "}
        <input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <input
          placeholder="Password..."
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={singIn}>SignIn </button>{" "}
        <button onClick={signInWithGoogle}>SignIngoogle </button>     {" "}
        <button onClick={logOut}> Logout </button>
      </form>
    </>
  );
};

export default Auth;
