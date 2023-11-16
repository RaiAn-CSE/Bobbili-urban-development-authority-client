import React, { useContext, useEffect, useState } from "react";
import { VscReferences } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Drawing from "../DraftApplication/Drawing";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import ArrowIcon from "../../../Components/ArrowIcon";
import DefaultDocuments from "../../../../assets/DefaultDocument.json";
import DynamicDocuments from "../../../../assets/DynamicDocument.json";
import _ from "lodash";

const ResubmitApplication = () => {
  const { appNo } = useLocation()?.state;

  const { fetchDataFromTheDb, ownerNamePattern } = useContext(AuthContext);

  console.log(appNo);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [documentObs, setDocumentObs] = useState([]);
  const [oldImageIds, setOldImageIds] = useState([]);
  const [drawingFiles, setDrawingFiles] = useState({
    AutoCAD: "",
    Drawing: "",
  });

  const [documentImageFiles, setDocumentImageFiles] = useState({
    default: [],
    dynamic: [],
  });

  useEffect(() => {
    // window.scrollTo(0, 0);
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
        const remarkTexts = result?.psDocumentPageObservation?.remarkText;
        setDocumentObs(remarkTexts);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  let i = 0;

  useEffect(() => {
    if (documentObs?.length) {
      setDocumentImageFiles((prev) => {
        const newItem = { default: [], dynamic: [] };
        documentObs?.forEach((eachRemark) => {
          if (eachRemark.hasOwnProperty("default")) {
            newItem.default.push({
              id: eachRemark?.default?.id,
              imageId: "",
            });
          }

          if (eachRemark.hasOwnProperty("dynamic")) {
            newItem.dynamic.push({
              id: eachRemark?.dynamic?.id,
              uploadId: eachRemark?.dynamic?.uploadId,
              imageId: "",
            });
          }
        });

        return newItem;
      });
    }
  }, [documentObs]);

  const handleDrawingFileChange = (event, eventId) => {
    const file = event?.target.files[0];
    // formData.append(eventId, file);
    console.log(file, "FILE");
    if (file) {
      toast.success(`${file?.name.slice(0, 20)}... uploaded successfully!`);

      // Set File Uploaded Data
      setDrawingFiles((prev) => {
        prev[eventId] = file;
        return prev;
      });
    }

    console.log(drawingFiles, "SF");
  };

  console.log(data, "data");

  const findQuestionName = (document) => {
    let questionName;
    console.log(document, "DOCUMENT");
    if (document.hasOwnProperty("default")) {
      console.log("default");
      DefaultDocuments.forEach((item) => {
        if (item?.id === document?.default?.id) {
          questionName = item?.question;
        }
      });
    }

    if (document.hasOwnProperty("dynamic")) {
      console.log("dynamic");
      DynamicDocuments?.forEach((item) => {
        if (item?.id === document?.dynamic?.id) {
          item?.requirements?.forEach((eachRequirement) => {
            if (eachRequirement?.uploadId === document?.dynamic?.uploadId) {
              questionName = eachRequirement?.requirement;
            }
          });
        }
      });
    }

    return questionName;
  };

  // document file change detect
  const handleDocumentFileChange = (event, document) => {
    console.log(event.target.files[0], "event");
    const file = event.target.files[0];
    if (document?.hasOwnProperty("default")) {
      const id = document?.default?.id;
      const index = documentImageFiles["default"].findIndex(
        (item) => item.id === id
      );
      documentImageFiles["default"][index] = { id, imageId: file };
    }

    if (document?.hasOwnProperty("dynamic")) {
      const id = document.dynamic.id;
      const uploadId = document.dynamic.uploadId;
      const index = documentImageFiles["dynamic"].findIndex(
        (item) => item.id === id && item.uploadId === uploadId
      );
      documentImageFiles["dynamic"][index] = {
        id,
        uploadId,
        imageId: file,
      };
    }
    console.log(documentImageFiles, "Document image files update");
  };

  // sent data into database

  const sentApplication = async () => {
    console.log("clicked");

    // all old image files id
    let oldImageFilesId = [data?.drawing?.AutoCAD, data?.drawing?.Drawing];

    const documentsUploadByLtp = data?.documents;

    documentImageFiles["default"].forEach((eachFile) => {
      const index = documentsUploadByLtp?.default?.findIndex(
        (item) => item?.id === eachFile?.id
      );
      if (index !== -1) {
        oldImageFilesId = [
          ...oldImageFilesId,
          documentsUploadByLtp["default"][index]["imageId"],
        ];
      }
    });

    documentImageFiles["dynamic"].forEach((eachFile) => {
      const index = documentsUploadByLtp?.dynamic?.findIndex(
        (item) =>
          item?.id === eachFile?.id && item?.uploadId === eachFile?.uploadId
      );
      if (index !== -1) {
        oldImageFilesId = [
          ...oldImageFilesId,
          documentsUploadByLtp["dynamic"][index]["imageId"],
        ];
      }
    });

    console.log(oldImageFilesId, "old image files id");

    // successfully get old image files id

    // get drawing file image id
  };

  console.log(documentObs, "DocumentObs");
  console.log(documentImageFiles, "Document image files");

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {/* header part  */}
      <div className="flex justify-between items-center m-5">
        <p className="nm_Container p-3 font-bold text-xl">
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
      <div className="grid grid-cols-2 p-10 border-image-frame nm_Container mt-10 mx-5 text-[18px]">
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
      <div className="my-10 nm_Container mx-6">
        <p className="font-bold pt-5 text-violetDark text-xl ml-8">Drawing</p>
        <hr className="w-[90%] h-[1.5px] inline-block ml-8 bg-gray-400" />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-black p-5 my-3 ml-3 flex justify-evenly"
        >
          {/* AutoCAD Drawing */}
          <div className="text-lg  mb-8">
            <p className="pr-3 font-bold text-black">1. AutoCAD Drawing</p>
            <div className="flex items-center mt-5">
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf, .png, .jpg"
                  onChange={(event) =>
                    handleDrawingFileChange(event, "AutoCAD")
                  }
                  className="file-input file-input-bordered file-input-md w-full max-w-xs text-gray-400 bg-white dark:text-black"
                />
              </label>
            </div>
          </div>

          {/* Drawing PDF */}
          <div className="text-lg mb-5">
            <p className="pr-3 font-bold text-black">2. Drawing PDF</p>
            <div className="flex items-center mt-5">
              <label className="relative cursor-pointer mr-6">
                <input
                  type="file"
                  accept=".dwg, .zip, .pdf,.png,.jpg"
                  onChange={(event) =>
                    handleDrawingFileChange(event, "Drawing")
                  }
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

        {documentObs?.map((document, index) => {
          return (
            <div key={index} className="p-6">
              <p className="font-bold text-[18px]">
                {index + 1}. {findQuestionName(document)}
              </p>

              <input
                type="file"
                accept="*"
                onChange={(event) => handleDocumentFileChange(event, document)}
                className="file-input file-input-bordered file-input-md w-full max-w-xs text-gray-400 bg-white mt-5 dark:text-black"
              />
            </div>
          );
        })}
      </div>

      {/* remarks */}
      <div className="nm_Container mx-6 p-7 rounded-t-lg dark:bg-gray-800">
        <label
          className="inline-block font-bold mb-4 text-xl text-violetDark"
          htmlFor="remarks"
        >
          Remarks
        </label>
        {/* <hr className="w-[98%] h-[1.5px] inline-block  bg-gray-400" /> */}
        <div>
          <textarea
            id="remarks"
            rows="4"
            className="w-[70%] p-3 rounded-lg text-base text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
      </div>

      {/* submit btns  */}
      <div className="flex justify-between my-10 mx-6">
        <button class="nm_Container overflow-hidden w-24 p-2 h-12 bg-normalViolet text-white border-none rounded-md text-base uppercase font-bold cursor-pointer relative z-10 group">
          Go
          <span class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span class="absolute w-36 h-32 -top-8 -left-2 bg-[#8F85F6] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span class="absolute w-36 h-32 -top-8 -left-2 bg-[#8F85F6] rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-4.5 left-6 z-10">
            Back!
          </span>
        </button>
        <button className="fancy-button" onClick={sentApplication}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResubmitApplication;
