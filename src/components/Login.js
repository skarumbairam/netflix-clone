import React, { useState } from "react";
import Header from "./Header";
import bgImage from "../assets/home_background.jpg";

const Login = () => {
  const [isSingInFrom, setIsSingInFrom] = useState(true);

  const toggleSignInFrom = () => {
    setIsSingInFrom(!isSingInFrom);
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
        <form className="bg-black relative px-10 py-8 w-80  opacity-90">
          <h3 className="text-yellow-50 text-2xl">
            {isSingInFrom ? "Sing In" : "Sing Up"}
          </h3>

          {!isSingInFrom && (
            <input
              type="text"
              className="my-6 p-2 w-full rounded block border-black bg-gray-500"
              placeholder="Full Name"
            />
          )}

          <input
            type="text"
            className="my-6 p-2 w-full rounded block border-black bg-gray-500"
            placeholder="Email Address"
          />
          <input
            type="text"
            className="my-6 p-2 w-full rounded block border-black bg-gray-500"
            placeholder="Enter Password"
          />

          {!isSingInFrom && (
            <button
              type="submit"
              className="my-6 p-2 w-full rounded text-white	bg-red-700 block"
            >
              Sign up
            </button>
          )}

          {isSingInFrom && (
            <button
              type="submit"
              className="my-6 p-2 w-full rounded text-white	bg-red-700 block"
            >
              Sign In
            </button>
          )}
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
