import React, { useEffect } from "react";

const Pagination = ({ page, setPage, limit, items }) => {

  const totalPages = Math.ceil(items.length / limit);

  const handlePage = (index) => {
    setPage(index);
  };

  useEffect(() => {
    if (page !== 0 && totalPages !== 0) {
      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [limit]);
  
  return (
    <div className="flex  flex-wrap justify-center gap-2  ">
      {totalPages > 0 &&
        [...Array(totalPages)].map((item, ind) => {
          if (ind + 1 === page) {
            return (
              <button
                key={ind}
                className="border-[1px] bg-green-dark text-white border-black px-2"
                onClick={() => handlePage(ind + 1)}
              >
                {ind + 1}
              </button>
            );
          } else {
            return (
              <button
                key={ind}
                className="border-[1px] border-black px-2"
                onClick={() => {
                  totalPages !== 1 && handlePage(ind + 1);
                }}
              >
                {ind + 1}
              </button>
            );
          }
        })}
    </div>
  );
};

export default Pagination;
