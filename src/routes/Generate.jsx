import React, { useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import Typewriter from "typewriter-effect"
import { GoogleGenAI } from "@google/genai";

const Generate = () => {
    const [promptValue, setPromptValue] = useState('');
    const [generatedValue, setGeneratedValue] = useState('');
    
    const ai = new GoogleGenAI({ apiKey: "AIzaSyBszETvxeQDycpR6YeiU0b0NU5-Oz-CcH8" });
    
    async function generate(contents) {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: contents,
        });
        console.log(response.text);
        setGeneratedValue(response.text)
      }
    
    function handleChange(e) {
        setPromptValue(e.target.value);
        console.log(promptValue);
    } 

    function handleEnterSubmit(e) {
        if (e.key === 'Enter') {
            if (promptValue.length > 0) {
                generate(promptValue)
                setPromptValue('');
            } else {
                alert('Enter a non-empty input!')
            }
        }
    } 

    function handleKeySubmit() {
        if (promptValue.length > 0) {
            generate(promptValue)
            setPromptValue('');
        } else {
            alert('Enter a non-empty input!')
        }
    } 

  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
        <div className='flex flex-col items-start max-w-3xl gap-5 font-semibold text-3xl'>
            {/* <Typewriter options={{
                strings: 'Generate a Prompt',
                autoStart: true,
                delay: '10',
                loop: false
            }}
            /> */}
            <div>
                <div className='text-lg flex items-start'>Generate a lesson:</div>
                <label>
                    <div className='flex relative w-[500px]'>
                        <input value={promptValue} onKeyDown={handleEnterSubmit} onChange={handleChange} className="w-170 h-10 text-sm border-gray-400 border-1 rounded-lg pl-3 pr-12" name="prompt" placeholder='Describe your lesson idea (e.g., photosynthesis for 6th grade)' type="text"/>
                        <button type="submit" onClick={handleKeySubmit} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-800'>
                            <IoSendSharp className='text-[25px]'/>
                        </button>
                    </div>
                </label>
            </div>
        </div>
    </div>
  )
}

export default Generate