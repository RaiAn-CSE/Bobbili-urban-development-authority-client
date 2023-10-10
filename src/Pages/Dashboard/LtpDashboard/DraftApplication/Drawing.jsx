import { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import axios from "axios";
import SaveData from "./SaveData";
import Application from "./Application";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import DrawingTable from "./DrawingTable";

const Drawing = () => {
  const [approvedConfirmation, setApprovedConfirmation] = useState("");
  const [recomendationMessage, setRecomendationMessage] = useState("");

  console.log({ approvedConfirmation, recomendationMessage });

  const [openApplication, setOpenApplication] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    AutoCAD: "",
    Drawing: "",
  });
  const [imageId, setImageId] = useState({
    AutoCAD: "",
    Drawing: "",
  });
  const [savedData, setSavedData] = useState([]);
  const {
    confirmAlert,
    sendUserDataIntoDB,
    getApplicationData,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const role = userInfoFromLocalStorage().role;

  useEffect(() => {
    localStorage.setItem("selectedFiles", JSON.stringify(["", ""]));
    getApplicationData(applicationNo).then((res) => {
      console.log(res);
      setSavedData(res);
      if (Object.keys(res?.drawing).length) {
        const drawingDataFromDB = res?.drawing;
        setImageId(drawingDataFromDB);
      }
    });
  }, []);

  const stepperData = useOutletContext();

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const [localFile, setLocalFile] = useState(
    JSON.parse(localStorage.getItem("selectedFiles"))
  );

  useEffect(() => {
    // setLocalFile(JSON.parse(localStorage.getItem("selectedFiles")));
    return () => {
      localStorage.removeItem("selectedFiles");
    };
  }, []);

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  const handleFileChange = (event, eventId) => {
    const file = event?.target.files[0];
    // formData.append(eventId, file);
    console.log(file, "FILE");
    if (file) {
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);
      const localStoreDrawingData = JSON.parse(
        localStorage.getItem("selectedFiles")
      );

      if (eventId === "AutoCAD") {
        localStoreDrawingData[0] = file?.name;
        setLocalFile(localStoreDrawingData);
        localStorage.setItem(
          "selectedFiles",
          JSON.stringify(localStoreDrawingData)
        );
      }
      if (eventId === "Drawing") {
        localStoreDrawingData[1] = file?.name;
        setLocalFile(localStoreDrawingData);
        localStorage.setItem(
          "selectedFiles",
          JSON.stringify(localStoreDrawingData)
        );
      }
      // Set File Uploaded Data
      setSelectedFiles((prev) => {
        prev[eventId] = file;
        return prev;
      });
    }
  };

  const handleFileUpload = async (url) => {
    let fileUploadSuccess = 0;
    // uploadFileInCloudStorage(formData);
    for (const file in selectedFiles) {
      const formData = new FormData();
      if (selectedFiles[file]) {
        formData.append("file", selectedFiles[file]);
        try {
          const response = await axios.post(
            "http://localhost:5000/upload?page=drawing",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
            }
          );
          if (response?.data.msg === "Successfully uploaded") {
            const fileId = response.data.fileId;
            imageId[file] = fileId;
            fileUploadSuccess = 1;
          }
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          toast.error("Error to upload documents");
          fileUploadSuccess = 0;
        }
      }
    }

    if (fileUploadSuccess) {
      console.log(fileUploadSuccess, imageId);
      const drawing = {
        AutoCAD: imageId["AutoCAD"],
        Drawing: imageId["Drawing"],
      };
      return await sendUserDataIntoDB(url, "PATCH", {
        applicationNo,
        drawing,
      });
    }
  };
  // Apu vai send ps data from here

  const sentPsDecision = async (url) => {
    const psData = {
      approved: approvedConfirmation,
      message: recomendationMessage,
    };

    console.log(psData, "PSDATA");
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo,
      psDrawingPageObservation: psData,
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-black p-5 mt-3"
      >
        {/* AutoCAD Drawing */}
        <div className="text-base px-2 mb-16 ">
          <p className="pr-3 font-bold">1. AutoCAD Drawing</p>
          <div className="flex items-center mt-5">
            {role === "LTP" && (
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf, .png, .jpg"
                  onChange={(event) => handleFileChange(event, "AutoCAD")}
                  className="file-input file-input-bordered file-input-md w-full max-w-xs"
                />
              </label>
            )}
            {savedData?.drawing?.AutoCAD && (
              <Link
                to={`https://drive.google.com/file/d/${savedData?.drawing?.AutoCAD}/view?usp=sharing`}
                target="_blank"
                className={`${gradientColor} text-white hover:underline  py-2 px-5 rounded-full`}
              >
                View
              </Link>
            )}
          </div>
        </div>

        {/* Drawing PDF */}
        <div className="text-base px-2 mb-10">
          <p className="pr-3 font-bold">2. Drawing PDF</p>
          <div className="flex items-center mt-5">
            {role === "LTP" && (
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf,.png,.jpg"
                  onChange={(event) => handleFileChange(event, "Drawing")}
                  className="file-input file-input-bordered file-input-md w-full max-w-xs"
                />
              </label>
            )}

            {savedData?.drawing?.Drawing && (
              <Link
                to={`https://drive.google.com/file/d/${savedData?.drawing?.Drawing}/view?usp=sharing`}
                target="_blank"
                className={`${gradientColor} text-white hover:underline  py-2 px-5 rounded-full`}
              >
                View
              </Link>
            )}
          </div>
          <p className="text-red-500 mt-2 text-sm">Note: Upload A3 file</p>
        </div>
      </form>

      {role == "PS" && (
        <DrawingTable
          setApprovedConfirmation={setApprovedConfirmation}
          setRecomendationMessage={setRecomendationMessage}
        />
      )}
      {openApplication && (
        <Application setOpenApplication={setOpenApplication} />
      )}

      {/* save & continue  */}
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
    </>
  );
};

export default Drawing;
