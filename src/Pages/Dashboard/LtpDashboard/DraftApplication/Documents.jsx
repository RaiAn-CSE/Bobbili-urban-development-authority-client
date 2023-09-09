import React, { useState } from "react";
import Documents from "../../../../assets/Documents.json";
import { Link } from "react-router-dom";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [UpdatedDocuments, setUpdatedDocuments] = useState([]);

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];

    // Update selectedFiles object with the selected file for the specific question ID.
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [eventId]: file,
    }));

    // Update UpdatedDocuments with the selected file for the specific question ID.
    const updatedData = Documents.Data.map((Question) => {
      const { id, question, upload } = Question;
      return { id, question, upload: eventId === id ? file : upload };
    });
    // localStorage.setItem("documents",JSON.stringify(updatedData));
    setUpdatedDocuments(updatedData);
  };

  return (
    <div className="text-white p-4 ">
      <div className="space-y-8 lg:space-y-2">
        {Documents.Data.map((Question) => {
          const { id, question } = Question;

          return (
            <div key={id} className="lg:flex items-center px-2 space-y-2">
              <p className="lg:flex-1 pr-3">{id}. {question}</p>

              <div className="lg:w-[20%] flex items-center space-x-1 text-sm">
                <label className="cursor-pointer bg-gray-800 py-2 px-4 rounded-full">
                  Upload
                  <input
                    name={id}
                    type="file"
                    accept=".pdf, image/*"
                    onChange={(event) => handleFileChange(event, id)}
                    style={{ display: "none" }}
                  />
                </label>
                {selectedFiles[id] && <p>{selectedFiles[id].name}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <Link to="/dashboard/draftApplication/drawing">
          <button className="btn">Save And Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default DocumentUpload;
