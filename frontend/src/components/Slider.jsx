import React, { useEffect, useRef, useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { sliderItems } from "../assets/data";

const Slider = () => {
  const [card, setCard] = useState();
  const cardRef = useRef(null);
  const sliderRef = useRef(null);
  const firstClone = sliderItems[0];
  const lastClone = sliderItems[sliderItems.length - 1];
  const clonedItems = [lastClone, ...sliderItems, firstClone];
  const timerRef = useRef(null);

  useEffect(() => {
    setCard(cardRef.current);
    if (sliderRef.current !== null) {
      sliderRef.current.addEventListener("scroll", handleScroll);
      sliderRef.current.style.scrollBehavior = "smooth";
      if (cardRef.current !== null) {
        startTimer();
      }
    }

    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      sliderRef.current.scrollLeft += cardRef.current.clientWidth;
    }, 8000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleScroll = () => {
    stopTimer();
    startTimer();
    if (sliderRef.current.scrollLeft === 0) {
      sliderRef.current.style.scrollBehavior = "auto";
      sliderRef.current.scrollLeft =
        sliderRef.current.scrollWidth - 2 * sliderRef.current.offsetWidth;
    } else if (
      sliderRef.current.scrollLeft >=
      sliderRef.current.scrollWidth - sliderRef.current.offsetWidth - 5
    ) {
      sliderRef.current.style.scrollBehavior = "auto";
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth;
    } else {
      sliderRef.current.style.scrollBehavior = "smooth";
    }
  };

 

  return (
    <div className="relative">
      <div
        className="card overflow-x-auto snap-mandatory snap-x  slider flex  h-[400px]"
        ref={sliderRef}
      >
        {clonedItems.map((s, i) => (
          <div
            key={s.id + i}
            className="min-w-full snap-start card"
            ref={cardRef}
          >
            <img src={s.img} alt="img" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
