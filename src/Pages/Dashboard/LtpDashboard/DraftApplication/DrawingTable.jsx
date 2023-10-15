import React, { useEffect, useState } from "react";
import DocumentFooter from "./DocumentFooter";
import { Link } from "react-router-dom";

function DrawingTable({
  setApprovedConfirmation,
  setRecomendationMessage,
  applicationData,
  submitData,
}) {
  console.log(applicationData, "Application data");

  const plotDetails = applicationData?.plotDetails;

  const numberOfFloors = plotDetails?.floorDetails?.length ?? 0;

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
        <p>Drawing Scrutiny report</p>
        <table className="table text-black table-sm mt-4">
          {/* Table Header */}
          <thead className="text-black">
            <tr>
              <th className="border border-black w-5">Sl. No.</th>
              <th className="border border-black">Description</th>
              <th className="border border-black">As per G.O.s</th>
              <th className="border border-black">As on Plan</th>
              <th className="border border-black">Observation</th>
            </tr>
          </thead>
          <tbody>
            {/* {TrData.map((data, index) => {
              return (
                <tr key={index}>
                  <th className="border border-black bg-white w-8 text-center">
                    {skipNumber.includes(index + 1)
                      ? ""
                      : skipNumber.find((num) => num < index + 1)
                      ? index - 3
                      : index + 1}
                  </th>
                  <td className="border border-black bg-white">
                    {Object.keys(TrData[index])}
                  </td>
                  <td className="border border-black bg-white">
                    {Object.values(data)[0][0]}
                  </td>
                  <td className="border border-black bg-white">
                    {Object.values(data)[0][1]}
                  </td>
                  <td className="border border-black bg-white">
                    {Object.values(data)[0][2]}
                  </td>
                </tr>
              );
            })} */}
            {/* 1st row  */}
            <tr>
              <td>1</td>
              <td>Proposed Site / Plot area</td>
              <td></td>
              <td>{plotDetails?.proposedPlotAreaCal ?? ""}</td>
              <td>
                <input
                  id="proposedSiteObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.proposedSiteObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Access Road Width</td>
              <td></td>
              <td>{plotDetails?.roadWideningAreaCal ?? ""}</td>
              <td>
                <input
                  id="accessRoadWidthObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.accessRoadWidthObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Scope of Road windening</td>
              <td></td>
              <td>{plotDetails?.roadWideningAreaCal ?? ""}</td>
              <td>
                <input
                  id="scopeRoadWideObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={
                    submitData?.drawingTableObs?.scopeOfRoadWideningObs
                  }
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Net Site / Plot area</td>
              <td></td>
              <td>{plotDetails?.netPlotAreaCal ?? ""}</td>
              <td>
                <input
                  id="netSiteObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.netPlotAreaObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Building Height</td>
              <td></td>
              <td>{plotDetails?.buildingExcludeStilt ?? ""}</td>
              <td>
                <input
                  id="buildingHeightObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.buildingHeightObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Setbacks</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="setBacksObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.setBacksObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Front</td>
              <td>{preDeterminedValue?.front}</td>
              <td>{plotDetails?.frontSetback ?? ""}</td>
              <td>
                <input
                  id="frontObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.fontObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Rare</td>
              <td>{preDeterminedValue?.rare}</td>
              <td>{plotDetails?.rareSetback ?? ""}</td>
              <td>
                <input
                  id="rareObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.rareObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Side 1</td>
              <td>{preDeterminedValue?.side1}</td>
              <td>{plotDetails?.side1Setback ?? ""}</td>
              <td>
                <input
                  id="sideOneObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.sideOneObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Side 2</td>
              <td>{preDeterminedValue?.side2}</td>
              <td>{plotDetails?.side2Setback}</td>
              <td>
                <input
                  id="sideTwoObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.sideTwoObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Number of floors</td>
              <td></td>
              <td>{numberOfFloors ?? 0}</td>
              <td>
                <input
                  id="numberOfFloorsObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.floorObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Stilt Floor</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="stiltFloorObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.stiltFloorObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Ground Floor</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="groundFloorObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.groundFloorObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>First Floor</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="firstFloorObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.firstFloorObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Second Floor</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="secondFloorObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.secondFloorObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Green Strip</td>
              <td>1mtr wide required</td>
              <td>Yes</td>
              <td>
                <select
                  id="greenStripObs"
                  className=" w-1/6 outline-none"
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
              <td>9</td>
              <td>Staircase width</td>
              <td>Minimum 2.00 mtr</td>
              <td></td>
              <td>
                <input
                  id="stairCaseWidthObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.stairCaseWidthObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>No. of Units</td>
              <td>Maximum 4 no.</td>
              <td>{plotDetails?.noOfUnits ?? ""}</td>
              <td>
                <input
                  id="unitObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  defaultValue={submitData?.drawingTableObs?.unitsObs}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DocumentFooter
        setApprovedConfirmation={setApprovedConfirmation}
        setRecomendationMessage={setRecomendationMessage}
        submitData={submitData}
      />
    </div>
  );
}

export default DrawingTable;
