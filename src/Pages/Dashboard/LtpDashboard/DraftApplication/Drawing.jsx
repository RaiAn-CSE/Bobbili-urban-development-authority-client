import { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import axios from "axios";
import { MdOutlineAttachFile } from "react-icons/md";
import SaveData from "./SaveData";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    "AutoCAD Drawing": "",
    "Drawing PDF": "",
  });

  const [savedData, setSavedData] = useState([]);

  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  useEffect(() => {
    localStorage.setItem("selectedFiles", JSON.stringify(["", ""]));

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

  let btnClass =
    "btn btn-md text-[#000000] hover:text-[#fff] rounded-lg transition-all duration-500 cursor-pointer hover:bg-emerald-400";

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  console.log(stepperData);

  const btn =
    "btn btn-md text-xs px-4 md:text-sm md:px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const formData = new FormData();

  const handleFileChange = (event, eventId) => {
    const file = event?.target.files[0];

    console.log(file);

    // formData.append(eventId, file);

    file && toast.success(`${file?.name} uploaded successfully!`);

    const localStoreDrawingData = JSON.parse(
      localStorage.getItem("selectedFiles")
    );

    if (eventId === "AutoCAD Drawing") {
      localStoreDrawingData[0] = file?.name;
      setLocalFile(localStoreDrawingData);
      console.log("Autocad");
      localStorage.setItem(
        "selectedFiles",
        JSON.stringify(localStoreDrawingData)
      );
    }
    if (eventId === "Drawing PDF") {
      console.log("DRA");
      localStoreDrawingData[1] = file?.name;
      setLocalFile(localStoreDrawingData);
      localStorage.setItem(
        "selectedFiles",
        JSON.stringify(localStoreDrawingData)
      );
    }

    console.log(localStoreDrawingData, "PREVIOUS GET");
    // Set File Uploaded Data
    setSelectedFiles((prev) => {
      console.log(prev, "prev");
      prev[eventId] = file;
      return prev;
    });
  };

  const handleFileUpload = async (url) => {
    // e.preventDefault();
    if (
      selectedFiles["AutoCAD Drawing"] !== "" &&
      selectedFiles["Drawing PDF"] !== ""
    ) {
      console.log(selectedFiles["AutoCAD Drawing"]);
      for (const file in selectedFiles) {
        // console.log(selectedFiles[file]);
        formData.append("files", selectedFiles[file]);
      }
      console.log(...formData);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
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

          const drawing = {
            AutoCAD: fileId[0],
            Drawing: fileId[1],
          };

          console.log(drawing, "DRAWING");

          return await sendUserDataIntoDB(url, "PATCH", {
            applicationNo,
            drawing,
          });
        }
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        toast.error("Error to upload documents");
      }
    } else {
      toast.error("Please upload all");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="text-black p-5 mt-3">
      {/* AutoCAD Drawing */}
      <div className="flex justify-between items-center text-base px-2  mb-16">
        <p className="pr-3">
          <span className="font-bold">1.</span> AutoCAD Drawing
        </p>
        <div className="flex items-center text-sm">
          <label className="relative cursor-pointer">
            {/* {selectedFiles["AutoCAD Drawing"]?.name ? "Uploaded" : "Upload"} */}

            <input
              type="file"
              accept=".dwg, .zip, .pdf,.png,.jpg"
              onChange={(event) => handleFileChange(event, "AutoCAD Drawing")}
              className=" absolute top-1/2 left-0 translate-y-[-50%]  w-[200px] z-[-1]"
            />
            <div className="flex justify-between items-center bg-white shadow-lg w-[230px] p-2 rounded-lg z-0">
              <MdOutlineAttachFile size={20} />

              {localFile && localFile[0] !== "" ? (
                <p className="text-base">{localFile[0].slice(0, 12) + "..."}</p>
              ) : (
                <p className="text-base">Select a file</p>
              )}

              <p className="bg-orange-400 text-white font-bold px-3 py-3 rounded-lg z-0">
                Upload
              </p>
            </div>
          </label>

          <Link className="ms-10 bg-yellow-300 p-3 rounded-full">
            View old File
          </Link>
        </div>
      </div>

      {/* Drawing PDF */}
      <div className="flex justify-between items-center text-base px-2 mb-16 ">
        <p className="pr-3">
          <span className="font-bold">2.</span> Drawing PDF
        </p>
        <div className="flex items-center text-sm">
          <label className="relative cursor-pointer">
            <input
              type="file"
              id="drawing"
              accept=".pdf, image/*"
              onChange={(event) => handleFileChange(event, "Drawing PDF")}
              style={{ display: "none" }}
            />
            <div className="flex justify-between items-center bg-white shadow-lg w-[230px] p-2 rounded-lg z-0">
              <MdOutlineAttachFile size={20} />
              {localFile && localFile[1] !== "" ? (
                <p className="text-base">{localFile[1].slice(0, 12) + "..."}</p>
              ) : (
                <p className="text-base">Select a file</p>
              )}

              <p className="bg-orange-400 text-white font-bold px-3 py-3 rounded-lg z-0">
                Upload
              </p>
            </div>
          </label>

          <Link className="ms-10 bg-yellow-300 p-3 rounded-full">
            View old File
          </Link>
        </div>
      </div>

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
      {/* <>
        {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
          <div className="flex justify-end my-8 px-10">
            <button
              className={`${btnClass} bg-yellow-300 hover:shadow-md hover:bg-yellow-300 hover:text-black`}
              type="submit"
              // onClick={() =>
              //   // currentStep < steps.length - 1 &&
              //   // handleStepClick(currentStep + 1)
              //   confirmAlert()
              // }
              // onClick={() => confirmAlert(stepperData, collectInputFieldData)}
            >
              Save and Continue
            </button>
          </div>
        )}
      </> */}
    </form>
  );
};

export default Drawing;
