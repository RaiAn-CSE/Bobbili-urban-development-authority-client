import React, { useState } from "react";
import Lottie from "lottie-react";
import {
  MdOutlineAddLocationAlt,
  MdOutlineWrongLocation,
} from "react-icons/md";
import mapAnimation from "../../../../assets/map.json";
import toast from "react-hot-toast";
import districtImage from "../../../../assets/images/district.png";
import cityImage from "../../../../assets/images/city.png";
import villageImage from "../../../../assets/images/village.png";

const UpdateLocation = () => {
  const [isAddOption, setIsAddOption] = useState(1);

  const [isMandalNeed, setIsMandalNeed] = useState(0);

  const [isVillageNeed, setIsVillageNeed] = useState(0);

  const setToggleValue = (prevValue, setNewValue) => {
    prevValue === 0 ? setNewValue(1) : setNewValue(0);
  };

  // const inputClass =
  //   "bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 font-bold text-white rounded-full cursor-pointer hover:shadow-md hover:shadow-darkViolet hover:bg-gradient-to-l transition-all duration-700";
  const inputClass =
    "bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 font-bold text-white rounded-full cursor-pointer hover:shadow-md hover:shadow-darkViolet hover:bg-gradient-to-l  transition-all duration-700";

  const activeTabClass =
    "bg-gradient-to-r from-teal-400 to-yellow-200 text-black";

  const swapTheTab = (tabValue) => {
    setIsAddOption(tabValue);
  };

  console.log(isAddOption, "IS EDIT OPTION");

  const makeFirstCharacterCapital = (str) => {
    const splitStr = str.split("");
    splitStr[0] = splitStr[0].toUpperCase();
    return splitStr.join("");
  };

  const getInputFieldValue = () => {
    const districtElement = document.getElementById("district");
    const mandalElement = document.getElementById("mandal");
    const villageElement = document.getElementById("village");

    const districtValue = makeFirstCharacterCapital(districtElement?.value);
    console.log(districtValue, "District Value");

    // check mandal is available or not

    console.log(mandalElement, "Mandal Element");
    if (mandalElement) {
      const mandalValue = makeFirstCharacterCapital(mandalElement?.value);
      console.log(mandalValue, "Mandal");

      if (villageElement) {
        // Check whether the village value is given or not
        const villageValue = makeFirstCharacterCapital(villageElement?.value);
        console.log(villageValue);

        // sent district and village value
        return {
          district: districtValue,
          mandal: mandalValue,
          village: villageValue,
        };
      } else {
        // sent district and village name
        return { district: districtValue, mandal: mandalValue };
      }
    } else {
      // Only sent the district into the database

      return { district: districtValue };
    }
  };

  const updateLocation = (e) => {
    console.log(e.target.submit.value, "Action");

    const action = e.target.submit.value;
    e.preventDefault();
    const data = getInputFieldValue();

    let url;
    if (action === "Add") {
      // add location
      console.log(data, "ADD");

      url = `http://localhost:5000/addLocation?data=${JSON.stringify(data)}`;
    } else {
      // remove location
      console.log(data, "Remove");
      url = `http://localhost:5000/removeLocation?data=${JSON.stringify(data)}`;
    }

    fetch(url, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result?.response?.acknowledged) {
          toast.success(result?.msg);
        } else {
          toast.error(result?.msg);
        }
      })
      .catch(() => {
        toast.error("Server Failed");
      });
  };

  return (
    <div className="flex justify-center items-center font-roboto h-[calc(100vh-70px)] transition-all duration-1000">
      {/* container of main div  */}
      <div className="flex min-h-[70%] w-[80%] bg-white shadow-lg">
        {/* left side  */}
        <div className="basis-1/2 bg-gray-100 min-h-full shadow-lg">
          <div>
            {/* tab part  */}
            <ul className="flex text-base font-medium text-center text-gray-500 dark:text-gray-400 bg-gray-100 shadow-md">
              <li
                className={`basis-1/2 ${isAddOption === 1 && activeTabClass}`}
                onClick={() => swapTheTab(1)}
              >
                <button className="inline-flex items-center justify-center text-lg font-bold p-4 border-b-2 border-transparent rounded-t-lg">
                  <MdOutlineAddLocationAlt className="me-2" size={20} />
                  Add
                </button>
              </li>
              <li
                className={`basis-1/2 ${isAddOption === 0 && activeTabClass}`}
                onClick={() => swapTheTab(0)}
              >
                <button className="inline-flex items-center justify-center text-lg font-bold p-4 ">
                  <MdOutlineWrongLocation className="me-2" size={20} />
                  Delete
                </button>
              </li>
            </ul>

            {/* content part  */}

            <form
              className="p-6 "
              onSubmit={(e, isAddOption) => updateLocation(e, isAddOption)}
            >
              {/* district */}
              <div>
                <label
                  htmlFor="district"
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
                    id="district"
                    name="district"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    placeholder="Enter district name"
                    required
                  />
                </div>
              </div>

              {/* mandal  */}
              <div>
                <label
                  htmlFor="mandal"
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
                {isMandalNeed === 1 && (
                  <div className={`relative mb-6 `}>
                    <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                      <img
                        className="w-full h-full"
                        src={cityImage}
                        alt="An image which is representing district"
                      />
                    </div>
                    <input
                      type="text"
                      id="mandal"
                      name="mandal"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                      placeholder="Enter mandal name"
                      required={isMandalNeed && "required"}
                    />
                  </div>
                )}
              </div>

              {/* vilage  */}
              <div>
                <label
                  htmlFor="village"
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
                {isVillageNeed === 1 && (
                  <div className={`relative mb-6 `}>
                    <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                      <img
                        className="w-full h-full"
                        src={villageImage}
                        alt="An image which is representing district"
                      />
                    </div>
                    <input
                      type="text"
                      id="village"
                      name="village"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                      placeholder="Enter village name"
                      required={isVillageNeed === 1 && "required"}
                    />
                  </div>
                )}
              </div>

              {/* submit button  */}

              <div className="flex justify-center">
                <input
                  type="submit"
                  name="submit"
                  value={isAddOption === 1 ? "Add" : "Delete"}
                  className={`${inputClass}`}
                />
              </div>
            </form>
          </div>
        </div>

        {/* right side  */}
        <div className="basis-1/2 ">
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
