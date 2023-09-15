import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../../redux/slices/cartSlice'
import { logoutSuccess } from '../../redux/slices/userSlice'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

const handleLogout = () => {
dispatch(logoutSuccess())
dispatch(resetState())
navigate('/')
}
  return (
    <div>
        <div className='text-center py-10 min-h-screen'>
            <h2 className='font-[500]'>Are you sure 😐</h2>
       <div className='flex justify-center my-4 gap-4'><button className='bg-yellow-dark text-white px-3 rounded-sm py-1' onClick={() => handleLogout()}>Yes</button> <button className='bg-lime-dark rounded-sm text-white px-3 py-1' onClick={() => navigate('/')}>Cancel</button></div>
        </div>
    </div>
  )
}

export default Logout