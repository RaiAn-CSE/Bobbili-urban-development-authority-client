import { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import axios from "axios";
import { MdOutlineAttachFile } from "react-icons/md";
import SaveData from "./SaveData";
import Application from "./Application";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import DrawingTable from "./DrawingTable";

const Drawing = () => {
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

  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  useEffect(() => {
    localStorage.setItem("selectedFiles", JSON.stringify(["", ""]));
    getApplicationData(applicationNo).then((res) => {
      console.log(res);
      setSavedData(res);
      if (Object.keys(res?.drawing).length) {
        const drawingDataFromDB = res?.drawing;
        console.log(drawingDataFromDB);
        setImageId(drawingDataFromDB);
        console.log(imageId);
        console.log("object");
      }
    });

    // get application data from the database
  }, []);

  const stepperData = useOutletContext();

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

      // console.log(localStoreDrawingData, "PREVIOUS GET");
      // Set File Uploaded Data
      setSelectedFiles((prev) => {
        prev[eventId] = file;
        return prev;
      });
    }
  };

  // const uploadFileInCloudStorage = (formData) => {
  //   for (const file in selectedFiles) {
  //     console.log(selectedFiles[file]);
  //     console.log(file);
  //     formData.append("files", selectedFiles[file]);

  //   }
  // };

  const handleFileUpload = async (url) => {
    let fileUploadSuccess = 0;
    // uploadFileInCloudStorage(formData);
    // e.preventDefault();

    for (const file in selectedFiles) {
      const formData = new FormData();

      console.log(...formData, "FORM DATA");

      console.log(file);
      console.log(selectedFiles[file]);

      if (selectedFiles[file]) {
        formData.append("file", selectedFiles[file]);
        try {
          const response = await axios.post(
            "https://residential-building.vercel.app/upload?page=drawing",
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
            const fileId = response.data.fileId;
            // setImageId((prev) => {
            //   const newFile = {};
            //   newFile[file] = fileId;
            //   console.log(newFile);
            //   const newImageFile = { ...prev, ...newFile };
            //   return newImageFile;
            // });
            imageId[file] = fileId;

            console.log(imageId);
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

      console.log(drawing, "DRAWING");

      return await sendUserDataIntoDB(url, "PATCH", {
        applicationNo,
        drawing,
      });
    }
  };
  const path = "PS"
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
        onSubmit={(e) => e.preventDefault()}
        className="text-black p-5 mt-3"
      >
        {/* AutoCAD Drawing */}
        <div className="text-base px-2 mb-10">
          <p className="pr-3 font-bold">1. AutoCAD Drawing</p>
          <div className="flex mt-5">
            {path === "LTP" && <label className="relative cursor-pointer">
              <input
                type="file"
                accept=".dwg, .zip, .pdf,.png,.jpg"
                onChange={(event) => handleFileChange(event, "AutoCAD")}
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
              />
            </label>}
            {savedData?.drawing?.AutoCAD && (
              <Link
                to={`https://drive.google.com/file/d/${savedData?.drawing?.AutoCAD}/view?usp=sharing`}
                target="_blank"
                className="hover:underline bg-gray-300 p-2 px-4 rounded-full"
              >
                {path == "LTP" ? "View old File" : "View File"}
              </Link>
            )}
          </div>
        </div>

        {/* Drawing PDF */}
        <div className="text-base px-2 mb-10">
          <p className="pr-3 font-bold">2. Drawing PDF</p>
          <div className="flex items-center text-sm mt-5">
            {path === "LTP" && <label className="relative cursor-pointer">
              <input
                type="file"
                accept=".dwg, .zip, .pdf,.png,.jpg"
                onChange={(event) => handleFileChange(event, "Drawing")}
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
              />
            </label>}

            {savedData?.drawing?.Drawing && (
              <Link
                to={`https://drive.google.com/file/d/${savedData?.drawing?.Drawing}/view?usp=sharing`}
                target="_blank"
                className="hover:underline bg-gray-300 p-2 px-4 rounded-full"
              >
                {path == "LTP" ? "View old File" : "View File"}
              </Link>
            )}
          </div>
        </div>
      </form>

      {path == "PS" && <DrawingTable />}
      {openApplication && <Application setOpenApplication={setOpenApplication} />}

      {/* save & continue  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={handleFileUpload}
      />
    </>
  );
};

export default Drawing;
