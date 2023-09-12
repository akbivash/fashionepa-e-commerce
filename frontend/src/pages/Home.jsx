import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../actions/products";
const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports  Entertainment",
  "90's Fashion",
  "Made in Nepal",
];
const Home = ({ width }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((s) => s.products);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [startIndex, setStartIndex] = useState((page - 1) * limit);
  const [endIndex, setEndIndex] = useState(limit);

  useEffect(() => {
    setStartIndex((page - 1) * limit);
    setEndIndex(page * limit);
  }, [page, limit]);

  useEffect(() => {
    getAllItems(dispatch);
  }, []);

  useEffect(() => {
    if (width < 640) {
      setLimit(4);

    } else if (width < 992) {
      setLimit(6);
    } else {
     setLimit(8)
    }
  }, [width]);
  
  return (
    <div className="home grid gap-2 relative ">
      <div className="flex ">
        <div className="md:grid hidden pl-10 pr-20  py-10 ">
          {categories.map((cat) => {
            return (
              <Link
                to={`category/${cat.toLowerCase().replace(/\s+/g, "")}`}
                key={cat}
                className="cursor-pointer h-fit"
              >
                {cat}
              </Link>
            );
          })}
        </div>
        <Slider />
        <Dropdown />
      </div>
      <Categories />

      <h2 className="text-center text-3xl pt-4 border-b-2 border-green-dark mx-auto text-green-dark">
        More items
      </h2>
      {productsState.items && (
        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 justify-center place-items-center relative h-full  gap-2 p-4 sm:px-4 ">
          {productsState.items.slice(startIndex, endIndex).map((item) => {
            return <Product item={item} key={item._id} />;
          })}
        </div>
      )}

      {!productsState.error && !productsState.loading && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
        />
      )}
      <div className="">
        {productsState.loading && (
          <div className="pb-8">
            {" "}
            <Loading />{" "}
          </div>
        )}
        {productsState.error && !productsState.loading && (
          <div className="text-center  pb-4 ">
            Failed to fetch, try Again 😐
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
