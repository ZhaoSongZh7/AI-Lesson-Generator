import React from "react";
import Typewriter from "typewriter-effect";

const Preview = ({ pdfDataUri, setPdfDataUri }) => {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
      <div className="flex flex-col items-center max-w-3xl gap-5 font-semibold text-3xl">
        <Typewriter
          options={{
            strings: "Preview",
            autoStart: true,
            delay: "50",
            loop: false,
            cursor: "_",
          }}
        />
        {pdfDataUri && (
          <iframe
            title="Generated PDF"
            src={pdfDataUri}
            width="1000"
            height="600"
          />
        )}
      </div>
    </div>
  );
};

export default Preview;
