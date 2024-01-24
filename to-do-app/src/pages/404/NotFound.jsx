import React from 'react'
import { Link } from 'react-router-dom'
import { TODO_ROUTE } from '../../routes/consts'

const NotFound = () => {
  return (
    <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-400">404</p>
        <p className='text-2xl md:text-2xl lg:text-5xl font-bold tracking-wider text-gray-600'>You seem to be lost!</p>
        <Link to={TODO_ROUTE} className='text-xl font-semibold tracking-wider m-5 text-[#D9727A] hover:underline'>Return Home</Link>
      </div>
    </div>
  )
}

export default NotFound