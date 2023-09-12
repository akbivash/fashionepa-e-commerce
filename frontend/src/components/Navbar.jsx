import React, { useState} from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaTimes } from "react-icons/fa";

import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Search from "./Search";
import { handleSidebar } from "../redux/slices/componentsSlice";

const Navbar = () => {
  const components = useSelector(s => s.components)
  const quantity = useSelector((state) => state.cart.quantity);
  const watchlist = useSelector((state) => state.cart.watchlist);
  const { currentUser } = useSelector((state) => state.user);
const dispatch = useDispatch()


return (
    <>
      <div className="flex h-[60px] w-full gap-2 items-center justify-between max-w-[1400px] px-7 sm:px-2 lg:px-10">
        {/* top left  */}
        <div className="logo text-[1rem]  font-bold lg:text-[1.4rem]  tracking-[2px] text-transparent  bg-clip-text bg-gradient-to-r from-yellow-default to-green-dark">
          <Link to="/">FashioNepa</Link>
        </div>

        {/* top right  */}
        <div className="flex   grow-[2]  justify-end items-center gap-8">
          <Search/>
          {/* cart icon  */}
          <div className="  relative cursor-pointer">
            <Link to="./cart">
              <div className="badge absolute w-[20px] h-[20px] rounded-[50%] text-xs top-[-.7rem] right-[-.7rem]  flex justify-center items-center   bg-yellow-dark text-white text-center  ">
                {quantity}
              </div>
              <AiOutlineShoppingCart className="text-2xl " />
            </Link>
          </div>

          {/* menu icon  */}
          <div
            className="text-2xl md:hidden cursor-pointer"
            onClick={() => dispatch(handleSidebar()) }
          >
            {components.isSidebarOpen ? <FaTimes /> : <AiOutlineMenu className="menu" />}
          </div>
          <div className="hidden gap-4  md:flex lg:gap-8">
            {!currentUser && <Link to="/login">Login</Link>}
            <Link to="/account">Account</Link>
            <span className="relative">
              {" "}
              <Link to="/watchlist">
                Watchlist{" "}
                <span className="absolute w-5 h-5 bg-yellow-dark text-white rounded-full text-center top-[-10px] right-[-5px]">
                  {watchlist.length}
                </span>
              </Link>
            </span>
            <Link to="/" className="grid text-xl text-green-dark">
              {" "}
              <FaHome />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
