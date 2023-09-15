import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../assets/data'
const Categories = () => {

  return (
    <div  className='w-full  z-10  items-center flex flex-wrap justify-center gap-2 md:gap-8 '>
      {categories.map((category, index) => {
        return <Link  to={`/products?category=${category.cat}`} key={category.id}
        className='w-full  h-[320px] rounded-lg overflow-hidden  max-w-[350px] sm:max-w-[300px]  relative '>
        {/* <div> */}
    <img src={category.img} alt="img" className='w-full h-full bg-black object-cover '/>
  
    <div className='absolute bottom-0 w-full  left-0  bg-[rgba(0,0,0,0.4)] text-white  p-2'>
    <div className='text-2xl w-full font-bold'>{category.title}</div>
      <button className='bg-white text-black-dark p-3'>SHOP NOW</button>
    </div>
     {/* </div> */}
        </Link>
      })}
    </div>
    
  
  )
}

export default Categories