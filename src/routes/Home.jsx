import React from 'react'
import Typewriter from "typewriter-effect"
import "./Home.css"

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex flex-col items-center justify-start pt-35 z-10">
        <h1 className="fade-in-text translate-y-[50px] sticky text-7xl bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent tracking-normal opacity-80 font-bold">
          Welcome to LessonPrint AI
        </h1>
        <div className='sticky z-10 flex flex-col max-w-4xl max-l-4xl max-h-4 text-4xl gap-5 text-black font-semibold pt-50'>
            <Typewriter options={{
                strings: 'At LessonPrint AI, we help you go from idea to print in seconds. Enter a prompt anything from “a 5th grade science lesson on photosynthesis” to “an ESL grammar warm-up” and let our AI do the rest. Generate. Preview. Print. Done.',
                autoStart: true,
                delay: 15,
                loop: false
            }} />
        </div>
      <div id='sub' className='sticky flex flex-col intems-center pt-10 space-y-5'>  
        {/* <h2 className='move-up-text text-3xl'>Powered by Zhao Song Zhou, Michael Holley and Sadat Islam</h2>
        <h2 className='move-up-text text-3xl text-bold text-white'>Product of QTHS Cloud Networking Department</h2> */}
      </div>
      {/* <div className='h-1000'></div> */}
      <div id='bgshape'className="relative -translate-y-[400px] w-full h-400 top-10 bg-gradient-to-b from-slate-50 to-blue-400 bg-clip opacity-60 mt-50 z-[-1]"></div>
      <div id='images' className='relative -translate-y-[1200px] image-container'>
        <img id='googledoc' className='' src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" width="200 "></img>
        <img id='microsoftword' className='' src="https://cdn-icons-png.flaticon.com/128/888/888883.png" width="170"></img>
        <img id='rtf' className='' src='https://cdn-icons-png.flaticon.com/128/8361/8361296.png'></img>
        <img id='pdf' className='' src='https://cdn-icons-png.flaticon.com/128/136/136522.png'></img>
      </div>
      {/* <div className='sidebar'>
        <h3 className='text-black'>TEXTEXTEXT</h3>
      </div> */}
      {/* <h1 className='text-black justify-center items-center'>Here are all the file platforms we support</h1> */}
        
    </div>
  )
}

export default Home