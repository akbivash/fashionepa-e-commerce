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
import MobileSearch from './MobileSearch';

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
    <div className="w-full relative flex justify-end " >
     
        {/* for larger device  */}
       <div className="hidden w-full  sm:flex border-[1px] border-gray-light sm:items-center  rounded-md px-2">
       <input type="text" className="outline-none border-none p-1 w-full " onChange={(e) => setSearchText(e.target.value)} value={searchText} />
       
       {searchText !== "" && (
         <FaTimes
           onClick={() => setSearchText("")}
           className=" cursor-pointer  w-10  "
         />
       )}
       <AiOutlineSearch
         className={`${
           searchText === "" ? "block" : "hidden"
         } cursor-pointer text-2xl w-10`}
       />
       </div>
          
          {/* for mobile  */}
          <AiOutlineSearch
        onClick={() => dispatch(openSearchbar())}
        className="sm:hidden cursor-pointer"
        fontSize={25}
       />
         {state.components.isSearchbarOpen  && <MobileSearch searchText={searchText} setSearchText={setSearchText}/>}
        {/* suggestionsBox */}
        {state.components.isSearchSuggestions && (
          <div className={`  search-ref fixed left-4 right-4 top-[10vh]  sm:absolute sm:left-0 grid gap-1 bg-white  text-center  max-w-2xl`}>
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
  );
};

export default Search;
