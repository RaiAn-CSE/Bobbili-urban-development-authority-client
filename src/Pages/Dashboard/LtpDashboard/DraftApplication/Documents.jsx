import React, { useContext, useEffect, useState } from "react";
import Documents from "../../../../assets/Documents.json";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import SaveData from "./SaveData";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [UpdatedDocuments, setUpdatedDocuments] = useState(Documents.Data);
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const formData = new FormData();

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

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  useEffect(() => {
    const gettingData = async () => {
      let updatedDocumentsToAdd = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
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
    };

    gettingData();
  }, []);

  console.log(UpdatedDocuments, "updatedDocuments");

  // handle file upload

  const handleFileUpload = async (url) => {
    console.log(UpdatedDocuments, "UPDATE DOCUMENTS");

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
        const documents = response.data.fileId;

        console.log(drawing, "DRAWING");

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

  // Sending data to Backend
  const sendDocumentsData = async (url) => {
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
      documents: UpdatedDocuments,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="text-black p-4"
    >
      {UpdatedDocuments.map((Question) => {
        const { id, question } = Question;
        return (
          <>
            <div key={id} className="w-full px-2 mt-10  mb-28">
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
                <Link
                  to={`https://drive.google.com/file/d//view?usp=sharing`}
                  target="_blank"
                  className="hover:underline ms-10 p-3"
                >
                  View old File
                </Link>
              </div>
            </div>
            <div className="divider"></div>
          </>
        );
      })}

      <input onClick={handleFileUpload} type="submit" value="Submit" />

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
    </form>
  );
};

export default DocumentUpload;
