import React, { useContext, useEffect, useRef, useState } from "react";
import SaveData from "../../LtpDashboard/DraftApplication/SaveData";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUploadInput from "./ImageUploadInput";

const SiteInspection = () => {
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps] = stepperData;

  const [groundPosition, setGroundPosition] = useState("");
  const [siteBoundaries, setSiteBoundaries] = useState("");
  const [accessRoad, setAccessRoad] = useState("");
  const [landUse, setLandUse] = useState("");
  const [decision, setDecision] = useState("");
  const [recommendations, setRecommendations] = useState("");


  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      console.log(applicationData, "applicationData");

      const groundPosition = applicationData?.siteInspection?.groundPosition;
      setGroundPosition(groundPosition);

      const siteBoundaries = applicationData?.siteInspection?.siteBoundaries;
      setSiteBoundaries(siteBoundaries);

      const accessRoad = applicationData?.siteInspection?.accessRoad;
      setAccessRoad(accessRoad);

      const landUse = applicationData?.siteInspection?.landUse;
      setLandUse(landUse);

      const decision = applicationData?.siteInspection?.decision;
      setDecision(decision);

      const recommendations = applicationData?.siteInspection?.recommendations;
      setRecommendations(recommendations);
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

  // Get SiteInspection Data :

  // Decision :
  const [radioPs, setRadioPs] = useState("");
  const handleRadioPs = (e) => {
    setRadioPs(e.target.value);
  };

  const collectInputFieldData = async (url) => {
    // Ground Position :
    const natureOfSiteApp = document.getElementById("natureOfSiteApp").value;
    const natureOfSiteObs = document.getElementById("natureOfSiteObs").value;
    const siteLevelApp = document.getElementById("siteLevelApp").value;
    const siteLevelObs = document.getElementById("siteLevelObs").value;
    const totalAreaAsOnGroundApp = document.getElementById(
      "totalAreaAsOnGroundApp"
    ).value;
    const totalAreaAsOnGroundObs = document.getElementById(
      "totalAreaAsOnGroundObs"
    ).value;
    const workCommentedApp = document.getElementById("workCommentedApp").value;
    const workCommentedObs = document.getElementById("workCommentedObs").value;
    // Site Boundaries :
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
    // Access Road :
    const natureOfRoadApp = document.getElementById("natureOfRoadApp").value;
    const natureOfRoadObs = document.getElementById("natureOfRoadObs").value;
    const approachRoadApp = document.getElementById("approachRoadApp").value;
    const approachRoadObs = document.getElementById("approachRoadObs").value;
    const roadWidthApp = document.getElementById("roadWidthApp").value;
    const roadWidthObs = document.getElementById("roadWidthObs").value;
    const scopeOfRoadApp = document.getElementById("scopeOfRoadApp").value;
    const scopeOfRoadObs = document.getElementById("scopeOfRoadObs").value;
    // Land Use :
    const landUseApp = document.getElementById("landUseApp").value;
    const landUseObs = document.getElementById("landUseObs").value;
    const proposedActivityApp = document.getElementById(
      "proposedActivityApp"
    ).value;
    const proposedActivityObs = document.getElementById(
      "proposedActivityObs"
    ).value;
    const landRoadWidthApp = document.getElementById("landRoadWidthApp").value;
    const landRoadWidthObs = document.getElementById("landRoadWidthApp").value;
    const whetherPermissionApp = document.getElementById(
      "whetherPermissionApp"
    ).value;
    const whetherPermissionObs = document.getElementById(
      "whetherPermissionObs"
    ).value;
    // Comments
    const recommendations = document.getElementById("recommendations").value;

    const groundPosition = {
      natureOfSite: [natureOfSiteApp, natureOfSiteObs],
      siteLevel: [siteLevelApp, siteLevelObs],
      totalAreaAsOnGround: [totalAreaAsOnGroundApp, totalAreaAsOnGroundObs],
      workCommented: [workCommentedApp, workCommentedObs],
    };

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

    const accessRoad = {
      natureOfRoad: [natureOfRoadApp, natureOfRoadObs],
      approachRoad: [approachRoadApp, approachRoadObs],
      accessRoadWidth: [roadWidthApp, roadWidthObs],
      scopeOfRoad: [scopeOfRoadApp, scopeOfRoadObs],
    };

    const landUse = {
      landUse: [landUseApp, landUseObs],
      proposedActivity: [proposedActivityApp, proposedActivityObs],
      landRoadWidth: [landRoadWidthApp, landRoadWidthObs],
      whetherPermission: [whetherPermissionApp, whetherPermissionObs],
    };

    // All Information :
    const siteInspection = {
      groundPosition,
      siteBoundaries,
      accessRoad,
      landUse,
      decision: radioPs,
      recommendations,
    };

    console.log(siteInspection, "SITE INSPECTION");

    // fetch(`https://residential-building.vercel.app/recommendDataOfPs?appNo=${applicationNo}`, {
    //     method: "PATCH",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify({ siteInspection }),
    // })
    //     .then((res) => res.json())
    //     .then((result) => {
    //         console.log(result);
    //         if (result.acknowledged) {
    //             toast.success("Saved data successfully");
    //         } else {
    //             toast.error("Server Error");
    //         }
    //     });

    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo,
      siteInspection,
    });
  };

  const sentPsDecision = async (url) => {
    url = `https://residential-building.vercel.app/decisionOfPs?appNo=${applicationNo}`;
    console.log(url);

    const config = {
      method: "DELETE",
    };

    const response = await fetch(url, config);
    return await response.json();
  };


  const tableDataClass =
    "whitespace-nowrap border-r px-6 py-4 border-neutral-500";
  const inputClass = "input rounded-none w-full max-w-xs focus:outline-none dark:text-black";
  const inputTableDataClass = "whitespace-nowrap border-r border-neutral-500";

  return (
    <div className="flex flex-col sm:px-6 lg:px-8 dark:text-gray-100">
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
                    Sl. No.
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
                    className={`${tableDataClass} text-base font-semibold bg-gray-200 dark:text-black`}
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
                      defaultValue={groundPosition?.natureOfSite?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="natureOfSiteObs"
                      defaultValue={groundPosition?.natureOfSite?.[1]}
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
                      id="siteLevelApp"
                      type="text"
                      defaultValue={groundPosition?.siteLevel?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="siteLevelObs"
                      type="text"
                      defaultValue={groundPosition?.siteLevel?.[1]}
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
                      defaultValue={groundPosition?.totalAreaAsOnGround?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="totalAreaAsOnGroundObs"
                      type="text"
                      defaultValue={groundPosition?.totalAreaAsOnGround?.[1]}
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
                      defaultValue={groundPosition?.workCommented?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="workCommentedObs"
                      type="text"
                      defaultValue={groundPosition?.workCommented?.[1]}
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
                    className={`${tableDataClass} text-base font-semibold bg-gray-200 dark:text-black`}
                  >
                    Site Boundaries
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>North</td>
                  <td className='whitespace-nowrap border-r border-neutral-500'>
                    {/* <input
                      id="northApp"
                      type="text"
                      defaultValue={siteBoundaries?.north?.[0]}
                      placeholder="Yes/No"
                      className='input rounded-none w-full max-w-xs focus:outline-none'
                    /> */}

                    <ImageUploadInput
                      id='northApp'
                    />

                  </td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="northObs"
                      type="text"
                      defaultValue={siteBoundaries?.north?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}

                    <ImageUploadInput
                      id='northObs'
                    />

                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>South</td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="southApp"
                      type="text"
                      defaultValue={siteBoundaries?.south?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput
                      id='southApp'
                    />

                  </td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="southObs"
                      type="text"
                      defaultValue={siteBoundaries?.south?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput
                      id='southObs'
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>East</td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="eastApp"
                      type="text"
                      defaultValue={siteBoundaries?.east?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput id='eastApp' />
                  </td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="eastObs"
                      type="text"
                      defaultValue={siteBoundaries?.east?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput id='eastObs' />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>West</td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="westApp"
                      type="text"
                      defaultValue={siteBoundaries?.west?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput id='westApp' />
                  </td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="westObs"
                      type="text"
                      defaultValue={siteBoundaries?.west?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    /> */}
                    <ImageUploadInput id='westObs' />
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
                      defaultValue={siteBoundaries?.scheduleOfTheDocuments?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="scheduleOfTheDocumentsObs"
                      type="text"
                      defaultValue={siteBoundaries?.scheduleOfTheDocuments?.[1]}
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
                    className={`${tableDataClass} text-base font-semibold bg-gray-200 dark:text-black`}
                  >
                    Access Road
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Nature of Road</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="natureOfRoadApp"
                      type="text"
                      defaultValue={accessRoad?.natureOfRoad?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="natureOfRoadObs"
                      type="text"
                      defaultValue={accessRoad?.natureOfRoad?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Status of Approach Road</td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="approachRoadApp"
                      type="text"
                      defaultValue={accessRoad?.approachRoad?.[0]}
                      placeholder="Public"
                      className={inputClass}
                    /> */}
                    <div className="flex flex-col justify-center mx-3">
                      <select
                        id="natureOfRoad"
                        className='w-full px-3 py-[10px] border border-violet-500 max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200'
                      // value={natureOfRoadValue ? natureOfRoadValue : natureOfRoad}
                      // onChange={handleNatureOfRoad}
                      >
                        <option value='Private'>Private</option>
                        <option selected value='Public'>Public</option>
                      </select>
                    </div>
                  </td>
                  <td className={inputTableDataClass}>
                    {/* <input
                      id="approachRoadObs"
                      type="text"
                      defaultValue={accessRoad?.approachRoad?.[1]}
                      placeholder="Public/Private"
                      className={inputClass}
                    /> */}
                    <div className="flex flex-col justify-center mx-3">
                      <select
                        id="natureOfRoad"
                        className='w-full px-3 py-[10px] border border-violet-500 max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200'
                      // value={natureOfRoadValue ? natureOfRoadValue : natureOfRoad}
                      // onChange={handleNatureOfRoad}
                      >
                        <option selected value='Private'>Select option</option>
                        <option value='Private'>Private</option>
                        <option value='Public'>Public</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Road Width</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="roadWidthApp"
                      type="text"
                      defaultValue={accessRoad?.accessRoadWidth?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="roadWidthObs"
                      type="text"
                      defaultValue={accessRoad?.accessRoadWidth?.[1]}
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
                      id="scopeOfRoadApp"
                      type="text"
                      defaultValue={accessRoad?.scopeOfRoad?.[0]}
                      placeholder="0"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="scopeOfRoadObs"
                      defaultValue={accessRoad?.scopeOfRoad?.[1]}
                      type="text"
                      placeholder="0"
                      className={inputClass}
                    />
                  </td>
                </tr>

                {/* Land Use  */}
                <tr className="border-b border-neutral-500">
                  <td rowSpan="5" className={tableDataClass}>
                    4
                  </td>
                  <td
                    colSpan="3"
                    className={`${tableDataClass} text-base font-semibold bg-gray-200 dark:text-black`}
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
                      id="landUseApp"
                      type="text"
                      defaultValue={landUse?.landUse?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="landUseObs"
                      type="text"
                      defaultValue={landUse?.landUse?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Proposed activity</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="proposedActivityApp"
                      type="text"
                      defaultValue={landUse?.proposedActivity?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="proposedActivityObs"
                      type="text"
                      defaultValue={landUse?.proposedActivity?.[1]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-500">
                  <td className={tableDataClass}>Road Width</td>
                  <td className={inputTableDataClass}>
                    <input
                      id="landRoadWidthApp"
                      type="text"
                      defaultValue={landUse?.landRoadWidth?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="landRoadWidthObs"
                      type="text"
                      defaultValue={landUse?.landRoadWidth?.[1]}
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
                      id="whetherPermissionApp"
                      type="text"
                      defaultValue={landUse?.whetherPermission?.[0]}
                      placeholder="Yes/No"
                      className={inputClass}
                    />
                  </td>
                  <td className={inputTableDataClass}>
                    <input
                      id="whetherPermissionObs"
                      type="text"
                      defaultValue={landUse?.whetherPermission?.[1]}
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
            checked={
              radioPs === "Approved"
                ? radioPs === "Approved"
                : decision === "Approved"
            }
            onChange={handleRadioPs}
          />
          <span className="ml-2 text-base">Approved</span>
        </label>
        <label className="inline-flex items-center md:ml-3">
          <input
            type="radio"
            name="radioPs"
            className="radio border border-[#10AC84] h-4 w-4"
            value="Shortfall"
            checked={
              radioPs === "Shortfall"
                ? radioPs === "Shortfall"
                : decision === "Shortfall"
            }
            onChange={handleRadioPs}
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
            defaultValue={recommendations}
            className="w-full px-3 py-2 border border-green-600 rounded-lg  dark:text-black"
            placeholder="Comments"
          ></textarea>
        </div>
      </div>

      {/* save & continue  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={collectInputFieldData}
        sentData={sentPsDecision}
      />
    </div>
  );
};

export default SiteInspection;
