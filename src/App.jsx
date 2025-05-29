import { useState, useEffect } from 'react'
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
  const [pdfDataUri, setPdfDataUri] = useLocalStorage("pdfDataUri", null);

   function useLocalStorage(key, initialValue) {
      const [storedValue, setStoredValue] = useState(() => {
          try {
              const item = localStorage.getItem(key);
              return item ? JSON.parse(item) : initialValue;
          } catch (error) {
              return initialValue;
          }
      });
  
      useEffect(() => {
          localStorage.setItem(key, JSON.stringify(storedValue));
      }, [key, storedValue]);
  
      return [storedValue, setStoredValue];
  }

  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-500'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/generate' element={<Generate pdfDataUri={pdfDataUri} setPdfDataUri={setPdfDataUri} useLocalStorage={useLocalStorage}/>}/>
          <Route path='/preview' element={<Preview pdfDataUri={pdfDataUri} setPdfDataUri={setPdfDataUri} useLocalStorage={useLocalStorage}/>}/>          
        </Routes>
      </div>
    </>
   )
}

export default App
