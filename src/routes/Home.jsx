import React from "react";
import Typewriter from "typewriter-effect";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-start pt-16 bg-gradient-to-b from-slate-100 to-blue-200">
        <h1 className="fade-in-text translate-y-[100px] sticky text-7xl bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent tracking-normal opacity-80 font-bold mb-30">
          Welcome to LessonPlan AI
        </h1>
        <div className="flex flex-col translate-y-2 max-w-4xl text-4xl gap-5 text-black font-semibold pt-12 px-4 text-center h-32">
          <Typewriter
            options={{
              strings:
                "At LessonPlan AI, we help you go from idea to print in seconds. Enter a prompt anything from “a 5th grade science lesson on photosynthesis” to “an ESL grammar warm-up” and let our AI do the rest. Generate. Preview. Print. Done.",
              autoStart: true,
              delay: 15,
              loop: false,
            }}
          />
        </div>
        <div
          id="features"
          className="fade-in-text mt-20 translate-y-[120px] text-4xl"
        >
          Features
        </div>
        <div id="images" className="grid grid-cols-2 gap-20 mt-50 px-4 ">
          {/* Card 1 */}
          <div className=" fade-in-text flex flex-col items-center justify-center p-6 bg-blue-100 rounded-2xl shadow-xl border border-gray-300 space-y-4 hover:shadow-3xl hover:scale-110 ease-in-out transition-shadow duration-1000">
            <img
              className="w-32 h-32 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="https://cdn-icons-png.flaticon.com/128/136/136522.png"
              alt="PDF icon"
            />
            <div className="font-bold text-2xl text-center leading-relaxed text-black">
              Support all of your lesson plans <br />
              within organized PDF documents
            </div>
          </div>

          {/* Card 2 */}
          <div className=" fade-in-text flex flex-col items-center justify-center p-6 bg-blue-100 rounded-2xl shadow-xl border border-gray-300 space-y-4 hover:shadow-3xl hover:scale-110 ease-in-out transition-shadow duration-1000">
            <img
              className="w-32 h-32 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="https://cdn-icons-png.flaticon.com/128/473/473695.png"
              alt="Edit icon"
            />
            <div className="font-bold text-2xl text-center leading-relaxed text-black">
              Easily edit and customize <br />
              lesson plans for your students
            </div>
          </div>

          {/* Card 3 */}
          <div className="fade-in-text flex flex-col items-center justify-center p-6 bg-blue-100 rounded-2xl shadow-xl border border-gray-300 space-y-4 hover:shadow-3xl hover:scale-110 ease-in-out transition-shadow duration-1000">
            <img
              className="w-32 h-32 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="https://cdn-icons-png.flaticon.com/128/839/839184.png"
              alt="Print icon"
            />
            <div className="font-bold text-2xl text-center leading-relaxed text-black">
              Instantly preview and print <br />
              high-quality materials
            </div>
          </div>

          {/* Card 4 */}
          <div className=" fade-in-text flex flex-col items-center justify-center p-6 bg-blue-100 rounded-2xl shadow-xl border border-gray-300 space-y-4 hover:shadow-3xl hover:scale-110 ease-in-out transition-shadow duration-1000">
            <img
              className="w-32 h-32 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="https://cdn-icons-png.flaticon.com/128/2784/2784459.png"
              alt="Speed icon"
            />
            <div className="font-bold text-2xl text-center leading-relaxed text-black">
              Save time and boost efficiency <br />
              with AI-powered generation
            </div>
          </div>
        </div>
        <div className="h-32"></div> {/* Spacer for footer */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
