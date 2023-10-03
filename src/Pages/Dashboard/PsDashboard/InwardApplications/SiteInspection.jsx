import React, { useContext, useEffect, useRef } from "react";
import SaveData from "../../LtpDashboard/DraftApplication/SaveData";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

const SiteInspection = () => {
  const {
    confirmAlert,
    sendUserDataIntoDB,
    userInfoFromLocalStorage,
    getApplicationData,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps] = stepperData;

  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      console.log(applicationData, "applicationData");
    };
    getData();
  }, []);

  // let [formObject, setFormObject] = useState({ natureOfSite: "", siteLevel: "" })

  // const inputOnChange = (property, value) => {

  //     setFormObject(property => ({
  //         ...property,
  //         [property]: value
  //     }))
  // }

  // const formSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(formObject);

  // }

  const siteLevel = useRef();

  const collectInputFieldData = async (url) => {
    const natureOfSiteApp = document.getElementById("natureOfSiteApp").value;
    const natureOfSiteObs = document.getElementById("natureOfSiteObs").value;
    const siteLevelApp = siteLevel.current.value;
    const siteLevelObs = document.getElementById("siteLevelObs").value;
    const totalAreaAsOnGroundApp = document.getElementById(
      "totalAreaAsOnGroundApp"
    ).value;
    const totalAreaAsOnGroundObs = document.getElementById(
      "totalAreaAsOnGroundObs"
    ).value;
    const workCommentedApp = document.getElementById("workCommentedApp").value;
    const workCommentedObs = document.getElementById("workCommentedObs").value;

    const groundPosition = {
      natureOfSite: [natureOfSiteApp, natureOfSiteObs],
      siteLevel: [siteLevelApp, siteLevelObs],
      totalAreaAsOnGround: [totalAreaAsOnGroundApp, totalAreaAsOnGroundObs],
      workCommented: [workCommentedApp, workCommentedObs],
    };

    const northApp = document.getElementById("northApp").value;
    const northObs = document.getElementById("northObs").value;
    const southApp = document.getElementById("southApp").value;
    const southObs = document.getElementById("southObs").value;
    const eastApp = document.getElementById("eastApp").value;
    const eastObs = document.getElementById("eastObs").value;
    const westApp = document.getElementById("westApp").value;
    const westObs = document.getElementById("westObs").value;
    const scheduleOfTheDocumentsApp = document.getElementById(
      "scheduleOfTheDocumentsApp"
    ).value;
    const scheduleOfTheDocumentsObs = document.getElementById(
      "scheduleOfTheDocumentsObs"
    ).value;

    const siteBoundaries = {
      north: [northApp, northObs],
      south: [southApp, southObs],
      east: [eastApp, eastObs],
      west: [westApp, westObs],
      scheduleOfTheDocuments: [
        scheduleOfTheDocumentsApp,
        scheduleOfTheDocumentsObs,
      ],
    };

    const accessRoad = {};
    const landUse = {};

    const siteInspection = {
      groundPosition,
      siteBoundaries,
      accessRoad,
      landUse,
    };

    console.log(siteInspection, "SITE INSPECTION");

    return await sendUserDataIntoDB(url, "PATCH", {
      siteInspection,
    });
  };

  // Classes :
  const tableDataClass =
    "whitespace-nowrap border-r px-6 py-4 border-neutral-500";
  const inputClass = "input rounded-none w-full max-w-xs focus:outline-none";
  const inputTableDataClass = "whitespace-nowrap border-r border-neutral-500";

  return (
    <div
      // onSubmit={formSubmit}
      className="flex flex-col sm:px-6 lg:px-8"
    >
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden">
            <table className="min-w-full border text-center text-sm font-light border-neutral-500">
              <thead className="border-b font-medium border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 border-neutral-500"
                  >
                    {" "}
                    Si. No.
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 border-neutral-500"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 border-neutral-500"
                  >
                    As per Application
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Observation
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Ground Position  */}
                <tr className="border-b border-neutral-500">
                  <td rowSpan="5" className={tableDataClass}>
                    1
                  </td>
                  <td
                    colSpan="3"
                    className={`${tableDataClass} text-base font-semibold bg-gray-200`}
                  >
                    Ground Position
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Nature of site</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      id="natureOfSiteApp"
                      // onChange={(e) => { inputOnChange("natureOfSite", e.target.value) }}
                      // value={formObject.natureOfSite}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="natureOfSiteObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Site level</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                      ref={siteLevel}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="siteLevelObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>
                    Total area as on ground in Sq.M.
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="totalAreaAsOnGroundApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="totalAreaAsOnGroundObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Work commented</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="workCommentedApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="workCommentedObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Site Boundaries  */}
                <tr className="border-b border-neutral-500">
                  <td rowSpan="6" className={tableDataClass}>
                    2
                  </td>
                  <td
                    colSpan="3"
                    className={`${tableDataClass} text-base font-semibold bg-gray-200`}
                  >
                    Site Boundaries
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>North</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="northApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="northObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>South</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="southApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="southObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>East</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="eastApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="eastObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>West</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="westApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="westObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>
                    Whether the above physical
                    <br />
                    feature are talking / Not talking
                    <br />
                    with the schedule of the Documents.
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="scheduleOfTheDocumentsApp"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="scheduleOfTheDocumentsObs"
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Access Road  */}
                <tr className="border-b border-neutral-500">
                  <td rowSpan="5" className={tableDataClass}>
                    3
                  </td>
                  <td
                    colSpan="3"
                    className={`${tableDataClass} text-base font-semibold bg-gray-200`}
                  >
                    Access Road
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Nature of Road</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Status of Approach Road</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Public"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Public/Private"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Road Width</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>
                    Scope of Road Widening in Mts.
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input type="text" placeholder="0" className={inputClass} />
                  </td>
                </tr>

                {/* Land Use  */}
                <tr className="border-b border-neutral-500">
                  <td rowSpan="5" className={tableDataClass}>
                    4
                  </td>
                  <td
                    colSpan="3"
                    className={`${tableDataClass} text-base font-semibold bg-gray-200`}
                  >
                    Land Use
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>
                    Land Use as per Master Plan
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Proposed activity</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Road Width</td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>
                    Whether permission as per Zoning Regulations
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      type="text"
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Radio Button  */}
      <div className="grid-cols-1 lg:grid-cols-2 items-center my-5">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="radioPs"
            className="radio border border-[#10AC84] h-4 w-4"
            value="Approved"
            // checked={radioPs === 'Approved'}
          />
          <span className="ml-2 text-base">Approved</span>
        </label>
        <label className="inline-flex items-center md:ml-3">
          <input
            type="radio"
            name="radioPs"
            className="radio border border-[#10AC84] h-4 w-4"
            value="Shortfall"
            // checked={radioPs === 'Shortfall'}
          />
          <span className="ml-2 text-base">Shortfall</span>
        </label>
      </div>

      {/* Comment Box  */}
      <div className="flex items-center">
        <div className="my-4 basis-[80%]">
          <label
            htmlFor="ltpAddress"
            className="block text-gray-600 mb-1 font-semibold dark:text-gray-100"
          >
            Recommendations
          </label>
          <textarea
            id="recommendations"
            name="Recommendations"
            rows="5"
            className="w-full px-3 py-2 border border-green-600 rounded-lg  dark:text-black"
            placeholder="Comments"
          ></textarea>
        </div>
        {/* <div className="basic-[20%]">
          <button className="btn btn-md text-sm px-3 mt-10 ml-3 bg-green-300 hover:bg-green-400 hover:shadow-md transition-all duration-500">
            Save
          </button>
        </div> */}
      </div>
      <button type="submit" onClick={collectInputFieldData} className="btn">
        Submit
      </button>

      {/* save & continue  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={collectInputFieldData}
      />
    </div>
  );
};

export default SiteInspection;
