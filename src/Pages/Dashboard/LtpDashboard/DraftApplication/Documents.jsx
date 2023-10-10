import React, { useContext, useEffect, useState } from "react";
import DynamicDocuments from "../../../../assets/DynamicDocument.json";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import SaveData from "./SaveData";
import axios from "axios";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import DocumentFooter from "./DocumentFooter";
import DefaultDocument from "./DefaultDocument";
import DynamicDocument from "./DynamicDocument";
import PsDocument from "./PsDocument";

const DocumentUpload = () => {
  const [updatedDefaultDocument, setUpdatedDefaultDocument] = useState([]);
  const [imageId, setImageId] = useState([]);
  const [approvedConfirmation, setApprovedConfirmation] = useState("");
  const [recomendationMessage, setRecomendationMessage] = useState("");
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [PreviousDefaultDocumentData, setPreviousDefaultDocumentData] = useState([]);
  const [UpdatedDynamicDocumentData, setUpdatedDynamicDocumentData] = useState([]);
  const [sendingDocument, setSendingDocument] = useState([]);
  const {
    confirmAlert,
    sendUserDataIntoDB,
    getApplicationData,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const role = userInfoFromLocalStorage().role;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const handleFileChange = (event, id, uploadedFiles, type, uploadId) => {
    // Destructure variables from the event object
    const { files, name } = event.target;
    const file = files[0];
  
    if (file) {
      toast.success(`${file.name.slice(0, 20)}... Uploaded Successfully`);
    }
  
    // Create arrays to store dynamic and default data
    const dynamicData = [];
    const defaultData = [];
  
    // Create the object based on the type
    if (type === "dynamic") {
      dynamicData.push({ id, uploadId, file });
    } else {
      defaultData.push({ id, file });
    }
  
    console.log("Dynamic Data:", dynamicData);
    console.log("Default Data:", defaultData);
  
    // Depending on your use case, you might want to store these arrays in state or take further actions.
  };
  
  console.log(sendingDocument, "sending Document")
  // console.log(DefaultDocumentSelectedFiles,DynamicDocumentSelectedFiles,"Default&Dynamic")
  // Adding checklist Data to Document from server data && Updating Data from server Data
  useEffect(() => {
    const gettingData = async () => {
      let updatedDynamicDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      // setPreviousDefaultDocumentData(applicationData.documents);
      const PreviousDynamicDocuments = applicationData.documents;

      // Checklist "yes" Data integrating to Document
      if (applicationCheckList.length) {
        DynamicDocuments?.forEach((data, index) => {
          applicationCheckList.forEach((document) => {
            const condition01 = data.question === document.question;
            const condition02 = document.answer === "yes";
            if (condition01 && condition02) {
              updatedDynamicDocumentsToAdd.push(data);
            }
          });
        });
      }
      setUpdatedDynamicDocumentData(updatedDynamicDocumentsToAdd);
    };
    gettingData();
  }, []);


  // // send data to PS DB (Apu vai send PS data from here)
  // const sentPsDecision = async (url) => {
  //   // PS data select and send data
  //   const PSKeys = ["id", "approved"];
  //   const PSArray = updatedDefaultDocument?.map(({ ...obj }) =>
  //     PSKeys.reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
  //   );
  //   const PSData = {
  //     documentsObservation: { ...PSArray },
  //     approved: approvedConfirmation ?? "",
  //     message: recomendationMessage ?? "",
  //   };
  //   return await sendUserDataIntoDB(url, "PATCH", {
  //     applicationNo,
  //     psDocumentPageObservation: PSData,
  //   });
  // };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="text-black p-4"
      >
        <div className="w-full text-[17px] px-2 py-5 rounded">
          <DefaultDocument
            PreviousDefaultDocumentData={PreviousDefaultDocumentData}
            role={role}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
          // DefaultDocumentSelectedFiles={DefaultDocumentSelectedFiles}
          />
          <DynamicDocument
            role={role}
            UpdatedDynamicDocumentData={UpdatedDynamicDocumentData}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
          // DynamicDocumentSelectedFiles={DynamicDocumentSelectedFiles}

          />
        </div>
      </form>

      {role === "PS" ? (
        <DocumentFooter
          approvedConfirmation={approvedConfirmation}
          setApprovedConfirmation={setApprovedConfirmation}
          setRecomendationMessage={setRecomendationMessage}
        />
      ) : (
        ""
      )}

      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
      // collectInputFieldData={role === "LTP" ? handleFileUpload : sentPsDecision}
      />
    </div>
  );
};

export default DocumentUpload;
