import React from 'react'
import { BiPrinter } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 shadow-lg flex items-center justify-around py-5 px-32 fixed top-0 left-0 w-full z-50'>
        <div className='flex items-center gap-5 text-black'>
            <div className='flex items-center gap-3 font-semibold py-1 px-3 text-2xl hover:text-sky-500 transition duration-300 text-white'>
                <BiPrinter className='text-[45px] min-w-[45px]'/>
                <span>LessonPrint AI<span className='bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] bg-clip-text text-transparent'> - powered by Gemini</span></span>
            </div>
        
            <Link to="/" className='py-1 px-3 text-lg font-light rounded-2xl text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                Home
            </Link>

            {/* <Link to="/about" className='py-1 px-3 text-lg font-light rounded-2xl text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                About
            </Link> */}

            <Link to="/generate" className='py-1 px-3 text-lg font-light text-white rounded-2xl hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                Generate
            </Link>

            <Link to="/preview" className='py-1 px-3 text-lg font-light text-white rounded-2xl hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                Preview
            </Link>
        </div>
    </nav>
  )
}

export default Navbar