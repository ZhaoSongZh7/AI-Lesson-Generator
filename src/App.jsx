import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Generate from './routes/Generate.jsx'
import Preview from './routes/Preview.jsx'


function App() {
  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-500'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/generate' element={<Generate />}/>
          <Route path='/preview' element={<Preview />}/>          
        </Routes>
      </div>
    </>
  )
}

export default App
