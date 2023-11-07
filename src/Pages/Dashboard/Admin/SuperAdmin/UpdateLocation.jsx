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
import LocationStyle from "./LocationPageStyle.module.css";

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
    "nm_Container bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 font-bold text-white rounded-full cursor-pointer  transition-all duration-700";

  const activeTabClass = "text-normalViolet text-base  border-b-normalViolet";

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
    <>
      <p className="text-black text-2xl font-roboto font-bold ml-3 mt-3">
        Location:
      </p>
      <div className="flex justify-center items-center font-roboto h-[calc(100vh-150px)] transition-all duration-1000">
        {/* container of main div  */}
        <div className="flex min-h-[70%] w-[80%]  nm_Container">
          {/* left side  */}
          <div className="basis-1/2 bg-bgColor min-h-full ">
            <div>
              {/* tab part  */}
              <ul className="flex text-center text-[#ab9ba0]">
                <li
                  className={`basis-1/2 ${
                    isAddOption === 1 ? activeTabClass : "border-b-white"
                  } border-2`}
                  onClick={() => swapTheTab(1)}
                >
                  <button className="inline-flex items-center justify-center text-base p-4 ">
                    <MdOutlineAddLocationAlt className="me-2" size={20} />
                    Add
                  </button>
                </li>
                <li
                  className={`basis-1/2  border-2 ${
                    isAddOption === 0 ? activeTabClass : "border-b-white"
                  }`}
                  onClick={() => swapTheTab(0)}
                >
                  <button className="inline-flex items-center justify-center text-base p-4">
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
                    className="block mb-2 text-base text-black"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 nm_Inset focus:outline-none"
                      placeholder="Enter district name"
                      required
                    />
                  </div>
                </div>

                {/* mandal  */}
                <div>
                  {/* <label
                  htmlFor="mandal"
                  className="flex items-center mb-2 text-base text-black"
                >
                  <input
                    type="checkbox"
                    className="toggle toggle-sm me-2"
                    onClick={() =>
                      setToggleValue(isMandalNeed, setIsMandalNeed)
                    }
                  />
                  Mandal
                </label> */}
                  <div className={`${LocationStyle.switchHolder}`}>
                    <div className={`${LocationStyle.switchLabel}`}>
                      <span className="text-black">Mandal</span>
                    </div>
                    <div className={`${LocationStyle.switchToggle}`}>
                      <input
                        type="checkbox"
                        id="mandal"
                        className="transition-all duration-700"
                        onClick={() =>
                          setToggleValue(isMandalNeed, setIsMandalNeed)
                        }
                      />
                      <label htmlFor="mandal"></label>
                    </div>
                  </div>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 transition-all duration-700 nm_Inset focus:outline-none"
                        placeholder="Enter mandal name"
                        required={isMandalNeed && "required"}
                      />
                    </div>
                  )}
                </div>

                {/* vilage  */}
                <div>
                  {/* <label
                  htmlFor="village"
                  className="flex items-center mb-2 text-base text-black "
                >
                  <input
                    type="checkbox"
                    className="toggle toggle-sm me-2"
                    onClick={() =>
                      setToggleValue(isVillageNeed, setIsVillageNeed)
                    }
                  />
                  Village
                </label> */}
                  <div className={`${LocationStyle.switchHolder}`}>
                    <div className={`${LocationStyle.switchLabel}`}>
                      <span className="text-black">Village</span>
                    </div>
                    <div className={`${LocationStyle.switchToggle}`}>
                      <input
                        type="checkbox"
                        id="village"
                        onClick={() =>
                          setToggleValue(isVillageNeed, setIsVillageNeed)
                        }
                      />
                      <label htmlFor="village"></label>
                    </div>
                  </div>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 transition-all duration-700 nm_Inset focus:outline-none"
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
          <div className="basis-1/2 bg-bgColor">
            <Lottie
              animationData={mapAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLocation;
