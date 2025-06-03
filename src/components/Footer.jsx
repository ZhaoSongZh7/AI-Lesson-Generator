import React from 'react'
import { BiPrinter } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-slate-800 shadow-lg flex items-center justify-around py-5 px-32 fixed bottom-0 left-0 w-full z-50'>
            <div className='flex items-center gap-5 text-white'>
                Copyright LessonPrintAI 2025 All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer