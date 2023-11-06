import React, { useEffect, useState } from "react";
import DocumentFooter from "./DocumentFooter";
import { Link } from "react-router-dom";

function DrawingTable({
  setApprovedConfirmation,
  setRecommendationMessage,
  recomendationMessage,
  approvedConfirmation,
  applicationData,
  submitData,
}) {
  console.log(applicationData, "Application data");

  const plotDetails = applicationData?.plotDetails;

  const numberOfFloors = plotDetails?.floorDetails?.length ?? 0;

  const [floorValue, setFloorValue] = useState({
    "Stilt / Parking Floor": "",
    "Ground Floor": "",
    "First Floor": "",
    "Second Floor": "",
  });

  // plotDetails?.floorDetails?.forEach((value, index) => {
  //   setFloorValue
  // });

  console.log(plotDetails, "Plot details");

  const [preDeterminedValue, setPreDeterminedValue] = useState({
    front: "",
    rare: "",
    side1: "",
    side2: "",
  });

  // const netPlotAreaCal = 201;
  // const buildingExcludeStilt = 6;
  // const proposedRoadMts = 31;

  // const netPlotAreaValue = netPlotAreaCal;
  // const buildingHeight = buildingExcludeStilt;
  // const proposedRoadValue = proposedRoadMts;

  const netPlotAreaValue = plotDetails?.netPlotAreaCal;
  const buildingHeight = plotDetails?.buildingExcludeStilt;
  const proposedRoadValue = plotDetails?.proposedRoadMts;

  const decideSetBackValue = (roadValue, serial) => {
    const setBackValue = [
      [1.5, 1.5, 3, 3, 3, "-"],
      [1.5, 1.5, 3, 3, 3, "-"],
      [1.5, 1.5, 3, 3, 3, 0.5],
      [1.5, 1.5, 3, 3, 3, 1.0],
      [2, 3, 3, 4, 5, 1.0],
      [2, 3, 3, 5, 6, 1.5],
    ];

    const setBackValueIndex = serial;

    console.log(
      setBackValue,
      setBackValueIndex,
      setBackValue[setBackValueIndex],
      "ddsfsdfds"
    );

    const matchArrLength = setBackValue[setBackValueIndex].length;

    console.log(matchArrLength);

    if (roadValue <= 12) {
      console.log(setBackValue[setBackValueIndex], "VALUE", serial);
      setPreDeterminedValue((prev) => {
        prev["front"] = setBackValue[setBackValueIndex][0];
        prev["rare"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side1"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side2"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        return prev;
      });
    }

    if (roadValue > 12 && roadValue <= 18) {
      console.log(setBackValue[setBackValueIndex][1]);
      setPreDeterminedValue((prev) => {
        prev["front"] = setBackValue[setBackValueIndex][1];
        prev["rare"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side1"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side2"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        return prev;
      });
    }

    if (roadValue > 18 && roadValue <= 24) {
      setPreDeterminedValue((prev) => {
        prev["front"] = setBackValue[setBackValueIndex][2];
        prev["rare"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side1"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side2"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        return prev;
      });
    }

    if (roadValue > 24 && roadValue <= 30) {
      setPreDeterminedValue((prev) => {
        prev["front"] = setBackValue[setBackValueIndex][3];
        prev["rare"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side1"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side2"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        return prev;
      });
    }
    if (roadValue > 30) {
      setPreDeterminedValue((prev) => {
        prev["front"] = setBackValue[setBackValueIndex][4];
        prev["rare"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side1"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        prev["side2"] = setBackValue[setBackValueIndex][matchArrLength - 1];
        return prev;
      });
    }
  };

  useEffect(() => {
    // table first condition
    if (netPlotAreaValue <= 50 && buildingHeight <= 7) {
      decideSetBackValue(proposedRoadValue, 0);
    }

    // table 2nd condition
    if (netPlotAreaValue > 50 && netPlotAreaValue <= 100) {
      if (buildingHeight <= 7) {
        decideSetBackValue(proposedRoadValue, 1);
      }
      if (buildingHeight > 7 && buildingHeight <= 10) {
        decideSetBackValue(proposedRoadValue, 2);
      }
    }

    // table 3rd condition
    if (
      netPlotAreaValue > 100 &&
      netPlotAreaValue <= 200 &&
      buildingHeight <= 10
    ) {
      decideSetBackValue(proposedRoadValue, 3);
    }

    // table 4th conditin
    if (netPlotAreaValue > 200 && netPlotAreaValue <= 300) {
      if (buildingHeight <= 7) {
        decideSetBackValue(proposedRoadValue, 4);
      }
      if (buildingHeight > 7 && buildingHeight <= 10) {
        decideSetBackValue(proposedRoadValue, 5);
      }
    }
  }, []);

  // const TrData = [
  //   { "Proposed Site Area": ["", "", ""] },
  //   { "Access Road Width": ["", "", ""] },
  //   { "Scope of Road Windering": ["", "", ""] },
  //   { Setbacks: ["", "", ""] },
  //   { North: ["", "", ""] },
  //   { South: ["", "", "Hello"] },
  //   { East: ["", "", ""] },
  //   { West: ["", "", ""] },
  //   { "Number of floors": ["", "", ""] },
  //   { "No. of Units": ["", "", ""] },
  //   { "Green Strip": ["Yes", "Yes", "Yes/No"] },
  //   { "Staircase Width": ["", "", ""] },
  // ];
  // const skipNumber = [5, 6, 7, 8];

  console.log(submitData?.drawingTableObs?.proposedSitObs, "ADK");

  return (
    <div>
      <div className="overflow-x-auto mb-16 w-full px-4">
        <p className="font-bold text-lg ml-5">Drawing Scrutiny report</p>

        <div className="container mx-auto px-4 font-roboto ">
          <div className="py-4">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal text-center">
                  {/* Table Header */}
                  <thead className="bg-normalViolet">
                    <tr className="text-sm md:text-base text-white hover:bg-normalViolet">
                      <th className="p-3 border-b-2 border-gray-200  text-white text-sm font-semibold uppercase tracking-wider ">
                        Sl. No.
                      </th>
                      <th className="p-3 border-b-2 border-gray-200  text-white  text-sm font-semibold uppercase tracking-wider ">
                        Description
                      </th>
                      <th className="p-3 border-b-2 border-gray-200  text-white  text-sm font-semibold uppercase tracking-wider ">
                        As per G.O.s
                      </th>
                      <th className="p-3 border-b-2 border-gray-200  text-white  text-sm font-semibold uppercase tracking-wider ">
                        As on Plan
                      </th>
                      <th className="p-3 border-b-2 border-gray-200  text-white  text-sm font-semibold uppercase tracking-wider ">
                        Observation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    {/* 1st row  */}
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">1</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Proposed Site / Plot area
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.proposedPlotAreaCal ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="proposedSiteObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.proposedSiteObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">2</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Access Road Width
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.roadWideningAreaCal ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="accessRoadWidthObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.accessRoadWidthObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">3</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Scope of Road windening
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.roadWideningAreaCal ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="scopeRoadWideObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.scopeOfRoadWideningObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">4</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Net Site / Plot area
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.netPlotAreaCal ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="netSiteObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.netPlotAreaObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">5</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Building Height
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.buildingExcludeStilt ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="buildingHeightObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.buildingHeightObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">6</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Setbacks</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="setBacksObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.setBacksObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Front</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {preDeterminedValue?.front}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.frontSetback ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="frontObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.fontObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Rare</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {preDeterminedValue?.rare}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.rareSetback ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="rareObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.rareObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Side 1</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {preDeterminedValue?.side1}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.side1Setback ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="sideOneObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.sideOneObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Side 2</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {preDeterminedValue?.side2}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.side2Setback}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="sideTwoObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.sideTwoObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">7</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Number of floors
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {numberOfFloors ?? 0}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="numberOfFloorsObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.floorObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Stilt Floor</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="stiltFloorObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.stiltFloorObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Ground Floor
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="groundFloorObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.groundFloorObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">First Floor</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="firstFloorObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.firstFloorObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Second Floor
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="secondFloorObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.secondFloorObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">8</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Green Strip</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          1mtr wide required
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">Yes</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <select
                          id="greenStripObs"
                          className=" w-1/6 outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.greenStripObs ?? ""
                          }
                        >
                          <option value="">Yes</option>
                          <option>No</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">9</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Staircase width
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Minimum 2.00 mtr
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base"></td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="stairCaseWidthObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={
                            submitData?.drawingTableObs?.stairCaseWidthObs
                          }
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">10</p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          No. of Units
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          Maximum 4 no.
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <p className="text-gray-900 break-words">
                          {plotDetails?.noOfUnits ?? ""}
                        </p>
                      </td>
                      <td className="p-3  border-b border-gray-200 text-base">
                        <input
                          id="unitObs"
                          type="text"
                          className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none bg-gray-50"
                          defaultValue={submitData?.drawingTableObs?.unitsObs}
                          // onChange={handleRoadWideningAreaChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocumentFooter
        setApprovedConfirmation={setApprovedConfirmation}
        setRecommendationMessage={setRecommendationMessage}
        recomendationMessage={recomendationMessage}
        approvedConfirmation={approvedConfirmation}
        submitData={submitData}
      />
    </div>
  );
}

export default DrawingTable;
