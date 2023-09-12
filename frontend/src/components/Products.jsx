import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, getItemsByCategory } from "../actions/products";
import Pagination from "./Pagination";
import { useFilter } from "../hooks/useFilter";

const Products = ({ filters, sort, width }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [startIndex, setStartIndex] = useState((page - 1) * limit);
  const [endIndex, setEndIndex] = useState(limit);
  const products = useSelector((s) => s.products);
  const { filteredItems } = useFilter(filters, sort);
  const category = useParams().category;
  const dispatch = useDispatch();

  useEffect(() => {
    if (category !== undefined && category !== "") {
      getItemsByCategory(dispatch, category);
    } else {
      getAllItems(dispatch);
    }
  }, [category]);

  useEffect(() => {
    setStartIndex((page - 1) * limit);
    setEndIndex(page * limit);
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  useEffect(() => {
    if (width < 640) {
      setLimit(4);
    } else if (width < 992) {
      setLimit(6);
    } else {
      setLimit(8);
    }
  }, [width]);

  return (
    <>
      <div className="grid min-h-[100px] gap-2 grid-cols-2  sm:grid-cols-3  lg:grid-cols-4   justify-center place-items-center relative h-full p-4 sm:px-4  ">
        {filteredItems.slice(startIndex, endIndex).map((item) => {
          return <Product item={item} key={item._id} />;
        })}
      </div>
      <div className="text-center  ">
        {products.error && !products.loading && (
          <div className="py-10">Failed to fetch, try again 😐</div>
        )}
        {products.loading && (
          <div className="py-10">
            <Loading />
          </div>
        )}
        {Object.keys(filters).length !== 0 &&
          filteredItems.length === 0 &&
          !products.loading &&
          !products.error && (
            <span className="text-center">No items found</span>
          )}
      </div>

      <div className="">
        {!products.error && !products.loading && (
          <Pagination
            page={page}
            width={width}
            setPage={setPage}
            limit={limit}
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            filters={filters}
            sort={sort}
          />
        )}
      </div>
    </>
  );
};

export default Products;
