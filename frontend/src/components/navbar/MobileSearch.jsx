import React from "react";
import { useDispatch } from "react-redux";
import { closeSearchbar } from "../../redux/slices/componentsSlice";
import { BiLeftArrow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const MobileSearch = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();

  return (
   <div className="sm:hidden bg-white w-full fixed left-0 top-0 h-[10vh] z-50 flex  items-center p-4">
     <div className="flex border-[1px] border-gray-light p-2 rounded-md gap-4 items-center w-full" >
      <span
        onClick={() => {
          dispatch(closeSearchbar());
          setSearchText("");
        }}
        className="cursor-pointer"
      >
        {" "}
        <BiLeftArrow />
      </span>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        type="text"
        className={` text-lg   w-full border-none outline-none`}
      />
      <span>
        {searchText !== "" ? (
          <FaTimes
          fontSize={20}
            onClick={() => setSearchText("")}
            className=" cursor-pointer    "
          />
        ) : (
          <AiOutlineSearch fontSize={20}/>
        )}
      </span>
    </div>
   </div>
  );
};

export default MobileSearch;
