import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { useParams } from "react-router-dom";
import {  getSearchResults} from '../actions/search';
import Loading from './Loading';


const SearchResults = () => {
const products = useSelector(s => s.products)
const dispatch = useDispatch()
const text = useParams().searchText?.toLowerCase().split(' ')[0]


useEffect(() => {
   getSearchResults(dispatch, text);
  }, [ text]);

  return (
    <div className='p-4 sm:px-10 grid  justify-center  grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-2 min-h-[200px] '>
      {products.loading && <Loading/>}
   {!products.loading && products.searchResults.length !== 0 ? products.searchResults.map(item => {
      return <Product item={item} key={item._id} />;
    }) : <span className='text-center'>No items found</span>}
    </div>
  )
}

export default SearchResults