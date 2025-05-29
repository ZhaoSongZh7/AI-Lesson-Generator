import React, { useState, useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import Typewriter from "typewriter-effect";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // make sure this is installed

const Generate = () => {
	const [promptValue, setPromptValue] = useState("");
	const [previousPromptValue, setPreviousPromptValue] = useState("");
	const [generatedValue, setGeneratedValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const pdfContentRef = useRef(null);

	const ai = new GoogleGenAI({
		apiKey: import.meta.env.VITE_GEMINI_API_KEY,
	});

	async function generate(contents) {
		setIsLoading(true);
		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: contents,
			config: {
				systemInstruction:
					"Make sure to use <br> after each new line. You are a teacher who has mastered every subject. Your name is Lesson AI. Your job is to generate lesson plans for teachers to use. Format your responses appropriately. Then, after giving your response, ask them more details such as how much time they have to teach the lesson, and what format they would like to have it in. Your next response will be formatted based of their answers.",
			},
		});
		console.log(response.candidates[0].content.parts[0].text);
		setGeneratedValue(response.text);
		setIsLoading(false);
	}

	function handleChange(e) {
		setPromptValue(e.target.value);
		console.log(promptValue);
	}

	function handleEnterSubmit(e) {
		if (e.key === "Enter") {
			if (promptValue.length > 0) {
				generate(promptValue);
				setPreviousPromptValue(promptValue);
				setPromptValue("");
			} else {
				alert("Enter a non-empty input!");
			}
		}
	}

	function handleKeySubmit() {
		if (promptValue.length > 0) {
			generate(promptValue);
			setPreviousPromptValue(promptValue);
			setPromptValue("");
		} else {
			alert("Enter a non-empty input!");
		}
	}

	// const generatePDF = () => {
	// 	const doc = new jsPDF("p", "pt", "letter");

	// 	const data = {
	// 		callback: function (doc) {
	// 			doc.save("demo.pdf");
	// 		},
	// 		margin: [20, 20, 20, 20],
	// 		autoPaging: "text",
	// 		html2canvas: {
	// 			scale: 0.8,
	// 		},
	// 	};

	// 	doc.html(pdfContentRef.current, data);
	// 	// doc.text(generatedValue, 10, 10); // Add content to the PDF
	// };

	const generatePDF = () => {
		const doc = new jsPDF({
			unit: "pt",
			format: "letter",
			lineHeight: 1.5,
		});

		const margin = 40;
		const pageWidth = doc.internal.pageSize.getWidth();
		const maxLineWidth = pageWidth - margin * 2;
		const lineHeight = 20;

		// Basic markdown cleanup
		const plainText = generatedValue.replace(/<br>/g, "\n").trim();

		const lines = plainText.split("\n");

		let cursorY = margin;

		for (let line of lines) {
			if (cursorY > doc.internal.pageSize.getHeight() - margin) {
				doc.addPage();
				cursorY = margin;
			}

			// Split line into parts based on **bold**
			const parts = line.split(/(\*\*[^*]+\*\*)/g); // match bold blocks
			let cursorX = margin;

			for (let part of parts) {
				let isBold = /^\*\*[^*]+\*\*$/.test(part);
				let text = part.replace(/\*\*/g, "");

				const words = doc.splitTextToSize(
					text,
					maxLineWidth - (cursorX - margin)
				);

				for (let i = 0; i < words.length; i++) {
					if (cursorY > doc.internal.pageSize.getHeight() - margin) {
						doc.addPage();
						cursorY = margin;
						cursorX = margin;
					}

					doc.setFont("Arial", isBold ? "bold" : "normal");
					doc.text(words[i], cursorX, cursorY);

					cursorY += lineHeight;
				}
			}
		}

		doc.save("lesson.pdf");
	};

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
					<div className="font-bold pb-[20px]">
						Your Prompt: {previousPromptValue}
					</div>

					{!isLoading ? (
						<>
							<div ref={pdfContentRef}>
								<ReactMarkdown
									remarkPlugins={[remarkBreaks]}
									rehypePlugins={[rehypeRaw]}
								>
									{generatedValue}
								</ReactMarkdown>
							</div>
							<button
								className="translate-y-[20px] py-1 px-3 text-2xl font-light rounded-[8px] text-white bg-slate-700 hover:text-sky-300 transition duration-300 "
								onClick={generatePDF}
							>
								Download
							</button>
						</>
					) : (
						<>
							<Typewriter
								options={{
									strings: "Loading...",
									autoStart: true,
									delay: "0",
									loop: true,
									cursor: "",
								}}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Generate;
