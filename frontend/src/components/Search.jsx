import React, { useRef } from 'react'
import { BiSearch, BiLeftArrow } from 'react-icons/bi'
import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeSearchSuggestions, closeSearchbar, openSearchSuggestions, openSearchbar } from '../redux/slices/componentsSlice';
import { useDebounceSearch } from '../hooks/useDebounce';


const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const location = useLocation()
  const state = useSelector(s => s)
  const dispatch = useDispatch()
  const debounceSearch = useDebounceSearch(searchText, 500)


  useEffect(() => {
    return () => {
      dispatch(() => closeSearchbar())
      setSearchText('')
    }
  }, [location.pathname])


  useEffect(() => {
    if (debounceSearch === '') {
      dispatch(closeSearchSuggestions())
    }
    if (searchText !== '') {
      dispatch(openSearchSuggestions())
    }

    if (state.products.items.length !== 0) {
      const filteredItems = state.products.items.filter(item =>
        item.categories.some(category => category.toLowerCase().includes(searchText.toLowerCase())) ||
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      const suggestions = filteredItems.flatMap(item => [
        ...item.categories.filter(category =>
          category.toLowerCase().includes(searchText.toLowerCase())
        ),
        item.title
      ]);
      setSearchSuggestions(suggestions);
    }


  }, [debounceSearch]);


  return (
    <>
      <div
        className={`${state.components.isSearchbarOpen || searchText !== '' ? ' fixed w-full left-0 sm:relative    top-0 z-40' : ''} sm:flex-[.9]    bg-white sm:relative  `}
      >
        <div className='w-[90%] mx-auto gap-2 border-[1px] flex sm:border-[1px] my-2 items-center p-2 rounded-md'>
          <span
            className={`${state.components.isSearchbarOpen ? 'block  cursor-pointer' : 'hidden'}`}
            onClick={() => {
              dispatch(closeSearchbar())
              setSearchText('')
            }}
          >
            {" "}
            <BiLeftArrow />
          </span>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            className={` ${state.components.isSearchbarOpen || searchText !== '' ? "w-full" : "hidden sm:block "} text-lg  w-full border-none outline-none`}
          />
          <span>
            {searchText !== '' ? <FaTimes onClick={() => setSearchText('')} className=' cursor-pointer' /> : <AiOutlineSearch onClick={() => dispatch(openSearchbar())} className={`${state.components.isSearchbarOpen && 'hidden'}  cursor-pointer text-2xl`} />}
          </span>
        </div>
        {/* suggestionsBox */}
        {state.components.isSearchSuggestions && <div className='search-ref bg-white shadow-3xl shadow-gray-dark py-2 w-full grid gap-1 absolute left-0 top-[60px] text-center max-w-2xl'>
          {searchSuggestions.length !== 0 ? searchSuggestions.slice(0, 10).map((p,i) => {
            return <Link key={p + i} to={`/search?query=${p}`} className='font-semibold text-gray-default tracking-wider' onClick={() => {
              dispatch(closeSearchSuggestions())
              dispatch(closeSearchbar())
            }}>{p}</Link>
          }) : 'No results found'}
        </div>}

      </div>
    </>
  )
}

export default Search

