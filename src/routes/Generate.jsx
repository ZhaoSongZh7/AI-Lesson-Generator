import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import Typewriter from "typewriter-effect";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

const Generate = () => {
	const [promptValue, setPromptValue] = useState("");
    const [previousPromptValue, setPreviousPromptValue] = useState('');
	const [generatedValue, setGeneratedValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

	const ai = new GoogleGenAI({
		apiKey: "AIzaSyBszETvxeQDycpR6YeiU0b0NU5-Oz-CcH8",
	});

	async function generate(contents) {
		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: contents,
		});
		console.log(response.text);
		setGeneratedValue(response.text);
	}

	function handleChange(e) {
		setPromptValue(e.target.value);
		console.log(promptValue);
	}

	function handleEnterSubmit(e) {
		if (e.key === "Enter") {
			if (promptValue.length > 0) {
				generate(promptValue);
                setPreviousPromptValue(e.target.value);
				setPromptValue("");
			} else {
				alert("Enter a non-empty input!");
			}
		}
	}

	function handleKeySubmit() {
		if (promptValue.length > 0) {
			generate(promptValue);
            setPreviousPromptValue(e.target.value);
			setPromptValue("");
		} else {
			alert("Enter a non-empty input!");
		}
	}

	return (
		<div className="min-h-screen bg-slate-50 w-full flex items-start justify-center">
			<div className="flex flex-col items-start max-w-3xl gap-5 font-semibold text-3xl translate-y-[150px]">  
				<div>
					<div className="text-lg flex items-start w-[768px] pt-[10px] pb-[10px]">
						Generate a lesson:
					</div>
					<label>
						<div className="flex relative">
							<input
								value={promptValue}
								onKeyDown={handleEnterSubmit}
								onChange={handleChange}
								className="min-w-[768px] h-10 text-sm border-gray-400 border-1 rounded-full pl-3 pr-12"
								name="prompt"
								placeholder="Describe your lesson idea (e.g., photosynthesis for 6th grade)"
								type="text"
							/>
							<button
								type="submit"
								onClick={handleKeySubmit}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-800"
							>
								<IoSendSharp className="text-[25px]" />
							</button>
						</div>
					</label>
				</div>
				<div
					className="text-[25px] font-normal min-w-full max-h-[600px] overflow-auto p-[25px]
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
				>
                    <div className="font-bold pb-[20px]">Your Prompt: {previousPromptValue}</div>

					<ReactMarkdown>{generatedValue}</ReactMarkdown>
					{/* <Typewriter options={{
                    strings: generatedValue,
                    autoStart: true,
                    delay: '0',
                    loop: false,
                    cursor: ''
                }}
                /> */}
				</div>
			</div>
		</div>
	);
};

export default Generate;
