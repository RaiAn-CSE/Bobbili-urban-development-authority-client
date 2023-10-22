import { useEffect, useState } from "react";
import PsDocument from "./PsDocument";
import RootDynamicDocument from "./../../../../assets/DynamicDocument.json"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function DynamicDocument({ PreviousDynamicDocumentData, setDynamicAppChecklistDocument, DynamicAppChecklistDocument, role, handleFileChange, gradientColor, dynamicImageFromDB,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [combinedDynamicAppChecklistDocument, setCombinedDynamicAppChecklistDocument] = useState(DynamicAppChecklistDocument);

  const someEventHandler = (event, id, uploadId) => {
    const file = event?.target.files[0];
    selectedFiles[id] = file;
    handleFileChange(event, id, selectedFiles, "dynamic", uploadId);
  };
  useEffect(() => {
    const combinedRootDocument = RootDynamicDocument.map(mainItem => {
      const matchedIdData = PreviousDynamicDocumentData?.filter(data => data.id === mainItem.id);
      // console.log(mainItem.id, mainItem.requirements, "Each MainItems Requirement")
      const matchedUploadIdData = PreviousDynamicDocumentData?.filter(data => {
        if (data.id === mainItem.id) {
          const matchingRequirement = mainItem.requirements.find(MainReqData => MainReqData.uploadId === data.uploadId);
          if (matchingRequirement) {
            data.requirement = matchingRequirement.requirement;
            return true;
          }
        }
        return false;
      });
      if (matchedIdData?.length > 0) {
        return {
          id: mainItem.id,
          question: mainItem.question,
          requirements: matchedUploadIdData.sort((a, b) => a.uploadId - b.uploadId)
        };
      }
    });
    // Update the state with the new data
    // Assuming you have a state variable like setDynamicAppChecklistDocument
    setCombinedDynamicAppChecklistDocument(combinedRootDocument?.filter(finalData => finalData));
    setDynamicAppChecklistDocument(combinedRootDocument?.filter(finalData => finalData))
  }, [PreviousDynamicDocumentData]);


  const handleDynamicStatus = (data) => {
    const updatedRequirements = combinedDynamicAppChecklistDocument.map(mainItem => {

      const matchedUpload = mainItem.requirements.find(reqItem => mainItem.id == data.id && reqItem.uploadId == data.uploadId);
      const unmatchedUploads = mainItem.requirements.filter(reqItem => mainItem.id == data.id && reqItem.uploadId !== data.uploadId);

      if (matchedUpload) {
        const updated = { ...matchedUpload, approved: data.approved };

        const updatedSortingRequirements = [...(unmatchedUploads || []), updated].sort((a, b) => parseInt(a.uploadId) - parseInt(b.uploadId));

        return {
          ...mainItem,
          requirements: updatedSortingRequirements
        };
      } else {
        return mainItem;
      }
    });

    toast.success(`Clicked Radio ${data.uploadId}`);
    console.log(updatedRequirements, "Updated Requirements");

    // Update the state with the new requirements
    setCombinedDynamicAppChecklistDocument(updatedRequirements);
    setDynamicAppChecklistDocument(updatedRequirements)
  };

  useEffect(() => {
    // Your previous useEffect dependencies here
  }, [combinedDynamicAppChecklistDocument]);

  console.log(PreviousDynamicDocumentData, combinedDynamicAppChecklistDocument, "Dyamic Document && combined Document")

  return (
    <div className="dark:text-black">
      {combinedDynamicAppChecklistDocument?.map((document, index) => {
        const { id, question, requirements } = document || {};
        // console.log(document, "From Dynamic")
        return (
          <div key={id} className="w-full px-2 py-5 rounded">
            <div className="text-[17px]">
              <p className="pb-4 font-bold">
                {index + 9}. {question}
              </p>
              <div className="ml-6">
                {requirements?.map((RequireData, ind) => {
                  const { uploadId, requirement, approved, upload } =
                    RequireData || {};

                  const isMatch = dynamicImageFromDB?.find(
                    (eachFile, i) =>
                      eachFile?.id === index + 9 &&
                      eachFile?.uploadId === uploadId
                  );
                  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"];
                  return (
                    <div key={ind + 1} className="mb-8 ">
                      <div className="mb-3">
                        <span className="font-bold">{letters[ind]}. </span>
                        {requirement}
                      </div>

                      {role === "LTP" && (
                        <input
                          name={id}
                          type="file"
                          accept=".pdf, image/*"
                          onChange={(event) =>
                            someEventHandler(event, id, uploadId)
                          }
                          className="file-input file-input-bordered w-full max-w-xs text-gray-400"
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
                      <PsDocument
                        role={role}
                        id={id}
                        approved={approved}
                        uploadId={uploadId}
                        handleDynamicStatus={handleDynamicStatus}
                        type="dynamic"
                      />
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
