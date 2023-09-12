import { useState } from "react";
import { Link } from "react-router-dom";
import getPostData from "../../../Shared/getPostData";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const btn =
    "btn btn-md text-xs px-4 md:text-sm md:px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    // Set File Uploaded Data
    setSelectedFiles({ ...selectedFiles, [eventId]: file });
  };
  const handleDrawing = () => {
    getPostData(selectedFiles);
  };

  return (
    <div className="text-black h-screen p-5 mt-3">
      {/* AutoCAD Drawing */}
      <div className="flex items-center text-base px-2 space-y-2 mb-8">
        <p className="flex-1 pr-3">
          <span className="font-bold">1.</span> AutoCAD Drawing
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 border py-2 px-4 rounded-full hover:shadow-md">
            Upload{" "}
            <input
              type="file"
              accept=".dwg, .zip, .pdf"
              onChange={(event) => handleFileChange(event, "AutoCAD Drawing")}
              style={{ display: "none" }}
            />
          </label>
          {selectedFiles["AutoCAD Drawing"] && (
            <p className="overflow-hidden ml-1">{selectedFiles["AutoCAD Drawing"].name}</p>
          )}
        </div>
      </div>

      {/* Drawing PDF */}
      <div className="flex items-center text-base px-2 space-y-2">
        <p className="flex-1 pr-3">
          <span className="font-bold">2.</span> Drawing PDF
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 py-2 px-4 rounded-full hover:shadow-md">
            Upload{" "}
            <input
              type="file"
              accept=".pdf, image/*"
              onChange={(event) => handleFileChange(event, "Drawing PDF")}
              style={{ display: "none" }}
            />
          </label>
          {selectedFiles["Drawing PDF"] && (
            <p className="overflow-hidden ml-1">{selectedFiles["Drawing PDF"].name}</p>
          )}
        </div>
      </div>

      {/* <div className="mt-16 flex justify-center md:justify-end">
        <Link
          onClick={() => handleDrawing()}
          to="/dashboard/draftApplication/payment"
        >
          <button className={`${btn}`}>Save And Continue</button>
        </Link>
      </div> */}
    </div>
  );
};

export default Drawing;
