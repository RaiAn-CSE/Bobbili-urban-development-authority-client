import React, { useState } from "react";
import DocumentFooter from "./DocumentFooter";
import { Link } from "react-router-dom";

function DrawingTable({ setApprovedConfirmation, setRecomendationMessage }) {
  const TrData = [
    { "Proposed Site Area": ["", "", ""] },
    { "Access Road Width": ["", "", ""] },
    { "Scope of Road Windering": ["", "", ""] },
    { Setbacks: ["", "", ""] },
    { North: ["", "", ""] },
    { South: ["", "", "Hello"] },
    { East: ["", "", ""] },
    { West: ["", "", ""] },
    { "Number of floors": ["", "", ""] },
    { "No. of Units": ["", "", ""] },
    { "Green Strip": ["Yes", "Yes", "Yes/No"] },
    { "Staircase Width": ["", "", ""] },
  ];
  const skipNumber = [5, 6, 7, 8];
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
              <td></td>
              <td>
                <input
                  id="proposedRoadObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Access Road Width</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="accessRoadWidthObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Scope of Road windening</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="scopeRoadWideObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Net Site / Plot area</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="netSiteObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Building Hight</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="buildingHeightObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
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
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Front</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="frontObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Rare</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="rareObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Side 1</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="sideOneObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Side 2</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="sideTwoObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Number of floors</td>
              <td></td>
              <td></td>
              <td>
                <input
                  id="numberOfFloorsObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
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
                  // defaultValue={roadWideningArea}
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
                  // defaultValue={roadWideningArea}
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
                  // defaultValue={roadWideningArea}
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
                  // defaultValue={roadWideningArea}
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
                <select id="greenStripObs" className=" outline-none">
                  <option>Yes</option>
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
                  // defaultValue={roadWideningArea}
                  // onChange={handleRoadWideningAreaChange}
                />
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>No. of Units</td>
              <td>Maximum 4 no.</td>
              <td></td>
              <td>
                <input
                  id="unitObs"
                  type="text"
                  className="w-full px-3 py-2  rounded-lg max-w-xs dark:text-black focus:outline-none"
                  // defaultValue={roadWideningArea}
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
      />
    </div>
  );
}

export default DrawingTable;
