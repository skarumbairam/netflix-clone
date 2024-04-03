import React, { useRef, useState } from "react";
import Header from "./Header";
import bgImage from "../assets/home_background.jpg";
import { validateData } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSingInFrom, setIsSingInFrom] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInFrom = () => {
    setIsSingInFrom(!isSingInFrom);
  };

  const handleSignInButtonClick = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errorMessage = validateData(email, password);
    setErrorMessage(errorMessage);
    if (errorMessage) return; // Return if it throws error

    if (isSingInFrom) {
      // Sign in Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " - ", errorMessage);
        });
    } else {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Route to Browse Page
          console.log(user);

          updateProfile(user, {
            displayName: nameRef.current.value,
          })
            .then(() => {
              // Profile updated!
              const { email, displayName, uid } = auth.currentUser;
              dispatch(addUser({ email, uid, displayName }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " - ", errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute top-0">
        <img
          className="h-screen w-screen object-cover"
          src={bgImage}
          alt="bgimage"
        />
      </div>
      <div className="flex items-center justify-center h-screen">
        <form
          className="bg-black relative px-10 py-8 w-80  opacity-90"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-yellow-50 text-2xl">
            {isSingInFrom ? "Sing In" : "Sing Up"}
          </h3>

          {!isSingInFrom && (
            <input
              type="text"
              className="my-6 p-2 w-full rounded block border-black bg-gray-500"
              placeholder="Full Name"
              ref={nameRef}
            />
          )}

          <input
            type="text"
            className="my-6 p-2 w-full rounded block border-black bg-gray-500 text-white"
            placeholder="Email Address"
            ref={emailRef}
          />
          <input
            type="password"
            className="my-6 p-2 w-full rounded block border-black bg-gray-500 text-white"
            placeholder="Enter Password"
            ref={passwordRef}
          />

          {errorMessage !== null && (
            <p className=" p-4, m-6 text-md text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="my-6 p-2 w-full rounded text-white	bg-red-700 block"
            onClick={() => handleSignInButtonClick()}
          >
            {isSingInFrom ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-xs	text-white cursor-pointer"
            onClick={() => toggleSignInFrom()}
          >
            {isSingInFrom
              ? " New to Netflix? Sign up now."
              : " Alraedy registered? Sign in now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
