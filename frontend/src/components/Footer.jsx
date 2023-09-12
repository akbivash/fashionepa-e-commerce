import React from "react";
import {
  BsFacebook,
  BsPaypal,
  BsTwitter,
  BsYoutube,
  BsTelephoneFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { FaCcVisa, FaEnvelope } from "react-icons/fa";
import { icons } from "../assets/data";

const Footer = () => {
  return (
    <div className="max-w-[1400px] bg-tahiti-dark text-white mx-auto   grid p-4  py-10 gap-10 justify-center   md:flex  md:justify-around">
      <div className="  grid h-fit flex-[0.7]  gap-4  text-center ">
        <h2 className="text-2xl font-[Ubuntu] tracking-wide font-black ">
          {" "}
          FashioNepa
        </h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing deleniti
          accusantium eius omnis repellendus eligendi Numquam omnis facere
          neque.
        </p>
        <div className="flex justify-center gap-4 mt-4 text-4xl  h-10">
          {icons.map((i) => {
            return (
              <img
                src={i.img}
                alt={i.name}
                key={i.name}
                className="cursor-pointer"
              />
            );
          })}
        </div>
      </div>

     <div className="grid gap-4 flex-1  sm:flex  justify-around">
     <div className=" grid gap-4  ">
        <h4 className="text-2xl">Useful Links</h4>
        <div className="flex gap-10 font-[500]">
          <ul className="grid  gap-3">
           <Link to='/'>
              Home
            </Link>
           <Link to="/men'sfashion">
              Men Fashion
            </Link>
           <Link to="/women'sfashion">
              Women Fashion
            </Link>
           <Link to='/products'>
              For Everyone
            </Link>
           <Link>
              Order Tracker
            </Link>
          </ul>
          <ul className="flex flex-col gap-3">
           <Link to='/cart'>Cart</Link>
           <Link to='/account'>My Account</Link>
           <Link>Terms</Link>
          </ul>
        </div>
      </div>

      <div className=" h-fit grid gap-4  ">
        <h4 className="text-2xl font-[500]">Contact</h4>
        <span className="flex items-center gap-4">
          <i>
            {" "}
            <ImLocation2 />
          </i>{" "}
          Naxal, Kathmandu 44600
        </span>
        <span className="flex items-center gap-4">
          <i>
            <BsTelephoneFill />
          </i>{" "}
          +977 9805432101
        </span>
        <span className="flex items-center gap-4">
          <i>
            <FaEnvelope />
          </i>
          akbivash@gmail.com
        </span>
        <span className="flex items-center gap-4">
          <BsPaypal /> <FaCcVisa />{" "}
        </span>
        
      </div>
     </div>
    </div>
  );
};

export default Footer;
