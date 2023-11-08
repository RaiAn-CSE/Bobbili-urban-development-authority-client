import React from "react";

const DefaultDrawingFormat = () => {
  return (
    <div className="w-full h-full">
      <p className="text-black text-xl font-bold mt-10 text-center uppercase">
        Default Formats
      </p>
      <div className="flex justify-evenly items-center w-full min-h-[calc(100vh-70%)]">
        <button class="buttonDownload">Drawing Format PDF</button>

        <button class="buttonDownload">AutoCad Drawing</button>
      </div>
    </div>
  );
};

export default DefaultDrawingFormat;
