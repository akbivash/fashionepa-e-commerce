import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
    const [showNotification, setShowNotification] = useState(false)
    const notifyRef = useRef()

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setShowNotification(true)
            return () => {
                clearTimeout(timeoutId)
            }
        }, 5000)
    }, [])
    
    return (
        <div>
            {showNotification && <div className='w-full  max-w-[340px] p-4 z-50 fixed  bottom-0 right-0 gap-2 shadow-2xl bg-white rounded-sm'
                ref={notifyRef}
            >
                <h3 className='text-gray-light text-xl font-[500] tracking-wide '>FashioNepa wants to be friend with you</h3>
                <p className='text-gray-default'>Become friends with FN to be the first one to know about exclusive deals and discounts.</p>
                <div className='flex  gap-4'>
                    <button className='bg-yellow-dark px-4 py-2 text-white'
                        onClick={() => {
                            setShowNotification(false)
                        }}
                    >Not Interested</button>
                    <Link to='/register' className='bg-green-dark text-white py-2 px-4' onClick={() => {
                        setShowNotification(false)
                    }}>Be Friends</Link>
                </div>
            </div>}
        </div>
    )
}

export default Notification