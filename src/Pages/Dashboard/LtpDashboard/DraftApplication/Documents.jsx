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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UpdatedDocuments, setUpdatedDocuments] = useState([...Documents.Data]);
  const [imageId, setImageId] = useState([]);

  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const handleFileChange = (event, index) => {
    const file = event?.target?.files[0];
    file &&
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);

    selectedFiles[index] = file;

    console.log(selectedFiles, "Selected files");
  };

  // useEffect(() => {
  //   fetch("https://residential-building.vercel.app/documents")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result, "Result");

  //       setUpdatedDocuments([...result[0].Data]);
  //       setSelectedFiles([...result[0].Data]);

  //       console.log(result.Data);
  //       console.log(UpdatedDocuments, selectedFiles);
  //       gettingData();
  //       // console.log(UpdatedDocuments, "FETECH");
  //     });
  // }, []);

  useEffect(() => {
    const gettingData = async () => {
      let updatedDocumentsToAdd = [];
      let updateNewSelectDocument = [];
      const applicationData = await getApplicationData(applicationNo);
      const applicationCheckList = applicationData.applicationCheckList;
      const documents = applicationData.documents;
      console.log(documents);

      // setUpdatedDocuments((prev) => {
      //   const updateDoc=[]
      //   const originalDocument = [...OriginalDocuments.Data];
      //   originalDocument.forEach(((originalItem, index) => {

      //   }));
      // });
      console.log(UpdatedDocuments, "UPDATE BEFORE");
      console.log(documents, "DB DATA");
      let increaseDocument = UpdatedDocuments.length;
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
            increaseDocument++;
            const newDocument = {
              id: increaseDocument.toString(),
              question: data.question,
              upload: "",
            };
            updatedDocumentsToAdd.push(newDocument);
          }
        });
      }

      setUpdatedDocuments([...UpdatedDocuments, ...updatedDocumentsToAdd]);

      // RECEIVED DOCUMENT DATA FROM THE DB & STORE THEM IN THE UPDATED DOCUMENT STATE
      if (Object.keys(documents).length) {
        console.log("DOCUMENTS.length");
        setUpdatedDocuments((prev) => {
          console.log(prev);
          prev.forEach((document, index) => {
            console.log(document, index);
            prev[index].upload = documents[index];
          });

          return prev;
        });
      }

      console.log(UpdatedDocuments);

      // const newModified = UpdatedDocuments.map((doc, index) => {
      //   console.log(doc, index);
      //   // doc.upload = documents[index];
      //   // return doc;
      // });

      // setUpdatedDocuments((prev) => {
      //   // console.log(prev);
      //   const oldData = prev;
      //   const newData = oldData.map((data, index) => {
      //     console.log(data);
      //   });
      // });

      // console.log(newModified, "New modified");

      // setUpdatedDocuments([...newModified]);

      // setSelectedFiles((prev) => {
      //   const newFile = prev.map((file) => {
      //     file.upload = "";
      //   });

      //   console.log(newFile);

      //   return newFile;
      // });
    };
    gettingData();
  }, []);

  useEffect(() => {
    console.log(UpdatedDocuments);
    const emptyArray = Array.from({ length: UpdatedDocuments.length });

    console.log(emptyArray);

    setSelectedFiles(emptyArray);
    setImageId(emptyArray);
  }, [UpdatedDocuments]);

  // console.log(OriginalDocuments.Data, "DOCUMENTS DATA");
  console.log(UpdatedDocuments, "UpdatesDocuments");
  console.log(selectedFiles, "Selected documents");

  console.log(imageId, "IMAGE ID");

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

    let fileCheckToUpload = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();

      if (selectedFiles[i]) {
        console.log(selectedFiles, "UPLOAD FILE");

        formData.append("file", selectedFiles[i]);
        try {
          const response = await axios.post(
            "https://residential-building.vercel.app/upload?page=document",
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

    // selectedFiles.forEach(async (document, index) => {
    //   const formData = new FormData();
    //   console.log(document);
    //   if (document?.upload !== "") {
    //     formData.append("file", document?.upload);
    //     try {
    //       const response = await axios.post(
    //         "https://residential-building.vercel.app/upload?page=document",
    //         formData,
    //         {
    //           headers: {
    //             "Content-Type": "multipart/form-data", // Important for file uploads
    //           },
    //         }
    //       );
    //       // Handle success or display a success message to the user

    //       console.log(response, "response");

    //       if (response?.data.msg === "Successfully uploaded") {
    //         const documentImageId = response?.data?.fileId;

    //         imageId[index] = documentImageId;

    //         // return await sendUserDataIntoDB(url, "PATCH", {
    //         //   applicationNo,
    //         //   documents,
    //         // });
    //       }
    //     } catch (error) {
    //       // Handle errors, e.g., show an error message to the user
    //       toast.error("Error to upload documents");
    //     }
    //   } else {
    //     imageId[index] = "";
    //   }
    //   fileCheckToUpload++;
    // });

    console.log(fileCheckToUpload, selectedFiles.length);
    console.log(fileCheckToUpload === selectedFiles.length);

    if (fileCheckToUpload === selectedFiles.length) {
      console.log(imageId, "IMAGE IDS");
      return await sendUserDataIntoDB(url, "PATCH", {
        applicationNo,
        documents: imageId,
      });
    }

    console.log(...formData);
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
        {UpdatedDocuments?.map((document, index) => {
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
                    onChange={(event) => handleFileChange(event, index)}
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

        <input type="submit" value="get" onClick={handleFileUpload} />

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
