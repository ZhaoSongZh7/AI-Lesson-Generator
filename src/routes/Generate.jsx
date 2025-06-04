import React, { useState, useRef, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";
import Typewriter from "typewriter-effect";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // make sure this is installed
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Generate = ({ pdfDataUri, setPdfDataUri, useLocalStorage }) => {
  const [promptValue, setPromptValue] = useLocalStorage("promptValue", "");
  const [generatedValue, setGeneratedValue] = useLocalStorage(
    "generatedValue",
    ""
  );
  const [isLoading, setIsLoading] = useLocalStorage("isLoading", false);
  const [isEditing, setIsEditing] = useLocalStorage("isEditing", false);
  const [editedValue, setEditedValue] = useLocalStorage("editedValue", "");
  const [currentPromptArray, setCurrentPromptArray] = useLocalStorage(
    "currentPromptArray",
    []
  ); // Initialize as empty array
  const [currentIndex, setCurrentIndex] = useLocalStorage("currentIndex", -1); // Initialize to -1 or 0, -1 is safer if array starts empty

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  // Effect to update editedValue when generatedValue changes, to ensure editing reflects latest AI output
  useEffect(() => {
    if (!isEditing) {
      setEditedValue(generatedValue);
    }
  }, [generatedValue, isEditing]);

  // Effect to update pdfDataUri when generatedValue changes and not in editing mode
  useEffect(() => {
    if (!isEditing && generatedValue) {
      generatePDF(); // Re-generate PDF whenever the content changes, unless editing
    }
  }, [generatedValue, isEditing]);

  async function generate(prompt) {
    setIsLoading(true);
    setIsEditing(false);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "Make sure to use <br> after each new line. You are a teacher who has mastered every subject. Your name is Lesson AI. Your job is to generate lesson plans for teachers to use. Format your responses appropriately. Then, after giving your response, ask them more details such as how much time they have to teach the lesson, and what format they would like to have it in. Your next response will be formatted based of their answers.",
        },
      });
      const aiText = response.text;
      setGeneratedValue(aiText);

      // Add the new prompt and AI response to the array
      const newPromptEntry = { prompt: prompt, aiText: aiText };
      setCurrentPromptArray((prevArray) => {
        const updatedArray = [...prevArray, newPromptEntry];
        setCurrentIndex(updatedArray.length - 1); // Set current index to the new entry
        return updatedArray;
      });

      setPromptValue("");
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate lesson plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    setPromptValue(e.target.value);
  }

  function handleEnterSubmit(e) {
    if (e.key === "Enter") {
      if (promptValue.length > 0) {
        generate(promptValue);
      } else {
        alert("Enter a non-empty input!");
      }
    }
  }

  function handleKeySubmit() {
    if (promptValue.length > 0) {
      generate(promptValue);
    } else {
      alert("Enter a non-empty input!");
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "letter",
      lineHeight: 1.5,
    });

    // Sets the uri that will be used in Preview page

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 20;

    // Basic markdown cleanup
    const plainText =
      "Your Prompt: **" +
      currentPromptArray[currentIndex].prompt +
      "** \n" +
      currentPromptArray[currentIndex].aiText.replace(/<br>/g, "\n").trim();

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

    const uri = doc.output("datauristring");
    setPdfDataUri(uri);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValue(currentPromptArray[currentIndex]?.aiText || "");
  };

  const handleChangeSave = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSaveSubmit = () => {
    setIsEditing(false);
    // Update the specific entry in the array
    setCurrentPromptArray((prevArray) => {
      const updatedArray = [...prevArray];
      if (currentIndex >= 0 && currentIndex < updatedArray.length) {
        updatedArray[currentIndex] = {
          ...updatedArray[currentIndex],
          aiText: editedValue,
        };
      }
      return updatedArray;
    });
    setGeneratedValue(editedValue); // Also update generatedValue for immediate display
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Revert editedValue to the current displayed value
    setEditedValue(currentPromptArray[currentIndex]?.aiText || "");
  };

  const handleForward = () => {
    if (!isEditing) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, currentPromptArray.length - 1)
      );
    }
  };

  const handleBack = () => {
    if (!isEditing) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Determine what content to display based on editing state and current index
  const displayedPrompt = currentPromptArray[currentIndex]?.prompt || "";
  const displayedAiText = isEditing
    ? editedValue
    : currentPromptArray[currentIndex]?.aiText || "";

  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-start justify-center select-none">
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
        {generatedValue && (
          <>
            <div className="flex justify-center items-center min-h-full">
              <div className="-translate-x-[30px] h-[600px]">
                <button
                  className="min-h-full hover:bg-gray-200 transition duration-200 rounded-4xl"
                  onClick={handleBack}
                >
                  <FaArrowCircleLeft
                    className="text-[60px] h-[600px] pl-[8px] pr-[8px] rounded-4xl"
                    disabled={currentIndex >= currentPromptArray.length - 1}
                  />
                </button>
              </div>
              <div
                className="text-[25px] font-normal min-w-full max-h-[600px] overflow-auto p-[25px]
          [&::-webkit-scrollbar]:w-2
          [&::-::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
              >
                <div className="font-bold pb-[20px]">
                  Your Prompt: {displayedPrompt}
                </div>

                {!isLoading ? (
                  <>
                    {isEditing ? (
                      <textarea
                        onChange={handleChangeSave}
                        className="min-w-[600px] h-[400px] overflow-auto p-[25px]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
                        value={editedValue}
                      ></textarea>
                    ) : (
                      <div>
                        <ReactMarkdown
                          remarkPlugins={[remarkBreaks]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {displayedAiText}
                        </ReactMarkdown>
                      </div>
                    )}
                    <div className="flex justify-center gap-4">
                      {!isEditing && (
                        <>
                          <button
                            className="translate-y-[20px] py-1 px-3 text-2xl font-light rounded-[8px] text-white bg-slate-700 hover:text-sky-300 transition duration-300 "
                            onClick={generatePDF}
                            disabled={!currentPromptArray.length} // Disable if no content
                          >
                            Generate PDF
                          </button>
                        </>
                      )}
                      <button
                        className="translate-y-[20px] py-1 px-3 text-2xl font-light rounded-[8px] text-white bg-slate-700 hover:text-sky-300 transition duration-300 "
                        onClick={!isEditing ? handleEdit : handleSaveSubmit}
                        disabled={!currentPromptArray.length && !isEditing} // Disable edit if no content, but allow save if editing
                      >
                        {!isEditing ? "Edit" : "Save"}
                      </button>
                      {isEditing && (
                        <button
                          className="translate-y-[20px] py-1 px-3 text-2xl font-light rounded-[8px] text-white bg-slate-700 hover:text-sky-300 transition duration-300 "
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[570px] text-center justify-center items-center">
                      <Typewriter
                        options={{
                          strings: "Loading...",
                          autoStart: true,
                          delay: "0",
                          loop: true,
                          cursor: "",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="ml-[20px] h-[600px]">
                <button className="min-h-full hover:bg-gray-200 transition duration-200 rounded-4xl">
                  <FaArrowCircleRight
                    onClick={handleForward}
                    className="text-[60px] h-[600px] pl-[8px] pr-[8px] rounded-4xl"
                    disabled={currentIndex <= 0}
                  />
                </button>
              </div>
            </div>
            <div className="min-w-full justify-center items-center font-semibold">
              {currentIndex + 1} / {currentPromptArray.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Generate;
