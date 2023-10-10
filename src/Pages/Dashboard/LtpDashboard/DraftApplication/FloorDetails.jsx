import React, { useState } from "react";

const FloorDetails = ({
  index,
  floor,
  length,
  increaseFloorNo,
  handleBuiltUpArea,
  handleParkingArea,
  plotDetailsFloor,
  parkingAreaValue,
  builtUpAreaValue,
}) => {
  const [floorChange, setFloorChange] = useState("");

  console.log(plotDetailsFloor, "PLOTDETAILS floor");
  const handleFloorChange = (e) => {
    setFloorChange(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-center mx-3">
        <label className="block text-gray-600 mb-1 font-semibold dark:text-gray-100">
          <span>Floor Name</span>
        </label>
        <select
          id={`floorName${index}`}
          name={`floorName${index}`}
          className="w-full px-3 py-[10px] border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200"
          value={floorChange ? floorChange : plotDetailsFloor?.name}
          onChange={handleFloorChange}
        >
          <option disabled selected value="Select Floor Name">
            Select Floor Name
          </option>
          <option value='Stilt / Parking Floor'>Stilt / Parking Floor</option>
          <option value='Ground floor'>Ground floor</option>
          <option value='First Floor'>First Floor</option>
          <option value='Second Floor'>Second Floor</option>
        </select>
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block text-gray-600 mb-1 font-semibold dark:text-gray-100"
        >
          Built up area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`builtUpArea${index}`}
          name={`builtUpArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200"
          defaultValue={
            builtUpAreaValue ? builtUpAreaValue : plotDetailsFloor?.builtUpArea
          }
          onChange={(e) => handleBuiltUpArea(e.target.value, index)}
        />
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block text-gray-600 mb-1 font-semibold dark:text-gray-100"
        >
          Parking Area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`parkingArea${index}`}
          name={`parkingArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200"
          defaultValue={
            parkingAreaValue ? parkingAreaValue : plotDetailsFloor?.parkingArea
          }
          onChange={(e) => handleParkingArea(e.target.value, index)}
        />
      </div>

      <div className="flex justify-start items-center ml-3 mt-6">
        {index === length - 1 && index < 3 && (
          <div className="flex justify-center items-center">
            <button
              className="text-xl rounded-full w-[30px] h-[30px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer shadow-lg shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold"
              onClick={increaseFloorNo}
            >
              +
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloorDetails;
