import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from "../redux/slices/cartSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi'
import { closeModal, openModal, setText } from "../redux/slices/modalSlice";
import { getSingleItem } from "../actions/products";

const Product = () => {
  const dispatch = useDispatch()
  const { isModal } = useSelector(state => state.modal)
  const [isInCart, setIsInCart] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const products = useSelector(s => s.products)
  let color = products.item.color && products.item.color.length > 1 ? products.item.color[0] : products.item.color
  let size = products.item.size && products.item.size.length > 1 ? products.item.size[0] : products.item.size
  const cart = useSelector(state => state.cart)

  const id = useParams().id

  useEffect(() => {
    getSingleItem(dispatch, id)
  }, [])

  useEffect(() => {
    cart.items.length !== 0 && cart.items.map(p => {
      if (p._id === products.item._id) {
        setIsInCart(true)
      }
    })
  }, [products.item])

  function handleQuantity(type) {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  }

  function addToCart() {
    if (products.item.price !== undefined) {
      dispatch(openModal())
      dispatch(addItem({ ...products.item, quantity, size, color }))
      setIsInCart(true)
      setTimeout(() => { dispatch(closeModal()) }, 1000)
    }
  }

  const handleColor = (e) => {
    color = e.target.value
  }
  const handleSize = (e) => {
    size = e.target.value
  }
  return (
    <>
      {products.isLoading && <Loading />}
      {!products.isLoading && products.isError && <div className="text-center pt-7">Sorry, try again 😐</div>}
      {products.item && <div className="sm:flex pt-[8vh] grid px-4 place-items-center gap-8  lg:gap-20 sm:justify-center  ">
        <img
          src={products.item.img}
          alt=""
          className=" w-full max-w-[300px] h-[260px] sm:h-[400px] md:max-w-[400px] object-cover rounded-sm "
        />

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl ">{products.item.title}</h2>
          <p className="text-center">{products.item.desc}</p>
          <span className="text-2xl">Rs {products.item.price}</span>
          <div className="flex items-center gap-3">
            <span>Color</span>
            <select className=" mx-2 border-2 text-black rounded-sm outline-none " onChange={handleColor}>
              {products.item && products.item.color && products.item.color.map((color) => {
                return <option value={color} key={color} >{color}</option>
              })}
            </select>

            <div className="size_btn flex">
              <span>Size</span>
              <select className=" mx-2 border-2 text-black rounded-sm outline-none " onChange={handleSize}>
                {products.item.size && products.item.size.map(size => {
                  return <option value={size} key={size} >{size}</option>
                })}
              </select>
            </div>
          </div>

          <div className="flex gap-10 ">
            <div className="flex gap-5 items-center">
              <span
                className="text-4xl text-yellow-dark cursor-pointer"
                onClick={() => handleQuantity("dec")}
              ><AiOutlineMinusCircle /></span>
              <span className="text-2xl ">{quantity}</span>
              <span className="text-green-dark cursor-pointer text-4xl relative" onClick={() => handleQuantity("inc")}>
                <BiPlusCircle />
              </span>
            </div>
            {
              isInCart ? <Link to='/cart' className="bg-green-dark p-3 rounded-sm text-white  text-center w-[130px]">Open Cart</Link> : <button
                className="bg-green-dark p-3  text-center rounded-sm text-white disabled:opacity-50  w-[130px]"
                onClick={addToCart}
                disabled={products.item.price === undefined || products.item === undefined || products.isError || products.isLoading}
              >
                ADD TO CART
              </button>
            }
            {isModal && <Modal className='fixed'>
              <h2>Added to cart</h2>
            </Modal>}


          </div>
        </div>
      </div>}
    </>
  );
};

export default Product;
