import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../assets/data";
import { closeSidebar } from "../redux/slices/componentsSlice";

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.getAttribute('class') !== 'menu') {
        dispatch(closeSidebar())
      }
    })
  }, [])

  return (
    <>
      <ul className="grid bg-white z-50 gap-4 transition-all duration-500 py-3 md:hidden ">
        {sidebarLinks.map((l) => {
          return (
            <Link
              key={l.name}
              to={l.link}
              className="w-full bg-white  text-center  border-b-[1px] border-[#c4c3bf]"
              onClick={() => dispatch(closeSidebar())}
            >
              {l.name}
            </Link>
          );

        })}
        {currentUser ? <Link to='/logout' className="w-full bg-white  text-center  border-b-[1px] border-[#c4c3bf]" onClick={() => dispatch(closeSidebar())}>Log out</Link> :
          <Link to='/login' className="w-full bg-white  text-center  border-b-[1px] border-[#c4c3bf]" onClick={() => dispatch(closeSidebar())}>Login</Link>}

      </ul>
    </>
  );
};

export default Sidebar;
