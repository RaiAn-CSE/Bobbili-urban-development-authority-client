import { useState } from "react";
import PsDocument from "./PsDocument";

function DynamicDocument({ UpdatedDynamicDocumentData, role, handleFileChange, gradientColor }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const someEventHandler = (event, id, uploadId) => {
    const file = event?.target.files[0];
    selectedFiles[id] = file;
    handleFileChange(event, id, selectedFiles, "dynamic", uploadId);
  };
  
  return (
    <div>
      {UpdatedDynamicDocumentData?.map((document, index) => {
        const { id, question, requirements } = document;
        return (
          <div key={id} className="w-full px-2 py-5 rounded">
            <div className="text-[17px]">
              <p className="pb-4 font-bold">{index + 9}. {question}</p>
              <div className="ml-6">
                {requirements?.map((RequireData, ind) => {
                  const { uploadId, requirement, upload, approved, } = RequireData;
                  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
                  return (
                    <div key={ind + 1} className="mb-8">
                      <div className="mb-3">
                        <span className="font-bold">{letters[ind]}. </span>{requirement}
                      </div>
                      {role === "LTP" && (
                        <input
                          name={id}
                          type="file"
                          accept=".pdf, image/*"
                          onChange={(event) => someEventHandler(event, id, uploadId)}
                          className="file-input file-input-bordered w-full max-w-xs"
                        />
                      )}

                      {RequireData.upload !== "" && (
                        <a
                          href={`https://drive.google.com/file/d/${RequireData.upload}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
                        >
                          View
                        </a>
                      )}
                      <PsDocument role={role} />
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
