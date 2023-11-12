import { useEffect, useState } from "react";
import PsDocument from "./PsDocument";
import RootDynamicDocument from "./../../../../assets/DynamicDocument.json";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function DynamicDocument({ DynamicAppChecklistDocument, setDynamicAppChecklistDocument, role, handleFileChange, gradientColor, dynamicImageFromDB, remarkText, setRemarkText
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const someEventHandler = (event, id, uploadId) => {
    const file = event?.target.files[0];
    selectedFiles[id] = file;
    handleFileChange(event, id, selectedFiles, "dynamic", uploadId);
  };

  const handleDynamicStatus = () => {
    toast.success("Clicked")
  }
  console.log({ DynamicAppChecklistDocument }, "DynamicAppChecklistDocument")


  const page = JSON.parse(localStorage?.getItem("page"));
  return (
    <div className="dark:text-black">
      {DynamicAppChecklistDocument?.map((document, index) => {
        const { id, question, requirements } = document;
        return (
          <div key={id} className="w-full px-2 py-5 rounded">
            <div className="text-[17px]">
              <p className="pb-4 font-bold">
                {id}. {question}
              </p>
              <div className="ml-6">
                {requirements?.map((RequireData, ind) => {
                  const { uploadId, requirement, approved, upload } =
                    RequireData || {};

                  const isMatch = dynamicImageFromDB?.find(
                    (eachFile, i) =>
                      eachFile?.id === id &&
                      eachFile?.uploadId === uploadId
                  );
                  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"];

                  const FindRemarkText = remarkText?.find((item) => {
                    if (item["dynamic"]) {
                      return (item["dynamic"].id === id) && (item["dynamic"].uploadId === uploadId)
                    }
                  });
                  const matchedText = FindRemarkText?.["dynamic"].value;

                  return (
                    <div key={uploadId} className="mb-8 ">
                      <div className="mb-3 font-bold">
                        <span className="font-bold">{letters[ind]}. </span>
                        {requirement}
                      </div>

                      {role === "LTP" && page === "draft" && (
                        <input
                          name={id}
                          type="file"
                          accept=".pdf, image/*"
                          onChange={(event) =>
                            someEventHandler(event, id, uploadId)
                          }
                          className="file-input file-input-bordered w-full max-w-xs text-gray-400 bg-white dark:text-black"
                        />
                      )}

                      {isMatch && (
                        <Link
                          to={`https://drive.google.com/file/d/${isMatch.imageId}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
                        >
                          View
                        </Link>
                      )}
                      {role === "PS" && (
                        <PsDocument
                          role={role}
                          id={id}
                          approved={approved}
                          uploadId={uploadId}
                          handleDynamicStatus={handleDynamicStatus}
                          type="dynamic"
                          setRemarkText={setRemarkText}
                          remarkText={matchedText}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DynamicDocument;
