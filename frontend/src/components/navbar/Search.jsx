import React, { useRef } from "react";
import { BiSearch, BiLeftArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSearchSuggestions,
  closeSearchbar,
  openSearchSuggestions,
  openSearchbar,
} from "../../redux/slices/componentsSlice";
import { useDebounceSearch } from "../../hooks/useDebounce";
import { getAllItems } from "../../actions/products";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const location = useLocation();
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const debounceSearch = useDebounceSearch(searchText, 500);

  // when page is refreshed, the items in state are destroyed. To get the search suggestions we need products. Therefor getAllItems is called.
  useEffect(() => {
    const getProducts = async () => {
      await getAllItems(dispatch);
    };
    getProducts();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(() => closeSearchbar());
      setSearchText("");
    };
  }, [location.pathname]);

  useEffect(() => {
    if (debounceSearch === "") {
      dispatch(closeSearchSuggestions());
    }
    if (searchText !== "") {
      dispatch(openSearchSuggestions());
    }


    if (state.products.items.length !== 0) {
      const filteredItems = state.products.items.filter(
        (item) =>
          item.categories.some((category) =>
            category.toLowerCase().includes(searchText.toLowerCase())
          ) || item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    
      const uniqueTitlesAndCategories = new Set();
    
      filteredItems.forEach((item) => {
        uniqueTitlesAndCategories.add(item.title);
    
        item.categories.forEach((category) => {
          uniqueTitlesAndCategories.add(category);
        });
      });
    
      const suggestions = Array.from(uniqueTitlesAndCategories).filter((value) =>
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    
      setSearchSuggestions(suggestions);
    }
    
  }, [debounceSearch]);

  return (
    <div  className={`${
      state.components.isSearchbarOpen || searchText !== ""
        ? "absolute top-0 left-0 w-full  "
        : " w-fit"
    } sm:w-full bg-white  sm:relative  z-50   h-full    rounded-md`}>
      <div
        className={`
          w-[90%] h-[90%] bg-white  sm:relative  z-50   mx-auto mt-1  gap-2 border-[1px] flex sm:border-[1px]  items-center p-2  rounded-md`}
      >
        <span
          className={`${
            state.components.isSearchbarOpen || searchText !== ""
              ? "block  cursor-pointer  sm:hidden "
              : "hidden"
          } `}
          onClick={() => {
            dispatch(closeSearchbar());
            setSearchText("");
          }}
        >
          {" "}
          <BiLeftArrow />
        </span>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          className={` ${
            state.components.isSearchbarOpen || searchText !== ""
              ? "block "
              : "hidden "
          } text-lg  sm:block  w-full border-none outline-none`}
        />
        <span>
          {/* it should not open search bar when the width is greater than 640px, it is already opened. so there are two icons, one is without onClick handler   */}
          {searchText !== "" && (
            <FaTimes
              onClick={() => setSearchText("")}
              className=" cursor-pointer text-2xl  w-full  "
            />
          )}
          <AiOutlineSearch
            onClick={() => dispatch(openSearchbar())}
            className={`${
              searchText === "" ? "block" : "hidden"
            } sm:hidden  cursor-pointer text-2xl`}
          />
          <AiOutlineSearch
            className={`${
              searchText === "" ? "sm:block hidden " : "hidden"
            }   cursor-pointer text-2xl`}
          />
        </span>
        {/* suggestionsBox */}
        {state.components.isSearchSuggestions && (
          <div className="search-ref bg-white shadow-3xl shadow-gray-dark py-2 w-full grid gap-1 absolute left-0 top-[8vh] text-center max-w-2xl">
            {searchSuggestions.length !== 0
              ? searchSuggestions.slice(0, 10).map((p, i) => {
                  return (
                    <Link
                      key={p + i}
                      to={`/search?query=${p}`}
                      className="font-semibold text-gray-default tracking-wider"
                      onClick={() => {
                        dispatch(closeSearchSuggestions());
                      }}
                    >
                      {p}
                    </Link>
                  );
                })
              : "No results found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
