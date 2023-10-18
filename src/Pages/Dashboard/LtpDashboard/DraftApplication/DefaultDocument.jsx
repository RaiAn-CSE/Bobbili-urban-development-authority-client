import { useEffect, useState } from "react";
import DefaultDocumentData from "../../../../assets/DefaultDocument.json";
import PsDocument from "./PsDocument";
import { Link } from "react-router-dom";

function DefaultDocument({ PreviousDefaultDocumentData, clickedDefaultRadio, role, handleFileChange, gradientColor, handleStatus, defaultImageFromDB }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UpdatedDefaultData, setUpdatedDefaultData] = useState(DefaultDocumentData);

  let  updatedDataCopy=[...UpdatedDefaultData];
  useEffect(() => {
    // Create a copy of the current UpdatedDefaultData
    

    DefaultDocumentData.forEach(item => {
      const matched = clickedDefaultRadio?.find(clickedItem => clickedItem.id === item.id);
      if (matched) {
        item.approved = matched.approved;
      }
      updatedDataCopy.push(item);
    });
  }, [DefaultDocumentData, clickedDefaultRadio]);



  const someEventHandler = (event, id) => {
    const file = event?.target.files[0];
    selectedFiles[id] = file;
    handleFileChange(event, id, selectedFiles, "default");
  };

  return (
    <div className="dark:text-black">
      {updatedDataCopy.map((data, index) => {
        let { id, question, approved, upload } = data;

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
