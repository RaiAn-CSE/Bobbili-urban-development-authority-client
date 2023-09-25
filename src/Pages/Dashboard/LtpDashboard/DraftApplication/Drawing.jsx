import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";
import axios from "axios";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    "AutoCAD Drawing": "",
    "Drawing PDF": "",
  });
  const stepperData = useOutletContext();

  let btnClass =
    "btn btn-md text-[#000000] hover:text-[#fff] rounded-lg transition-all duration-500 cursor-pointer hover:bg-emerald-400";

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  console.log(stepperData);

  const { confirmAlert, sendUserDataIntoDB } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const btn =
    "btn btn-md text-xs px-4 md:text-sm md:px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const formData = new FormData();
  const handleFileChange = (event, eventId) => {
    const file = event?.target.files[0];

    console.log(file);

    // formData.append(eventId, file);

    file && toast.success(`${file?.name} uploaded successfully!`);
    // Set File Uploaded Data
    setSelectedFiles((prev) => {
      console.log(prev, "prev");
      prev[eventId] = file;
      return prev;
    });

    // if (upload.length < 1) return;

    // .append("file", upload[0]);

    console.log(selectedFiles);

    // console.log({ ...formData });
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
    <form
      onSubmit={(e) => e.preventDefault()}
      className="text-black h-screen p-5 mt-3"
    >
      {/* AutoCAD Drawing */}
      <div className="flex items-center text-base px-2 space-y-2 mb-8">
        <p className="flex-1 pr-3">
          <span className="font-bold">1.</span> AutoCAD Drawing
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label
            className={`cursor-pointer bg-gray-300 border py-2 px-4 rounded-full 
          
              `}
          >
            {/* {selectedFiles["AutoCAD Drawing"]?.name ? "Uploaded" : "Upload"} */}
            <input
              type="file"
              accept=".dwg, .zip, .pdf,.png,.jpg"
              onChange={(event) => handleFileChange(event, "AutoCAD Drawing")}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      {/* Drawing PDF */}
      <div className="flex items-center text-base px-2 space-y-2">
        <p className="flex-1 pr-3">
          <span className="font-bold">2.</span> Drawing PDF
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label
            className={`cursor-pointer bg-gray-300 border py-2 px-4 rounded-full 
         `}
          >
            {/* {selectedFiles["Drawing PDF"]?.name ? "Uploaded" : "Upload"} */}
            <input
              type="file"
              id="drawing"
              accept=".pdf, image/*"
              onChange={(event) => handleFileChange(event, "Drawing PDF")}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      <input type="submit" value="Submit" />

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
