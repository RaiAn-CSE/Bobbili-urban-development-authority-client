import { useState } from "react";
import { Link } from "react-router-dom";
import getPostData from "../../../Shared/getPostData";
import toast from "react-hot-toast";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const btn =
    "btn btn-md text-xs px-4 md:text-sm md:px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    file && toast.success(`${file?.name} uploaded successfully!`)
    // Set File Uploaded Data
    setSelectedFiles({ ...selectedFiles, [eventId]: file });
  };
  const handleDrawing = () => {
    getPostData(selectedFiles);
  };

  // Sending data to Backend
  const handleBackendData = () => {
    const applicationId = JSON.parse(localStorage.getItem("applicationId"))
    getPostData({ applicationNo: applicationId, drawing: {}})
  }
  return (
    <div className="text-black h-screen p-5 mt-3">
      {/* AutoCAD Drawing */}
      <div className="flex items-center text-base px-2 space-y-2 mb-8">
        <p className="flex-1 pr-3">
          <span className="font-bold">1.</span> AutoCAD Drawing
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label className={`cursor-pointer bg-gray-300 border py-2 px-4 rounded-full 
          ${selectedFiles["AutoCAD Drawing"]?.name ? 'bg-green-500' : 'hover:shadow-md'}`}>
          
            {selectedFiles["AutoCAD Drawing"]?.name?"Uploaded":"Upload"}
            <input
              type="file"
              accept=".dwg, .zip, .pdf"
              onChange={(event) => handleFileChange(event, "AutoCAD Drawing")}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      {/* Drawing PDF */}
      <div className="flex items-center text-base px-2 space-y-2">
        <p className="flex-1 pr-3">
          <span className="font-bold">2.</span> Drawing PDF
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label className={`cursor-pointer bg-gray-300 border py-2 px-4 rounded-full 
          ${selectedFiles["Drawing PDF"]?.name ? 'bg-green-500' : 'hover:shadow-md'}`}>
               {selectedFiles["Drawing PDF"]?.name?"Uploaded":"Upload"}
            <input
              type="file"
              accept=".pdf, image/*"
              onChange={(event) => handleFileChange(event, "Drawing PDF")}
              style={{ display: "none" }}
            />
          </label>
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
