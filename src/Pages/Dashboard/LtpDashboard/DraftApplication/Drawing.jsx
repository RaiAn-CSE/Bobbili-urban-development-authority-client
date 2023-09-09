import { useState } from "react";
import { Link } from "react-router-dom";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    // Set File Uploaded Data
    setSelectedFiles({ ...selectedFiles, [eventId]: file });
  };

  return (
    <div className="text-white h-screen p-5">
      {/* AutoCAD Drawing */}
      <div className="md:flex items-center px-2 space-y-2 mb-8">
        <p className="md:flex-1 pr-3">1. AutoCAD Drawing</p>
        <div className="md:w-[20%] flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 py-2 px-4 rounded-full">
            Upload <input type="file" accept=".dwg, .zip, .pdf" onChange={(event) => handleFileChange(event, 1)} style={{ display: "none" }} />
          </label>
          {selectedFiles[1] && <p>{selectedFiles[1].name}</p>}
        </div>
      </div>
      
      {/* Drawing PDF */}
      <div className="md:flex items-center px-2 space-y-2">
        <p className="md:flex-1 pr-3">2. Drawing PDF</p>
        <div className="md:w-[20%] flex items-center space-x-1 text-sm">
          <label className="cursor-pointer bg-gray-300 py-2 px-4 rounded-full">
            Upload <input type="file" accept=".pdf, image/*" onChange={(event) => handleFileChange(event, 2)} style={{ display: "none" }} />
          </label>
          {selectedFiles[2] && <p>{selectedFiles[2].name}</p>}
        </div>
      </div>

    <div className="mt-8">
    <Link to="/dashboard/draftApplication/payment">
        <button class="btn">Save And Continue</button>
      </Link>
    </div>
    </div>
  );
};

export default Drawing;
