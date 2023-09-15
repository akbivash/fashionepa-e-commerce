import React, { useEffect, useRef, useState } from "react";
import Product from "../../components/Product";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, getItemsByCategory } from "../../actions/products";
import Pagination from "../../components/Pagination";
import { useFilter } from "../../hooks/useFilter";
import { FilterAndSort } from "../../components";
import ProductInfo from "./ProductInfo";

const Products = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [startIndex, setStartIndex] = useState((page - 1) * limit);
  const [endIndex, setEndIndex] = useState(limit);
  const products = useSelector((s) => s.products);
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const id = params.get("id");
  const { filteredItems } = useFilter(filters, sort);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [filteredItems]);

  useEffect(() => {
    if (category !== null) {
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

  if (id !== null) {
    return <ProductInfo id={id} ref={ref} />;
  }

  return (
    <div ref={ref}>
      <FilterAndSort
        setFilters={setFilters}
        setSort={setSort}
        filters={filters}
        sort={sort}
      />

      <div className="grid py-10  gap-2 grid-cols-2  sm:grid-cols-3  lg:grid-cols-4   justify-center place-items-center relative h-full   ">
        {filteredItems.slice(startIndex, endIndex).map((item) => {
          return <Product item={item} key={item._id} />;
        })}
      </div>
      <div
        className={`${
          products.loading && "min-h-[40vh]"
        } text-center  grid place-items-center  `}
      >
        {products.error && !products.loading && (
          <div className="min-h-[40vh] grid place-items-center">
            Failed to fetch, try again 😐
          </div>
        )}
        {products.loading && <Loading />}
        {filteredItems.length === 0 && !products.loading && !products.error && (
          <span className="text-center">No items found</span>
        )}
      </div>

      {filteredItems.length !== 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          items={filteredItems}
        />
      )}
    </div>
  );
};

export default Products;
