import { useState } from "react";
import { Link } from "react-router-dom";
import getPostData from "../../../Shared/getPostData";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const btn = "btn px-10 bg-Primary transition duration-700 hover:bg-btnHover";

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    // Set File Uploaded Data
    setSelectedFiles({ ...selectedFiles, [eventId]: file });
  };
  const handleDrawing = () => {
    getPostData(selectedFiles)
  }

  return (
    <div className="text-black h-screen p-5 mt-[5%] md:w-[90%]">

      {/* AutoCAD Drawing */}
      <div className="flex items-center px-2 space-y-2 mb-8">
        <p className="flex-1 pr-3">1. AutoCAD Drawing</p>
        <div className=" flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 py-2 px-4 rounded-full">
            Upload <input type="file" accept=".dwg, .zip, .pdf" onChange={(event) => handleFileChange(event, "AutoCAD Drawing")} style={{ display: "none" }} />
          </label>
          {selectedFiles[1] && <p>{selectedFiles[1].name}</p>}
        </div>
      </div>

      {/* Drawing PDF */}
      <div className="flex items-center px-2 space-y-2">
        <p className="flex-1 pr-3">2. Drawing PDF</p>
        <div className="flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 py-2 px-4 rounded-full">
            Upload <input type="file" accept=".pdf, image/*" onChange={(event) => handleFileChange(event, "Drawing PDF")} style={{ display: "none" }} />
          </label>
          {selectedFiles[2] && <p>{selectedFiles[2].name}</p>}
        </div>
      </div>

      <div className="mt-16 flex justify-end">
        <Link onClick={() => handleDrawing()} to="/dashboard/draftApplication/payment">
          <button className={`${btn}`}>Save And Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default Drawing;
