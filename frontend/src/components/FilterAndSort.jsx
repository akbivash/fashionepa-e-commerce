import React from "react";
import {  useEffect } from "react";
import { useParams } from "react-router-dom";

const FilterAndSort = ({setFilters, setSort, filters, sort}) => {
  const category = useParams().category;

  useEffect(() => {
    setFilters({});
    setSort({});
  }, [category]);

  const handleFilter = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <div className=" grid gap-4 sm:flex justify-between items-center relative">
        <div className="flex gap-2 ">
          <h2>Filter Products </h2>
          <select
            className="border-gray border-[1px] rounded-sm"
            name="color"
            onChange={handleFilter}
            value={filters.color || "Color"}
          >
            <option value="">Color</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="yellow">Yellow</option>
          </select>
          <select
            className="border-gray border-[1px] rounded-sm"
            name="size"
            onChange={handleFilter}
            value={filters.size || ""}
          >
            <option value="">Size</option>
            {category === "alcohol" ? (
              <>
                {" "}
                <option value="250ml">250ml</option>
                <option value="500ml">500ml</option>{" "}
                <option value="750ml">750ml</option>{" "}
              </>
            ) : (
              <>
                {" "}
                <option value="L">L</option>
                <option value="XL">XL</option>{" "}
              </>
            )}
          </select>
        </div>

        <div className="flex gap-4">
          <h2>Sort Products</h2>
          <select
            className="border-gray border-[1px] rounded-sm"
            name="price"
            onChange={handleSort}
            value={sort || ""}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price(Asc)</option>
            <option value="desc">Price(Desc)</option>
          </select>
        </div>
      </div>

    </>
  );
};

export default FilterAndSort;
