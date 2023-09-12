import React from 'react'
import { useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports  Entertainment",
  "90's Fashion",
  "Made in Nepal",
  "cap"

];

const Dropdown = () => {
  const [showCategory, setShowCategory] = useState(false);
  const ref = useRef();


  useEffect(() => {
    window.addEventListener("scroll", showChooseBtn);
    showChooseBtn();
    return () => {
      window.removeEventListener("scroll", showChooseBtn);
    };
  }, [showCategory]);


  function showChooseBtn() {
    if (window.scrollY > 100) {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }


  return (
    <div
      className=" fixed bg-white z-40 w-full grid shadow-sm shadow-[#aaae9f] "
      ref={ref}
    >
      <span
        className=" flex items-center font-bold text-gray-default  pl-10 gap-2 max-w-[300px]  z-[100]   cursor-pointer"
        onMouseOver={() => setShowCategory(true)}
        onMouseOut={() => setShowCategory(false)}
      >
        Choose{" "}
        <span className="text-3xl">
          {" "}
          {showCategory ? <BsArrowUpShort /> : <BsArrowDownShort />}
        </span>
      </span>
      <div
        onMouseOver={() => setShowCategory(true)}
        onMouseOut={() => setShowCategory(false)}
        className={`${showCategory
            ? "grid max-w-[300px] w-full absolute left-0 z-10 bg-white border-[#dfe0dc] border-2 place-items-center gap-2 p-3"
            : "hidden "
          }`}
      >
        {categories.map((cat) => {
          return (
            <Link
              key={cat}
              to={`/category/${cat}`.toLowerCase().replace(/\s/g, '')}
              className={` border-b-gray-light cursor-pointer border-b-[1px]`}
            >
              {cat}
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default Dropdown