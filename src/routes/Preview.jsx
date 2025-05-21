import React from 'react'
import Typewriter from "typewriter-effect"

const Preview = () => {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
        <div className='flex flex-col items-start max-w-3xl gap-5 font-semibold text-3xl'>
            <Typewriter options={{
                strings: 'Preview',
                autoStart: true,
                delay: '10',
                loop: false
            }}
            />
        </div>
    </div>
  )
}

export default Preview