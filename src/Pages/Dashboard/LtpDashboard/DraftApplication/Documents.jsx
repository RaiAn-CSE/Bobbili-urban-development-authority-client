import React, { useState } from "react";
import Documents from "../../../../assets/Documents.json";
import { Link } from "react-router-dom";
import getPostData from "../../../Shared/getPostData";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [UpdatedDocuments, setUpdatedDocuments] = useState([]);
  const btn =
    "btn btn-md text-sm bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

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

  const handleDocuments = () => {
    getPostData(UpdatedDocuments);
  };

  return (
    <div className="text-black p-4">
      <div className="space-y-8 lg:space-y-2">
        {Documents.Data.map((Question) => {
          const { id, question } = Question;

          return (
            <div key={id} className="px-2 lg:flex lg:items-center">
              <p className="pr-3 mt-8 text-sm md:text-base lg:flex-1">
                <span className="font-bold">{id}.</span> {question}
              </p>

              <div className="flex items-center mt-4 text-xs md:text-sm lg:mt-0 lg:w-[15%]">
                <label className="cursor-pointer font-bold bg-gray-300 py-2 px-4 rounded-full hover:shadow-md">
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

      <div className="lg:w-[91%] mt-16 flex justify-center md:justify-end">
        <Link
          onClick={() => handleDocuments()}
          to="/dashboard/draftApplication/drawing"
        >
          <button className={`${btn}`}>Save And Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default DocumentUpload;

// [{

//   draftApplication: [{ applicationNo: "", buildingInfo: {}, applicantInfo:{}, appChecklist:{}, documents: {}, drawing: {},payment:{} }]
// }
// ]
