import React, { useEffect, useState } from "react";

const FloorDetails = ({
  index,
  floor,
  length,
  increaseFloorNo,
  decreaseFloorNo,
  handleBuiltUpArea,
  handleParkingArea,
  plotDetailsFloor,
  parkingAreaValue,
  builtUpAreaValue,
  floorOptions,
  setFloorOptions,
  individualFloorSelected,
  setIndividualFloorSelected,
  isReadOnly,
}) => {
  const [floorChange, setFloorChange] = useState("select");

  const { role } = JSON.parse(localStorage.getItem("loggedUser"));

  const [selectedFloor, setSelectedFloor] = useState("");

  useEffect(() => {
    setSelectedFloor(plotDetailsFloor?.name ?? "select");
  }, [plotDetailsFloor]);

  // a function to find old selected value holding by others floor select boxes and if any option existing return 1 else return 0
  const findOldSelectedValue = (value) => {
    let flag = 0;

    individualFloorSelected.forEach((value) => {
      if (value?.length) {
        flag = 1;
      }
    });

    // console.log(selectedFloor, "SELELELE");

    if (flag === 1) {
      const searchInIndividualFloorSelected = individualFloorSelected.findIndex(
        (floorSelected) => floorSelected === value
      );

      // console.log(searchInIndividualFloorSelected);
      if (searchInIndividualFloorSelected === -1) {
        return 0;
      } else {
        return 1;
      }
    }
  };

  const handleFloorChange = (e, index) => {
    setFloorChange(e.target.value);

    setSelectedFloor(e.target.value);

    setIndividualFloorSelected((prev) => {
      const oldValue = [...prev];

      oldValue[index] = e.target.value;

      return oldValue;
    });
  };

  // console.log(selectedFloor?.length ? selectedFloor : floorChange, "SELECTED");

  const page = JSON.parse(localStorage.getItem("page"));

  const hideBtn =
    page === "submit" ||
    page === "approved" ||
    page === "shortfall" ||
    role.toLowerCase() === "ps";

  return (
    <>
      <div className="flex flex-col justify-center mx-3">
        <label className="block mb-1 font-semibold text-gray-600">
          <span>Floor Name</span>
        </label>
        <select
          id={`floorName${index}`}
          name={`floorName${index}`}
          className="w-full px-3 py-[10px] border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
          value={selectedFloor?.length ? selectedFloor : floorChange}
          onChange={(e) => {
            handleFloorChange(e, index);
          }}
          disabled={isReadOnly}
        >
          <option disabled value="select">
            Select Floor Name
          </option>
          {floorOptions?.length &&
            floorOptions?.map((eachFloor, index) => {
              return (
                <option
                  key={index}
                  value={eachFloor}
                  className={`${
                    findOldSelectedValue(eachFloor) ? "hidden" : ""
                  }`}
                >
                  {eachFloor}
                </option>
              );
            })}
        </select>
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block mb-1 font-semibold text-gray-600"
        >
          Built up area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`builtUpArea${index}`}
          name={`builtUpArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
          defaultValue={
            builtUpAreaValue ? builtUpAreaValue : plotDetailsFloor?.builtUpArea
          }
          onChange={(e) => handleBuiltUpArea(e.target.value, index)}
          readOnly={isReadOnly}
        />
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block mb-1 font-semibold text-gray-600"
        >
          Parking Area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`parkingArea${index}`}
          name={`parkingArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
          defaultValue={
            parkingAreaValue ? parkingAreaValue : plotDetailsFloor?.parkingArea
          }
          onChange={(e) => handleParkingArea(e.target.value, index)}
          readOnly={isReadOnly}
        />
      </div>

      {role.toLowerCase() === "ltp" && (
        <div className="flex justify-start items-center ml-3 mt-6">
          {index === length - 1 && index < 3 && (
            <div className="flex justify-center items-center">
              <button
                className={`nm_Container text-xl rounded-full w-[30px] h-[30px] text-normalViolet cursor-pointer transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold ${
                  hideBtn && "hidden"
                }`}
                onClick={increaseFloorNo}
              >
                +
              </button>
            </div>
          )}

          {index === length - 1 && index > 0 && index <= 3 && (
            <div className="flex justify-center items-center">
              <button
                className={`nm_Container text-xl mx-2 rounded-full text-red-500 w-[30px] h-[30px]  transition-all duration-500 font-bold ${
                  hideBtn && "hidden"
                }`}
                onClick={decreaseFloorNo}
              >
                -
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloorDetails;
