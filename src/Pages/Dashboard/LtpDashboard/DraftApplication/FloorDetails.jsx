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
  // handleFloorChange,
  // setFloorTrack,
  // floorTrack,
}) => {
  const [floorChange, setFloorChange] = useState("select");

  // useEffect(() => {
  //   setFloorOptions((prev) => {
  //     const newFloorOptions = prev.filter((oldFloorValue, prevIndx) => {
  //       const searchInIndividualFloorSelected =
  //         individualFloorSelected.findIndex(
  //           (floorSelected) => floorSelected === oldFloorValue
  //         );

  //       if (searchInIndividualFloorSelected === -1) {
  //         return oldFloorValue;
  //       }
  //     });
  //   });
  // }, []);

  // const [s, setFloorOptions] = useState([
  //   "Stilt / Parking Floor",
  //   "Ground Floor",
  //   "First Floor",
  //   "Second Floor",
  // ]);
  // const [floorTrack, setFloorTrack] = useState([
  //   { value: "Stilt / Parking Floor", checked: "" },
  //   { value: "Ground Floor", checked: "" },
  //   { value: "First Floor", checked: "" },
  //   { value: "Second Floor", checked: "" },
  // ]);

  const [selectedFloor, setSelectedFloor] = useState("");

  useEffect(() => {
    setSelectedFloor(plotDetailsFloor?.name ?? "");
  }, [plotDetailsFloor]);

  const findOldSelectedValue = () => {
    console.log(selectedFloor, "Old value");
  };

  const handleFloorChange = (e, index) => {
    setFloorChange(e.target.value);

    setSelectedFloor(e.target.value);
    // const floorValue = e.target.value;

    // const floorNameIndex = index;

    console.log(floorValue, "FV");

    // setFloorTrack((prev) => {
    //   prev.forEach((item, index) => {
    //     if (item.value === floorValue) {
    //       prev[index].checked = floorNameIndex;

    //       prev.forEach((itm, j) => {
    //         if (j !== index && prev[j].checked === floorNameIndex) {
    //           prev[j].checked = "";
    //         }
    //       });
    //     }
    //   });
    //   return prev;
    // });
  };

  return (
    <>
      <div className="flex flex-col justify-center mx-3">
        <label className="block mb-1 font-semibold text-black">
          <span>Floor Name</span>
        </label>
        <select
          id={`floorName${index}`}
          name={`floorName${index}`}
          className="w-full px-3 py-[10px] border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200"
          value={selectedFloor?.length ? selectedFloor : floorChange}
          onChange={(e) => {
            // findOldSelectedValue(index);
            handleFloorChange(e, index);
          }}
        >
          <option disabled value="select">
            Select Floor Name
          </option>
          {floorOptions?.length &&
            floorOptions?.map((eachFloor, index) => {
              return (
                <option key={index} value={eachFloor}>
                  {eachFloor}
                </option>
              );
            })}
        </select>
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block text-black mb-1 font-semibold"
        >
          Built up area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`builtUpArea${index}`}
          name={`builtUpArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200 bg-gray-100"
          defaultValue={
            builtUpAreaValue ? builtUpAreaValue : plotDetailsFloor?.builtUpArea
          }
          onChange={(e) => handleBuiltUpArea(e.target.value, index)}
        />
      </div>

      <div className="my-4 mx-3">
        <label
          htmlFor="ProposedPlotArea"
          className="block text-black mb-1 font-semibold"
        >
          Parking Area (in Sq.Mts.)
        </label>
        <input
          type="number"
          id={`parkingArea${index}`}
          name={`parkingArea${index}`}
          placeholder="in Sq.Mts."
          className="w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200 bg-gray-100"
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

        {index === length - 1 && index > 0 && index <= 3 && (
          <div className="flex justify-center items-center">
            <button
              className="text-xl mx-2 rounded-full w-[30px] h-[30px] bg-gradient-to-r from-fuchsia-500 to-red-500 text-white cursor-pointer shadow-lg shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold"
              onClick={decreaseFloorNo}
            >
              -
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloorDetails;
