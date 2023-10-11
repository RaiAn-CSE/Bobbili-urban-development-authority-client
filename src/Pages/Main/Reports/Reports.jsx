import React, { useEffect, useState } from "react";
import ShowCharts from "../../Shared/ShowCharts";
import { district } from "../../../assets/buildingInfo.json";

const Reports = () => {
  const [allDistricts, setAllDistricts] = useState([]);
  const [allMandal, setAllMandal] = useState([]);
  const [allPanchayat, setAllPanchayat] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");

  console.log(district, "District");

  useEffect(() => {
    const districts = district.map((each) => each?.name);
    setAllDistricts(districts);

    // const mandalNamesArray = district.map((each) => {
    //   return each?.mandal?.map((mandalName) => mandalName?.name);
    // });

    // setAllMandal([].concat(...mandalNamesArray));
  }, []);

  const detectSelectOfDistrict = (e) => {
    const chooseDistrict = e.target.value;
    console.log(chooseDistrict);
    setSelectedDistrict(chooseDistrict);

    if (chooseDistrict === "Vijayanagaram") {
      console.log(district[0]?.mandal);
      setAllMandal(district[0]?.mandal);
    }
    if (chooseDistrict === "Parvathipuram Manyam") {
      setAllMandal(district[1]?.mandal);
    }
  };

  const detectChangeOfMandals = (e) => {
    const value = e.target.value;
    setSelectedMandal(value);

    console.log(value);

    console.log(allMandal, "DCM");

    const mandalWiseVillage = allMandal.find(
      (eachMandal) => eachMandal?.name === value
    )?.village;

    console.log(mandalWiseVillage);
    setAllPanchayat(mandalWiseVillage);
  };

  const detectChangeOfPanchayat = (e) => {
    setSelectedPanchayat(e.target.value);
  };

  console.log(selectedDistrict, selectedMandal, selectedPanchayat);

  useEffect(() => {}, [selectedDistrict, selectedMandal, selectedPanchayat]);
  return (
    <div className="mt-10">
      <form className="flex justify-around items-center font-sans">
        {/* district  */}
        <div className="basis-3/12">
          <label
            htmlFor="district"
            className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
          >
            District
          </label>
          <select
            id="district"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue="select"
            onChange={(e) => detectSelectOfDistrict(e)}
          >
            <option value="select" disabled>
              Select an option
            </option>
            {allDistricts.map((eachDistrict) => {
              return (
                <option key={eachDistrict} value={eachDistrict}>
                  {eachDistrict}
                </option>
              );
            })}
          </select>
        </div>

        {/* mandal */}

        <div className="basis-3/12">
          <label
            htmlFor="mandal"
            className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
          >
            Mandal
          </label>
          <select
            id="mandal"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue="select"
            onChange={(e) => detectChangeOfMandals(e)}
            disabled={allMandal?.length === 0}
          >
            <option value="select">Select an option</option>
            {allMandal?.map((eachMandal, index) => {
              return (
                <option key={index} value={eachMandal?.name}>
                  {eachMandal?.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* gram panchayat  */}
        <div className="basis-3/12">
          <label
            htmlFor="panchayat"
            className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
          >
            Grama Panchayat
          </label>
          <select
            id="panchayat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue="select"
            disabled={allPanchayat?.length === 0}
            onChange={(e) => detectChangeOfPanchayat(e)}
          >
            <option value="select">Select an option</option>
            {allPanchayat?.map((eachPanchayt, index) => {
              return <option key={index}>{eachPanchayt}</option>;
            })}
          </select>
        </div>
      </form>
      <ShowCharts />
    </div>
  );
};

export default Reports;
