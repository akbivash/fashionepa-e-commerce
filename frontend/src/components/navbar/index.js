import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaTimes } from "react-icons/fa";

import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Search from "./Search";
import { handleSidebar } from "../../redux/slices/componentsSlice";
import Sidebar from "../sidebar";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const components = useSelector(s => s.components)
  const quantity = useSelector((state) => state.cart.quantity);
  const watchlist = useSelector((state) => state.cart.watchlist);
  const { currentUser } = useSelector((state) => state.user);
const dispatch = useDispatch()


return (
    <>
      <div className="fixed top-0 w-full z-50">
      <div className=" max-w-[1500px]  relative mx-auto flex h-[10vh] w-full gap-2 items-center justify-between px-4  sm:px-8 lg:px-10 bg-white ">
        {/* top left  */}
        <div className="logo text-[1rem] flex-[1]  font-bold lg:text-[1.4rem]  tracking-[2px] text-transparent  bg-clip-text bg-gradient-to-r from-yellow-default to-green-dark">
          <Link to="/">FashioNepa</Link>
        </div>

        {/* top right  */}
        <div className="flex   grow-[1.5]  justify-end items-center gap-8">
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
            className="text-2xl menu md:hidden cursor-pointer"
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
      </div>
      {components.isSidebarOpen && <Sidebar/>}
      <Dropdown />
    </>
  );
};

export default Navbar;
