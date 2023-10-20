import React, { useState } from "react";
import Lottie from "lottie-react";
import {
  MdOutlineAddLocationAlt,
  MdOutlineWrongLocation,
} from "react-icons/md";
import mapAnimation from "../../../../assets/map.json";
import districtImage from "../../../../assets/images/district.png";
import cityImage from "../../../../assets/images/city.png";
import villageImage from "../../../../assets/images/village.png";

const UpdateLocation = () => {
  const [isAddOption, setIsAddOption] = useState(1);

  const [isMandalNeed, setIsMandalNeed] = useState(0);

  const [isVillageNeed, setIsVillageNeed] = useState(0);

  const setToggleValue = (prevValue, setNewValue) => {
    prevValue === 0 && setNewValue(1);

    prevValue === 1 && setNewValue(0);
  };

  const inputClass =
    "bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 font-bold text-white rounded-full cursor-pointer hover:shadow-md hover:shadow-darkViolet hover:bg-gradient-to-l transition-all duration-700";

  const swapTheTab = (tabValue) => {
    setIsAddOption(tabValue);
  };

  console.log(isAddOption, "IS EDIT OPTION");
  return (
    <div className="flex justify-center items-center font-roboto h-[calc(100vh-70px)] transition-all duration-1000">
      {/* container of main div  */}
      <div className="flex min-h-[70%] w-[80%] bg-white shadow-lg">
        {/* left side  */}
        <div className="basis-1/2">
          <div className="border-b border-gray-200 dark:border-gray-700">
            {/* tab part  */}
            <ul className="flex text-base font-medium text-center text-gray-500 dark:text-gray-400 bg-gray-100">
              <li className="basis-1/2" onClick={() => swapTheTab(1)}>
                <button className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg">
                  <MdOutlineAddLocationAlt className="me-2" size={20} />
                  Add
                </button>
              </li>
              <li className="basis-1/2" onClick={() => swapTheTab(0)}>
                <button className="inline-flex items-center justify-center p-4 ">
                  <MdOutlineWrongLocation className="me-2" size={20} />
                  Delete
                </button>
              </li>
            </ul>

            {/* content part  */}

            <form className="p-6">
              {/* district */}
              <div>
                <label
                  htmlFor="input-group-1"
                  className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
                >
                  District
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                    <img
                      className="w-full h-full"
                      src={districtImage}
                      alt="An image which is representing district"
                    />
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="name@flowbite.com"
                  />
                </div>
              </div>

              {/* mandal  */}
              <div>
                <label
                  htmlFor="input-group-1"
                  className="flex items-center mb-2  text-base font-bold text-gray-900 dark:text-white"
                >
                  <input
                    type="checkbox"
                    className="toggle toggle-sm me-2"
                    onClick={() =>
                      setToggleValue(isMandalNeed, setIsMandalNeed)
                    }
                  />
                  Mandal
                </label>
                <div
                  className={`relative mb-6 ${
                    isMandalNeed === 0 ? "hidden" : "visible"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                    <img
                      className="w-full h-full"
                      src={cityImage}
                      alt="An image which is representing district"
                    />
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="name@flowbite.com"
                  />
                </div>
              </div>

              {/* vilage  */}
              <div>
                <label
                  htmlFor="input-group-1"
                  className="flex items-center mb-2 text-base font-bold text-gray-900 dark:text-white"
                >
                  <input
                    type="checkbox"
                    className="toggle toggle-sm me-2"
                    onClick={() =>
                      setToggleValue(isVillageNeed, setIsVillageNeed)
                    }
                  />
                  Village
                </label>
                <div
                  className={`relative mb-6 ${
                    isVillageNeed === 0 ? "hidden" : "visible"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                    <img
                      className="w-full h-full"
                      src={villageImage}
                      alt="An image which is representing district"
                    />
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="name@flowbite.com"
                  />
                </div>
              </div>

              {/* submit button  */}

              {
                <div className="flex justify-center">
                  {isAddOption === 1 && (
                    <input
                      type="submit"
                      value="Add"
                      className={`${inputClass}`}
                    />
                  )}

                  {isAddOption === 0 && (
                    <input
                      type="submit"
                      value="Delete"
                      className={`${inputClass}`}
                    />
                  )}
                </div>
              }
            </form>
          </div>
        </div>

        {/* right side  */}
        <div className="basis-1/2">
          <Lottie
            animationData={mapAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateLocation;
