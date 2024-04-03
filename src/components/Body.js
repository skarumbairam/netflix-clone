import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Browse from "./Browse";
import Page404 from "./Page404";
import { useSelector } from "react-redux";

const Body = () => {
  const userDetail = useSelector((store) => store.user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {userDetail && <Route path="/browse" element={<Browse />} />}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
