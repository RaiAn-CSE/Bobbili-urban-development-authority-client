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
  const [ltpSendingDocument, setLtpSendingDocument] = useState({ dynamic: [], default: [] });
  const [psSendingDocument, setPsSendingDocument] = useState({ dynamic: [], default: [] });
  const [DefaultData, setDefaultData] = useState([]);
  const [DynamicData, setDynamicData] = useState([]);
  const [statusDefaultData, setStatusDefaultData] = useState([]);
  const [statusDynamicData, setStatusDynamicData] = useState([]);
  const { confirmAlert, sendUserDataIntoDB, getApplicationData, userInfoFromLocalStorage } = useContext(AuthContext);


  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const role = userInfoFromLocalStorage().role;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const handleFileChange = (event, id, uploadedFile, type, uploadId) => {
    const { files, name } = event.target;
    const file = files[0];

    if (file) {
      toast.success(`${file.name.slice(0, 20)}... Uploaded Successfully`);
    }

    if (type === "dynamic") {
      const data = { id, uploadId, file };
      setDynamicData((prev) => [...prev, data]);
    } else {
      const data = { id, file };
      setDefaultData((prev) => [...prev, data]);
    }
  };

  useEffect(() => {
    setLtpSendingDocument({ default: DefaultData, dynamic: DynamicData });
  }, [DefaultData, DynamicData]);

  const handleStatus = (event, id, uploadId, type) => {
    if (type === "dynamic") {
      const matchedIndex = statusDynamicData.findIndex((data) => data.id === id);
  
      if (matchedIndex !== -1) {
        // If a matching ID is found, update it
        const updatedData = { ...statusDynamicData[matchedIndex], event };
        statusDynamicData[matchedIndex] = updatedData;
        setStatusDynamicData([...statusDynamicData]);
      } else {
        // If no match is found, add a new entry
        const data = { id, uploadId, event };
        setStatusDynamicData((prev) => [...prev, data]);
      }
    } else {
      const data = { id, event };
      setStatusDefaultData((prev) => [...prev, data]);
    }
    console.log({ id, event, uploadId });
  };
  

  console.log({ default: statusDefaultData, dynamic: statusDynamicData }, "Approved Data")

  const handleRecomendationMessage = (e) => {
    const RecomdMessage = e.target.value;
    setRecomendationMessage(RecomdMessage);
  };
  const handleConfirmation = (data) => {
    setApprovedConfirmation(data);
  };

  useEffect(() => {
    setPsSendingDocument({ default: statusDefaultData, dynamic: statusDynamicData });
  }, [statusDefaultData, statusDynamicData]);


  // Adding checklist Data to Document from server data && Updating Data from server Data
  useEffect(() => {
    const gettingData = async () => {
      let updatedDynamicDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      setPreviousDefaultDocumentData(applicationData.documents?.default);
      const PreviousDynamicDocument = applicationData.documents?.dynamic;

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

  const handleFileUpload = () => { };

  // send data to PS DB (Apu vai send PS data from here)
  const selectedData = role == "PS" ? psSendingDocument : ltpSendingDocument;
  console.log(selectedData, "selectedData")
  const sentPsDecision = async (url) => {
    const PSData = {
      data: selectedData,
      approved: approvedConfirmation ?? "",
      message: recomendationMessage ?? "",
    };
    console.log(PSData, "PSData")
    return await sendUserDataIntoDB(url, "PATCH", { PSData });
  };

  return (
    <div className="dark:text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="text-black p-4 font-roboto dark:text-gray-100"
      >
        <div className="w-full text-[17px] px-2 py-5 rounded">
          <DefaultDocument
            PreviousDefaultDocumentData={PreviousDefaultDocumentData}
            role={role}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
            setApprovedConfirmation={setApprovedConfirmation}
            handleStatus={handleStatus}
          // DefaultDocumentSelectedFiles={DefaultDocumentSelectedFiles}
          />
          <DynamicDocument
            role={role}
            UpdatedDynamicDocumentData={UpdatedDynamicDocumentData}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
            setApprovedConfirmation={setApprovedConfirmation}
            handleStatus={handleStatus}
          // DynamicDocumentSelectedFiles={DynamicDocumentSelectedFiles}
          />
        </div>
      </form>

      {role === "PS" ? (
        <DocumentFooter
          approvedConfirmation={approvedConfirmation}
          setApprovedConfirmation={setApprovedConfirmation}
          setRecomendationMessage={setRecomendationMessage}
          handleRecomendationMessage={handleRecomendationMessage}
          handleConfirmation={handleConfirmation}
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
        collectInputFieldData={
          role === "LTP" ? handleFileUpload : sentPsDecision
        }
      />
    </div>
  );
};

export default DocumentUpload;
