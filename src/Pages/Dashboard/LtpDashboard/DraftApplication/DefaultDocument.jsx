import { useEffect, useState } from "react";
import DefaultDocumentData from "../../../../assets/DefaultDocument.json";
import PsDocument from "./PsDocument";
import { Link } from "react-router-dom";

function DefaultDocument({ PreviousDefaultDocumentData, clickedDefaultRadio, role, handleFileChange, gradientColor, handleStatus, defaultImageFromDB }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UpdatedDefaultData, setUpdatedDefaultData] = useState([]);

  // console.log(PreviousDefaultDocumentData, "PreviousDefaultDocumentData from Default Components")

  let combinedData = [...(PreviousDefaultDocumentData || []), ...(clickedDefaultRadio || [])];

  // Create a Map to ensure unique items based on id
  const uniqueDataMap = new Map();
  combinedData.forEach(item => {
    // Prioritize clickedDefaultRadio data over PreviousDefaultDocumentData
    if (!uniqueDataMap.has(item.id)) {
      uniqueDataMap.set(item.id, item);
    }
  });
  combinedData = Array.from(uniqueDataMap.values());

  const someEventHandler = (event, id) => {
    const file = event?.target.files[0];
    selectedFiles[id] = file;
    handleFileChange(event, id, selectedFiles, "default");
  };

  // console.log(defaultImageFromDB, "DEFAULT IMAGE FROM DB");
  return (
    <div className="dark:text-black">
      {DefaultDocumentData?.map((data, index) => {
        let { id, question, approved, upload } = data;
        const matched = combinedData.find(items => {
          if (items.id == id) {
            return items.approved
          }
        })
        approved = matched?.approved
        console.log(approved)
        const isMatch = defaultImageFromDB?.find(
          (eachFile, i) => eachFile.id === id
        );
        return (
          <div key={id} className="w-full px-2 py-5 rounded mb-8">
            <p className="pb-4 font-bold">
              {id}. {question}
            </p>
            {role === "LTP" && (
              <input
                name={id}
                type="file"
                accept=".pdf, image/*"
                onChange={(event) => someEventHandler(event, id)}
                className="file-input file-input-bordered w-full max-w-xs bg-white border border-gray-300"
              />
            )}
            {isMatch && (
              <Link
                to={`https://drive.google.com/file/d/${isMatch?.imageId}/view?usp=sharing`}
                target="_blank"
                className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
              >
                View
              </Link>
            )}
            <PsDocument
              role={role}
              id={id}
              approved={approved}
              handleStatus={handleStatus}
              clickedDefaultRadio={clickedDefaultRadio}
              type="default"
            />
          </div>
        );
      })}
    </div>
  );
}

export default DefaultDocument;
