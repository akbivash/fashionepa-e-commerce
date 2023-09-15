import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../actions/search";
import Loading from "../../components/Loading";
import Product from "../../components/Product";
import { Pagination } from "../../components";

const SearchResults = () => {
  const products = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [startIndex, setStartIndex] = useState((page - 1) * limit);
  const [endIndex, setEndIndex] = useState(limit);
 


  useEffect(() => {
    getSearchResults(dispatch, query);
  }, [query]);

  useEffect(() => {
    setStartIndex((page - 1) * limit);
    setEndIndex(page * limit);
  }, [page, limit]);

  return (
    <>
         {products.loading  && <Loading />}
      <div className="p-4 sm:px-10 grid  justify-center  grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-2 min-h-[200px] ">
   
        { products.searchResults.length !== 0 && (
          products.searchResults.slice(startIndex, endIndex).map((item) => {
            return <Product item={item} key={item._id} query={query} />;
          })
        )}
      </div>
      {products.searchResults.length !== 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          items={products.searchResults}
        />
      )}
    </>
  );
};

export default SearchResults;
