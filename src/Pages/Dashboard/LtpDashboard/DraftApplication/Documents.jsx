import React, { useContext, useEffect, useState } from "react";
import DynamicDocuments from "../../../../assets/Documents.json";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import SaveData from "./SaveData";
import axios from "axios";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Application from "./Application";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import DocumentFooter from "./DocumentFooter";
import DefaultDocument from "./DefaultDocument";


const DocumentUpload = () => {
  const [openApplication, setOpenApplication] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UpdatedDynamicDocuments, setUpdatedDynamicDocuments] = useState([...Documents]);
  const [updatedDefaultDocument, setUpdatedDefaultDocument] = useState([...DefaultDocument])
  const [imageId, setImageId] = useState([]);
  const [approvedConfirmation, setApprovedConfirmation] = useState("");
  const [recomendationMessage, setRecomendationMessage] = useState("");
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [PreviousDefaultDocumentData, setPreviousDefaultDocumentData] = useState([]);
  const {
    confirmAlert,
    sendUserDataIntoDB,
    getApplicationData,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const role = userInfoFromLocalStorage().role;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const handleFileChange = (event, index) => {
    const file = event?.target?.files[0];
    file &&
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);
    selectedFiles[index] = file;
  };

  // Updating documnets when Approved btn clicked (PS)
  const handleAnswer = (event, index) => {
    toast.success(`${event?.target?.value}`);
    selectedFiles[index] = event?.target?.value;
    const updatedApproved = UpdatedDocuments.map((file) => ({
      ...file,
      approved: file.id === index ? event.target.value : file.approved,
    }));
    setUpdatedDocuments(updatedApproved);
  };

  // Adding checklist Data to Document from server data && Updating Data from server Data
  useEffect(() => {
    const gettingData = async () => {
      let updatedDynamicDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      setPreviousDefaultDocumentData(applicationData.documents[0]);
      const PreviousDynamicDocuments = applicationData.documents[1];

      // Checklist "yes" Data intigrating to Document 
      if (applicationCheckList.length) {
        DynamicDocuments?.forEach((data, index) => {
          applicationCheckList.forEach((document) => {
            const condition01 = data.question === document.question;
            const condition02 = document.answer === "yes";
            if (condition01 && condition02) {
              const alreadyPrevious = PreviousDynamicDocuments.map(prevDynData => prevDynData.id == document.id)
              return updatedDynamicDocumentsToAdd.push(data);
            }
          });
        });
      }
      setUpdatedDynamicDocuments([...updatedDynamicDocumentsToAdd]);
      // Merging with previous Dynamic Document Data


      console.log(updatedDynamicDocumentsToAdd, "updatedDynamicDocumentsToAdd")
      // Updating Data from server Data
      // RECEIVED DOCUMENT DATA FROM THE DB & STORE THEM IN THE UPDATED DOCUMENT STATE
      // if (Object.keys(PreviousDynamicDocuments).length) {
      //   setUpdatedDynamicDocuments((prev) => {
      //     prev.forEach((document, index) => {
      //       prev[index].upload = PreviousDocuments[index];
      //     });
      //     return prev;
      //   });
      // setApprovedConfirmation(PreviousDocuments.approved);
      // setRecomendationMessage(PreviousDocuments.message);
      // }
    };
    gettingData();
  }, []);

  useEffect(() => {
    const emptyArray = Array.from({ length: UpdatedDocuments.length });
    setSelectedFiles(emptyArray);
    setImageId(emptyArray);
  }, [UpdatedDocuments]);

  // handle file upload
  const handleFileUpload = async (url) => {
    // append data to formData so that the file data can be sent into the database
    let fileCheckToUpload = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();

      if (selectedFiles[i]) {
        formData.append("file", selectedFiles[i]);
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

            imageId[i] = documentImageId;
          }
        } catch (error) {
          console.log(error, "ERROR");
          // Handle errors, e.g., show an error message to the user
          toast.error("Error to upload documents");
        }
      } else {
        console.log("ELSE OF FILE");
        imageId[i] = UpdatedDocuments[i]?.upload?.length
          ? UpdatedDocuments[i]?.upload
          : "";

        console.log(imageId[i]);
      }
      fileCheckToUpload++;
    }

    if (fileCheckToUpload === selectedFiles.length) {
      return await sendUserDataIntoDB(url, "PATCH", {
        applicationNo,
        documents: imageId,
        approved: approvedConfirmation,
        message: recomendationMessage,
      });
    }
  };
  //  send data to ps db (Apu vai send ps data from here)
  // ps data get
  const sentPsDecision = async (url) => {
    // PS data select and Send data
    const PSKeys = ["id", "approved"];
    const PSArray = UpdatedDocuments.map(({ ...obj }) =>
      PSKeys.reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
    );
    const PSData = {
      documentsObservation: { ...PSArray },
      approved: approvedConfirmation ?? "",
      message: recomendationMessage ?? "",
    };
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo,
      psDocumentPageObservation: PSData,
    });
  };

  return (
    <div className="w-full text-[17px] px-2 py-5 rounded">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="text-black p-4"
      >
        <DefaultDocument PreviousDefaultDocumentData={PreviousDefaultDocumentData} />

        {UpdatedDynamicDocuments?.map((document, index) => {
          const { id, question, requirements } = document;
          return (
            <>
              <div key={id} className="w-full px-2 py-5 rounded">
                <div className="text-[17px]">
                  <p className="pb-4 font-bold">{id}. {question}</p>
                  <div className="ml-6">
                    {requirements?.map((requirement, ind) => {
                      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
                      return (<div key={ind + 1} className="mb-8">
                        <div className="mb-3">
                          <span className="font-bold">{letters[ind]}. </span>{requirement.requirement}
                        </div>
                        {role === "LTP" && (
                          <input
                            name={id}
                            type="file"
                            accept=".pdf, image/*"
                            onChange={(event) => handleFileChange(event, index)}
                            className="file-input file-input-bordered w-full max-w-xs"
                          />
                        )}

                        {requirement.upload !== "" && (
                          <Link
                            to={`https://drive.google.com/file/d/${requirement.upload}/view?usp=sharing`}
                            target="_blank"
                            className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
                          >
                            View
                          </Link>
                        )}
                      </div>
                      )
                    }
                    )}
                  </div>
                </div>

                <div className="flex items-center mt-6">
                  {/* Approved Button */}
                  {role === "PS" && (
                    <div className="space-x-10 mt-2 ms-4 lg:pr-2 ">
                      <label
                        className={`ml-2 inline-flex items-center space-x-1 text-black 
                          ${approved === "approved" && "font-extrabold"}`}
                      >
                        <input
                          type="radio"
                          name={id}
                          value="approved"
                          className="radio radio-sm radio-success mr-3 lg:mr-0"
                          // checked={approved === "approved"}
                          onChange={(event) => handleAnswer(event, id)}
                        />
                        <span>Approve</span>
                      </label>
                      <label
                        className={`ml-2 inline-flex items-center space-x-1 text-black 
                          ${approved === "shortfall" && "font-extrabold"}`}
                      >
                        <input
                          type="radio"
                          name={id}
                          value="shortfall"
                          className="radio radio-sm radio-success mr-3 lg:mr-0"
                          // checked={shortfall === "shortfall"}
                          onChange={(event) => handleAnswer(event, id)}
                        />
                        <span>Shortfall</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}
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
        collectInputFieldData={
          role === "LTP" ? handleFileUpload : sentPsDecision
        }
      />
    </div>
  );
};

export default DocumentUpload;
