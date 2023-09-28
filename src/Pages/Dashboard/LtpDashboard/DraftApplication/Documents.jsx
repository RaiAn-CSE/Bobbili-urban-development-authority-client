import React, { useContext, useEffect, useState } from "react";
import Documents from "../../../../assets/Documents.json";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import SaveData from "./SaveData";
import axios from "axios";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Application from "./Application";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const DocumentUpload = () => {
  const [openApplication, setOpenApplication] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [UpdatedDocuments, setUpdatedDocuments] = useState(Documents.Data);
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const formData = new FormData();

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    file &&
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);
    // Update selectedFiles object with the selected file for the specific question ID.
    // console.log(localStoreDrawingData, "PREVIOUS GET");

    console.log(eventId, file);
    // Set File Uploaded Data
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [eventId]: file,
    }));

    console.log(selectedFiles, "Selected files");

    // Update UpdatedDocuments with the selected file for the specific question ID.
    const updatedData = UpdatedDocuments.map((Question) => {
      const { id, question, upload } = Question;
      return { id, question, upload: eventId === id ? file : upload };
    });

    setUpdatedDocuments(updatedData);
  };

  console.log(UpdatedDocuments, "UpdatesDocuments");

  useEffect(() => {
    const gettingData = async () => {
      let updatedDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      const documents = applicationData.documents;

      console.log(documents);
      if (applicationCheckList.length) {
        // Declare the array here
        applicationCheckList.forEach((data, index) => {
          const already = UpdatedDocuments.find(
            (document) => document.question === data.question
          );
          if (already) {
            return null;
          }
          if (index >= 8 && data.answer === "yes") {
            updatedDocumentsToAdd.push({
              id: UpdatedDocuments.length + updatedDocumentsToAdd.length + 1,
              question: data.question,
              upload: "",
            });
          }
        });
      }
      setUpdatedDocuments([...UpdatedDocuments, ...updatedDocumentsToAdd]);

      if (documents.length) {
        setUpdatedDocuments((prev) => {
          console.log(prev);
          documents.forEach((document, index) => {
            console.log(document, index);
            prev[index].upload = document;
          });

          return prev;
        });
      }
    };

    gettingData();
  }, []);

  // handle file upload
  const handleFileUpload = async (url) => {
    // find empty field to stop sending data in to the database
    // const findEmptyField = UpdatedDocuments.find(
    //   (field) => field?.upload === ""
    // );

    // console.log(findEmptyField, "Find empty field");

    // if (!findEmptyField) {
    //   console.log("No empty");
    // } else {
    //   toast.error("Please fill up all the fields");
    // }

    // append data to formData so that the file data can be sent into the database

    UpdatedDocuments.forEach((document) => {
      console.log(document);
      formData.append("files", document?.upload);
    });

    console.log(...formData);

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

      console.log(response, "response");

      if (response?.data.msg === "Successfully uploaded") {
        const documents = response?.data?.fileId;

        console.log(documents);

        return await sendUserDataIntoDB(url, "PATCH", {
          applicationNo,
          documents,
        });
      }
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      toast.error("Error to upload documents");
    }
  };

  return (
    <>
      <div className="text-end mb-4">
        <button
          onClick={() => setOpenApplication(true)}
          className="btn btn-sm text-xs bg-[#c0e9e4] transition-all duration-700 hover:bg-[#10ac84] text-[#000] hover:text-[#fff]"
        >
          <HiOutlineClipboardDocumentList className="text-lg" />
          <span>Application</span>
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="text-black p-4"
      >
        {UpdatedDocuments?.map((document) => {
          const { id, question, upload } = document;
          return (
            <>
              <div
                key={id}
                className="w-full px-2 mt-10 shadow-sm py-10 rounded"
              >
                <p className="text-[17px] font-bold">
                  {id}. {question}
                </p>

                <div className="flex justify-center items-center mt-10">
                  <input
                    name={id}
                    type="file"
                    accept=".pdf, image/*"
                    onChange={(event) => handleFileChange(event, id)}
                    className="file-input file-input-bordered file-input-md w-full max-w-xs"
                  />
                  {upload !== "" && (
                    <Link
                      to={`https://drive.google.com/file/d/${upload}/view?usp=sharing`}
                      target="_blank"
                      className="hover:underline ms-10 p-3 bg-gray-100 rounded-xl sm:rounded-full text-center"
                    >
                      View old File
                    </Link>
                  )}
                </div>
              </div>
              {/* <div className="divider"></div> */}
              <hr />
            </>
          );
        })}

        {openApplication ? (
          <Application setOpenApplication={setOpenApplication} />
        ) : (
          ""
        )}

        {/* save & continue  */}
        {/* navigation button  */}
        <SaveData
          isStepperVisible={isStepperVisible}
          currentStep={currentStep}
          steps={steps}
          stepperData={stepperData}
          confirmAlert={confirmAlert}
          collectInputFieldData={handleFileUpload}
        />
      </form>
    </>
  );
};

export default DocumentUpload;
