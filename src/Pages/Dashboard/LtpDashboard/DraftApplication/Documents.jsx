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
  const [imageId, setImageId] = useState({});
  const [approvedConfirmation, setApprovedConfirmation] = useState("");
  const [recomendationMessage, setRecomendationMessage] = useState("");
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [PreviousDefaultDocumentData, setPreviousDefaultDocumentData] =
    useState([]);
  const [PreviousDynamicDocumentData, setPreviousDynamicDocumentData] =
    useState([]);
  const [UpdatedDynamicDocumentData, setUpdatedDynamicDocumentData] = useState(
    []
  );
  const [ltpSendingDocument, setLtpSendingDocument] = useState({
    dynamic: [],
    default: [],
  });
  const [psSendingDocument, setPsSendingDocument] = useState({
    dynamic: [],
    default: [],
  });

  const [statusDefaultData, setStatusDefaultData] = useState([]);
  const [statusDynamicData, setStatusDynamicData] = useState([]);
  const [sendingDocument, setSendingDocument] = useState({
    dynamic: [],
    default: [],
  });
  const [defaultData, setDefaultData] = useState([]);
  const [dynamicData, setDynamicData] = useState([]);
  const {
    confirmAlert,
    sendUserDataIntoDB,
    getApplicationData,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const role = userInfoFromLocalStorage().role;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const [defaultImageData, setDefaultImageData] = useState([]);
  const [dynamicImageData, setDynamicImageData] = useState([]);
  const [sendingImageId, setSendingImageId] = useState({
    dynamic: [],
    default: [],
  });

  const [imageIdFromDB, setImageIdFromDB] = useState({
    default: [],
    dynamic: [],
  });

  // Ltp File uploading Data handeling
  const handleFileChange = (event, id, uploadedFile, type, uploadId) => {
    const { files, name } = event.target;
    const file = files[0];

    if (file) {
      toast.success(`${file.name.slice(0, 20)}... Uploaded Successfully`);
    }

    if (type === "dynamic") {
      const data = { id, uploadId, file };
      setDynamicData((prev) => [...prev, data]);
      const dynamicImage = { id, uploadId, imageId: "" };
      setDynamicImageData((prev) => [...prev, dynamicImage]);
    } else {
      const data = { id, file };
      setDefaultData((prev) => [...prev, data]);
      const defaultImage = { id, imageId: "" };
      setDefaultImageData((prev) => [...prev, defaultImage]);
    }
  };

  // LTP Sending Document Updating when handleChange
  useEffect(() => {
    setSendingDocument({ default: defaultData, dynamic: dynamicData });
    setSendingImageId({ default: defaultImageData, dynamic: dynamicImageData });
    console.log(sendingDocument, "Sending Document");
    console.log(sendingImageId, "Sending  image Document");
    // setLtpSendingDocument({ default: defaultData, dynamic: de });
  }, [defaultData, dynamicData, defaultImageData, dynamicImageData]);

  // PS Approved and Shortfall Data handeling
  const handleStatus = (event, id, uploadId, type) => {
    if (type === "dynamic") {
      const dynamicMatchedIndex = statusDynamicData.findIndex(
        (data) => data.id == id
      );

      if (dynamicMatchedIndex !== -1) {
        // If a matching ID is found in dynamic data, updated it
        const updatedData = {
          ...statusDynamicData[dynamicMatchedIndex],
          event,
        };
        statusDynamicData[dynamicMatchedIndex] = updatedData;
        setStatusDynamicData([...statusDynamicData]);
      } else {
        // If no match is found in dynamic data, added a new entry
        const data = { id, uploadId, event };
        setStatusDynamicData((prev) => [...prev, data]);
      }
    } else {
      const defaultMatchedIndex = statusDefaultData.findIndex(
        (data) => data.id == id
      );

      if (defaultMatchedIndex !== -1) {
        // If a matching ID is found in default data, updated it
        const updatedData = {
          ...statusDefaultData[defaultMatchedIndex],
          event,
        };
        statusDefaultData[defaultMatchedIndex] = updatedData;
        setStatusDefaultData([...statusDefaultData]);
      } else {
        // If no match is found in default data, added a new entry
        const data = { id, event };
        setStatusDefaultData((prev) => [...prev, data]);
      }
    }
    console.log({ id, event, uploadId });
  };
  // PS Sending Document Updating when handleChange
  useEffect(() => {
    setPsSendingDocument({
      default: statusDefaultData,
      dynamic: statusDynamicData,
    });
  }, [statusDefaultData, statusDynamicData]);

  // PS Page Recomendation Message and Approved
  const handleRecomendationMessage = (e) => {
    const RecomdMessage = e.target.value;
    setRecomendationMessage(RecomdMessage);
  };
  const handleConfirmation = (data) => {
    setApprovedConfirmation(data);
  };

  // Adding checklist Data to Document from server data && Updating Data from server Data
  useEffect(() => {
    const gettingData = async () => {
      let updatedDynamicDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);

      console.log(applicationData, "Application Data");
      const applicationCheckList = applicationData.applicationCheckList;
      // setPreviousDefaultDocumentData(applicationData.documents?.default);
      // const PreviousDynamicDocument = applicationData.documents?.dynamic;
      setPreviousDefaultDocumentData(
        applicationData?.documents?.psData?.data?.default
      );
      setPreviousDynamicDocumentData(
        applicationData?.documents?.psData?.data?.dynamic
      );
      setApprovedConfirmation(applicationData?.documents?.psData?.approved);
      setRecomendationMessage(applicationData?.documents?.psData?.message);

      // Checklist "yes" Data integrating to Document
      if (applicationCheckList.length) {
        const documents = applicationData?.documents;
        console.log(documents, "Documents");
        setImageIdFromDB({ ...documents });
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
      console.log(
        applicationData,
        updatedDynamicDocumentsToAdd,
        "UpdatedDynamicData"
      );
    };
    gettingData();
  }, []);

  console.log(sendingDocument, "sending document");

  // file send into the database
  const handleFileUpload = async (url) => {
    // append data to formData so that the file data can be sent into the database
    let fileCheckToUpload = 0;

    const defaultImages = sendingDocument?.default;
    const dynamicImages = sendingDocument?.dynamic;

    const loopTimes = [defaultImages, dynamicImages];

    console.log(loopTimes, "LOOP TIMES");

    console.log(defaultImages, dynamicImages, "ALL files");

    for (let lt = 0; lt < loopTimes.length; lt++) {
      // another loop
      console.log(loopTimes[lt].length, "LOOP LENGTH");
      for (let i = 0; i < loopTimes[lt].length; i++) {
        console.log(loopTimes[lt][i].file, "File CHECK");

        const formData = new FormData();

        formData.append("file", loopTimes[lt][i].file);
        try {
          const response = await axios.post(
            "http://localhost:5000/upload?page=document",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
            }
          );
          // Handle success or display a success message to the user
          if (response?.data.msg === "Successfully uploaded") {
            const documentImageId = response?.data?.fileId;

            if (lt === 0) {
              // console.log(sendingImageId.default[i].imageId, "File");
              sendingImageId.default[i].imageId = documentImageId;
            } else if (lt === 1) {
              // console.log(sendingImageId.dynamic[i].imageId, "File");
              sendingImageId.dynamic[i].imageId = documentImageId;
            }
          }
        } catch (error) {
          console.log(error, "ERROR");
          // Handle errors, e.g., show an error message to the user
          toast.error("Error to upload documents");
        }
      }

      fileCheckToUpload++;
    }

    console.log(sendingImageId, "Sending Image id");

    if (fileCheckToUpload === loopTimes.length) {
      console.log({
        default: [...imageIdFromDB?.default, ...sendingImageId?.default],
        dynamic: [...imageIdFromDB?.dynamic, ...sendingImageId?.dynamic],
      });

      const documents = {
        default: [],
        dynamic: [],
      };

      const sendingDefault = sendingImageId?.default;
      const dbDefault = imageIdFromDB?.default;

      if (sendingDefault?.length) {
        sendingDefault?.forEach((sendImg, sendIndx) => {
          dbDefault?.forEach((dbImg, dbIndx) => {
            if (dbImg.id === sendImg.id) {
              // delete dbDefault[dbIndx];
              dbDefault.splice(dbIndx, 1);
            }
          });
        });

        documents.default = [...dbDefault, ...sendingDefault];
      } else {
        documents.default = [...dbDefault];
      }

      const sendingDynamic = sendingImageId?.dynamic;
      const dbDynamic = imageIdFromDB?.dynamic;
      if (sendingDynamic?.length) {
        sendingDynamic?.forEach((sendImg, sendIndx) => {
          dbDynamic?.forEach((dbImg, dbIndx) => {
            if (
              dbImg.id === sendImg.id &&
              dbImg.uploadId === sendImg.uploadId
            ) {
              // delete dbDynamic[dbIndx];
              dbDynamic.splice(dbIndx, 1);
            }
          });
        });

        documents.dynamic = [...dbDynamic, ...sendingDynamic];
      } else {
        documents.dynamic = [...dbDynamic];
      }

      console.log(documents, "Documents");

      return await sendUserDataIntoDB(url, "PATCH", {
        applicationNo,
        documents,
        approved: approvedConfirmation,
        message: recomendationMessage,
      });
    }
  };

  console.log(imageIdFromDB, "IMAGE ID FROM DB");

  // send data to PS DB
  const selectedData = role == "PS" ? psSendingDocument : ltpSendingDocument;

  const sentPsDecision = async (url) => {
    const PSData = {
      data: selectedData,
      approved: approvedConfirmation ?? "",
      message: recomendationMessage ?? "",
    };

    return await sendUserDataIntoDB(url, "PATCH", {
      psDocumentPageObservation: PSData,
    });
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
            role={role}
            PreviousDefaultDocumentData={PreviousDefaultDocumentData}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
            defaultImageFromDB={imageIdFromDB?.default}
            // DefaultDocumentSelectedFiles={DefaultDocumentSelectedFiles}
            setApprovedConfirmation={setApprovedConfirmation}
            handleStatus={handleStatus}
            // DefaultDocumentSelectedFiles={DefaultDocumentSelectedFiles}
          />
          <DynamicDocument
            role={role}
            PreviousDynamicDocumentData={PreviousDynamicDocumentData}
            UpdatedDynamicDocumentData={UpdatedDynamicDocumentData}
            handleFileChange={handleFileChange}
            gradientColor={gradientColor}
            dynamicImageFromDB={imageIdFromDB?.dynamic}
            // DynamicDocumentSelectedFiles={DynamicDocumentSelectedFiles}
            setApprovedConfirmation={setApprovedConfirmation}
            handleStatus={handleStatus}
            // DynamicDocumentSelectedFiles={DynamicDocumentSelectedFiles}
          />
        </div>
      </form>

      {role === "PS" ? (
        <DocumentFooter
          approvedConfirmation={approvedConfirmation}
          recomendationMessage={recomendationMessage}
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
