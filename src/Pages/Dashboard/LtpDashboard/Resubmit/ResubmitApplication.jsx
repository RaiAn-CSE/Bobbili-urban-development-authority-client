import React, { useContext, useEffect, useState } from "react";
import { VscReferences } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Drawing from "../DraftApplication/Drawing";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";

const ResubmitApplication = () => {
  const { appNo } = useLocation()?.state;

  const { fetchDataFromTheDb, ownerNamePattern } = useContext(AuthContext);

  console.log(appNo);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError("");
    fetchDataFromTheDb(
      `http://localhost:5000/getSpecificShortfallApplication?appNo=${JSON.stringify(
        appNo
      )}`
    )
      .then((result) => {
        setLoading(false);
        console.log(result, "result");
        setData(result);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  const [localFile, setLocalFile] = useState(
    JSON.parse(localStorage.getItem("selectedFiles"))
  );

  const [selectedFiles, setSelectedFiles] = useState({
    AutoCAD: "",
    Drawing: "",
  });
  const [imageId, setImageId] = useState({
    AutoCAD: "",
    Drawing: "",
  });

  const handleFileChange = (event, eventId) => {
    const file = event?.target.files[0];
    // formData.append(eventId, file);
    console.log(file, "FILE");
    if (file) {
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);
      // const localStoreDrawingData = JSON.parse(
      //   localStorage.getItem("selectedFiles")
      // );

      // if (eventId === "AutoCAD") {
      //   localStoreDrawingData[0] = file?.name;
      //   setLocalFile(localStoreDrawingData);
      //   localStorage.setItem(
      //     "selectedFiles",
      //     JSON.stringify(localStoreDrawingData)
      //   );
      // }
      // if (eventId === "Drawing") {
      //   localStoreDrawingData[1] = file?.name;
      //   setLocalFile(localStoreDrawingData);
      //   localStorage.setItem(
      //     "selectedFiles",
      //     JSON.stringify(localStoreDrawingData)
      //   );
      // }
      // Set File Uploaded Data
      setSelectedFiles((prev) => {
        prev[eventId] = file;
        return prev;
      });
    }

    console.log(selectedFiles, "SF");
  };

  console.log(data, "data");

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {/* header part  */}
      <div className="flex justify-between items-center m-5">
        <p className="nm_Container p-3 font-bold text-base">
          Application no: <span className="text-normalViolet">{appNo}</span>
        </p>

        <button
          // Open the modal using document.getElementById('ID').showModal() method
          onClick={() => {
            // document.getElementById("my_modal_2").showModal();
            // setOpenEndorsement(true);
          }}
          className={`btn btn-sm text-xs nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white border-none`}
        >
          <VscReferences className="text-lg" />{" "}
          <span className="text-xs uppercase">Endorsement</span>
        </button>
      </div>

      {/* owner information  */}
      <div className="grid grid-cols-2 p-10 border-image-frame nm_Container mx-5">
        {/* 1st row  */}
        <div>
          <p>
            <span className="font-bold mr-3 text-violetDark">Owner name:</span>
            {ownerNamePattern(data?.applicantInfo?.applicantDetails)}
          </p>
        </div>
        <div className="mb-6">
          <p>
            <span className="font-bold mr-3 text-violetDark">
              Site location:
            </span>{" "}
            {data?.buildingInfo?.generalInformation?.surveyNo},
            {data?.buildingInfo?.generalInformation?.village},
            {data?.buildingInfo?.generalInformation?.mandal}
          </p>
        </div>

        {/* 2nd row  */}
        <div>
          <p>
            <span className="font-bold mr-4 text-violetDark">Contact no:</span>{" "}
            {data?.applicantInfo?.applicantDetails?.[0]?.phone}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold mr-3 text-violetDark">Owner Email:</span>{" "}
            {data?.applicantInfo?.applicantDetails?.[0]?.email}
          </p>
        </div>
      </div>

      {/* drawing  */}
      <div className="my-6 nm_Container mx-6">
        <p className="font-bold pt-5 text-violetDark text-xl ml-8">Drawing</p>
        <hr className="w-[90%] h-[1.5px] inline-block ml-8 bg-gray-400" />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-black p-5 mt-3 ml-3"
        >
          {/* AutoCAD Drawing */}
          <div className="text-lg  mb-16">
            <p className="pr-3 font-bold text-black">1. AutoCAD Drawing</p>
            <div className="flex items-center mt-5">
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf, .png, .jpg"
                  onChange={(event) => handleFileChange(event, "AutoCAD")}
                  className="file-input file-input-bordered file-input-md w-full max-w-xs text-gray-400 bg-white dark:text-black"
                />
              </label>
            </div>
          </div>

          {/* Drawing PDF */}
          <div className="text-lg mb-10">
            <p className="pr-3 font-bold text-black">2. Drawing PDF</p>
            <div className="flex items-center mt-5">
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf,.png,.jpg"
                  onChange={(event) => handleFileChange(event, "Drawing")}
                  className="file-input file-input-bordered file-input-md w-full max-w-xs text-gray-400 bg-white dark:text-black"
                />
              </label>
            </div>

            <p className="text-red-500 mt-2 font-bold text-sm">
              Note: Upload A3 file
            </p>
          </div>
        </form>
      </div>

      {/* documents  */}
      <div className="my-6 nm_Container mx-6">
        <p className="font-bold pt-5 text-violetDark text-xl ml-8">Documents</p>
        <hr className="w-[90%] h-[1.5px] inline-block ml-8 bg-gray-400" />
      </div>
    </div>
  );
};

export default ResubmitApplication;
