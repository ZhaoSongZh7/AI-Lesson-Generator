import React from 'react'
import Typewriter from "typewriter-effect"

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
        <div className='flex flex-col items-start max-w-3xl gap-5 font-semibold text-3xl'>
            <Typewriter options={{
                strings: 'At Print AI, we help you go from idea to print in seconds. Enter a prompt — anything from “a 5th grade science lesson on photosynthesis” to “an ESL grammar warm-up” — and let our AI do the rest. Generate. Preview. Print. Done.',
                autoStart: true,
                delay: '10',
                loop: false
            }}
            />
        </div>
    </div>
  )
}

export default About