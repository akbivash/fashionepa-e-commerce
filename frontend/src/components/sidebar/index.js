import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../../assets/data";
import { closeSidebar } from "../../redux/slices/componentsSlice";

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user)
  const components = useSelector(state => state.components)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('click', detectMenuClick)
    return () => {
      document.removeEventListener('click', detectMenuClick)
    }
  }, [])

  function detectMenuClick(e) {
    if (e.target.getAttribute('class') !== 'menu') {
      dispatch(closeSidebar())
    }

    if (e.target.parentNode) {
      if (e.target.parentNode.getAttribute('class') !== 'menu') {
        dispatch(closeSidebar())

      }
    }
  }

  return (
    <>
      <div className={`${components.isSidebarOpen ? "right-0 w-full transition-all duration-500 max-w-[500px]" : 'right-[-100%] w-0'} fixed  top-[10vh]
        bg-red-400 z-50 transition-all duration-500`}>
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
      </div>
    </>
  );
};

export default Sidebar;
