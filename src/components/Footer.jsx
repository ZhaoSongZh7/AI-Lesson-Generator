
import React from 'react'
import { BiPrinter } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-slate-800 shadow-lg flex items-center justify-around py-3 px-32 z-50'>
            <div className='flex items-center gap-5 text-white'>
                Copyright LessonPlan AI 2025 All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer
