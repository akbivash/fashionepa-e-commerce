import React, { useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import Product from "../../components/Product";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../actions/products";

const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports  Entertainment",
  "90's Fashion",
  "Made in Nepal",
];
const Home = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((s) => s.products);
  const [page, setPage] = useState(1);
  let limit = 12
  const [startIndex, setStartIndex] = useState((page - 1) * limit);
  const [endIndex, setEndIndex] = useState(limit);
const ref = useRef(null)

  useEffect(() => {
    if(ref.current){
      ref.current.scrollIntoView()
    }
    setStartIndex((page - 1) * limit);
    setEndIndex(page * limit);
  }, [page, limit]);

  useEffect(() => {
    getAllItems(dispatch);
  }, []);



  return (
    <div  className="home grid gap-10 pb-10 relative ">
      <div className="flex ">
        <div className="md:grid hidden pl-10 pr-20  py-10 ">
          {categories.map((cat) => {
            return (
              <Link
              to={`/products?category=${cat}`}
                key={cat}
                className="cursor-pointer h-fit"
              >
                {cat}
              </Link>
            );
          })}
        </div>
        <Slider />
      </div>
      <Categories />

      <div ref={ref} className="grid  gap-10 text-center">
        <h2 className="text-center text-3xl  border-b-2 border-green-dark mx-auto text-green-dark">
          More items
        </h2>

        <div  className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 justify-center place-items-center relative  gap-2 ">
          {productsState.items &&
            productsState.items.slice(startIndex, endIndex).map((item) => {
              return <Product item={item} key={item._id} />;
            })}
        </div>

        {!productsState.error && !productsState.loading && (
          <Pagination
            page={page}
            setPage={setPage}
            limit={limit}
          items={productsState.items}

          />
        )}
        {productsState.loading && <Loading />}
        {productsState.error &&
          !productsState.loading &&
          "Failed to fetch, try Again 😐"}
      </div>
    </div>
  );
};

export default Home;
