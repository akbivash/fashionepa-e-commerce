import React from 'react'
import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
const Success = () => {
  return (
   <div className='grid place-items-center py-10 gap-4'>
   <h2 className='text-2xl'>Congratulations!</h2>
    <h2>Your payment is successful</h2>
    <Link to='/products' className='bg-yellow-dark text-white px-4 py-2 rounded-md'>Continue Shopping</Link>
    <Link to='/' className='text-3xl'><FaHome/></Link>
   </div>
  )
}

export default Success