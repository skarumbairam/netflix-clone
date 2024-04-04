import React, { useEffect } from "react";
import logo from "../assets/netflix_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
// Store details
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const userDetail = useSelector((store) => store.user);

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened. TODO Create Error Page
        navigate("/error");
      });
  };

  return (
    <header className="">
      <div className="px-8 py-2 bg-teal-950 z-10 relative flex justify-between h-20 align-middle">
        <div className="">
          <img className="w-44" src={logo} alt="logo" />
        </div>

        {userDetail && (
          <div className="flex items-center ">
            <p className="mx-2 text-white"> 👤 {userDetail.displayName}</p>
            <p
              onClick={logOutHandler}
              className="mx-2 px-6 text-white cursor-pointer"
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
