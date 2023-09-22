import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";

const Drawing = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  console.log(stepperData);

  const { confirmAlert, sendUserDataIntoDB } = useContext(AuthContext);

  const btn =
    "btn btn-md text-xs px-4 md:text-sm md:px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const handleFileChange = (event, eventId) => {
    const file = event?.target?.files[0];
    file && toast.success(`${file?.name} uploaded successfully!`);
    // Set File Uploaded Data
    setSelectedFiles({ ...selectedFiles, [eventId]: file });
  };

  // send updated data into the database
  const sendDrawingData = async (url) => {
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
      drawing: selectedFiles,
    });
  };

  return (
    <div className="text-black h-screen p-5 mt-3">
      {/* AutoCAD Drawing */}
      <div className="flex items-center text-base px-2 space-y-2 mb-8">
        <p className="flex-1 pr-3">
          <span className="font-bold">1.</span> AutoCAD Drawing
        </p>
        <div className="w-[30%] flex items-center space-x-1 text-sm">
          <label
            className={`cursor-pointer bg-gray-300 border py-2 px-4 rounded-full 
          ${
            selectedFiles["AutoCAD Drawing"]?.name
              ? "bg-green-500"
              : "hover:shadow-md"
          }`}
          >
            {selectedFiles["AutoCAD Drawing"]?.name ? "Uploaded" : "Upload"}
            <input
              type="file"
              accept=".dwg, .zip, .pdf"
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
          ${
            selectedFiles["Drawing PDF"]?.name
              ? "bg-green-500"
              : "hover:shadow-md"
          }`}
          >
            {selectedFiles["Drawing PDF"]?.name ? "Uploaded" : "Upload"}
            <input
              type="file"
              accept=".pdf, image/*"
              onChange={(event) => handleFileChange(event, "Drawing PDF")}
              style={{ display: "none" }}
            />
          </label>
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
        collectInputFieldData={sendDrawingData}
      />
    </div>
  );
};

export default Drawing;
