import React, { useContext, useEffect, useState } from "react";
import Documents from "../../../../assets/Documents.json";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import SaveData from "./SaveData";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [UpdatedDocuments, setUpdatedDocuments] = useState(Documents.Data);
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } = useContext(AuthContext);

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    file && toast.success(`${file?.name.slice(0,20)}... uploaded successfully!`);
    // Update selectedFiles object with the selected file for the specific question ID.
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [eventId]: file,
    }));

    // Update UpdatedDocuments with the selected file for the specific question ID.
    const updatedData = UpdatedDocuments.map((Question) => {
      const { id, question, upload } = Question;
      return { id, question, upload: eventId === id ? file : upload };
    });

    setUpdatedDocuments(updatedData);
  };
  console.log(UpdatedDocuments, "UpdatesDocuments");

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  useEffect(() => {

    const gettingData = async () => {
      let updatedDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      if (applicationCheckList.length) {
        // Declare the array here
        applicationCheckList.forEach((data, index) => {
          const already=UpdatedDocuments.find(document=>document.question===data.question)
            if(already){
              return null;
            }
          if (index >= 8 && data.answer === "yes") {
            updatedDocumentsToAdd.push({ id: UpdatedDocuments.length + updatedDocumentsToAdd.length + 1, question: data.question, upload: "" });
          }
        });
      }
      setUpdatedDocuments([...UpdatedDocuments, ...updatedDocumentsToAdd]);
    };

    gettingData();
  }, []);

  console.log(UpdatedDocuments, "updatedDocuments")
  // Sending data to Backend
  const sendDocumentsData = async (url) => {
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
      documents: UpdatedDocuments,
    });
  };

  return (
    <div className="text-black p-4">
      <div className="space-y-8 lg:space-y-5">
        {UpdatedDocuments.map((Question) => {
          const { id, question } = Question;
          return (
            <div
              key={id}
              className="w-full px-2 lg:flex items-center space-y-3 lg:space-y-0"
            >
              <p className="flex-1">
                {id}. {question}
              </p>

              <div className="flex items-center">
                <label
                  className={`cursor-pointer bg-gray-300 py-2 px-4 rounded-full ${selectedFiles[id]?.name ? "bg-green-500" : "hover:shadow-md"
                    }`}
                >
                  {selectedFiles[id]?.name ? "Uploaded" : "Upload"}
                  <input
                    name={id}
                    type="file"
                    accept=".pdf, image/*"
                    onChange={(event) => handleFileChange(event, id)}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* save & continue  */}
      {/* navigation button  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={sendDocumentsData}
      />
    </div>
  );
};

export default DocumentUpload;
