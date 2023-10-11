import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Data from "../../assets/Data.json";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { district } from "../../assets/buildingInfo.json";
import { AuthContext } from "../../AuthProvider/AuthProvider";

Chart.register(CategoryScale);

const ShowCharts = () => {
  const path = useLocation().pathname;

  const { userInfoFromLocalStorage } = useContext(AuthContext);

  // const role = userInfoFromLocalStorage().role;

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],

        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [allDistricts, setAllDistricts] = useState([]);
  const [allMandal, setAllMandal] = useState([]);
  const [allPanchayat, setAllPanchayat] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

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

  const detectChangeOfDate = (e) => {
    setSelectedDate(e.target.value);
  };

  console.log(selectedDistrict, selectedMandal, selectedPanchayat, "All");

  useEffect(() => {
    if (selectedDistrict.length) {
      const data = { district: "", mandal: "", panchayat: "" };

      selectedDistrict?.length && (data["district"] = selectedDistrict);
      selectedMandal?.length && (data["mandal"] = selectedMandal);
      selectedPanchayat?.length && (data["panchayat"] = selectedPanchayat);

      fetch(
        `http://localhost:5000/filterApplications?search=${JSON.stringify(
          data
        )}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });

      console.log(data, "Data");
    } else {
      console.log("all");
      fetch("http://localhost:5000/totalApplications")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
  }, [selectedDistrict, selectedMandal, selectedPanchayat]);

  return (
    <>
      <form className="flex justify-around items-center font-sans">
        {/* district  */}
        <div className="basis-1/5">
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

        <div className="basis-1/5">
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
            <option value="select" disabled>
              Select an option
            </option>
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
        <div className="basis-1/5">
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
            <option value="select" disabled>
              Select an option
            </option>
            {allPanchayat?.map((eachPanchayt, index) => {
              return <option key={index}>{eachPanchayt}</option>;
            })}
          </select>
        </div>

        {/* week month year filter  */}
        {!path.includes("/statistics") && (
          <div className="basis-1/5">
            <label
              htmlFor="date"
              className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
            >
              Date
            </label>
            <select
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue="select"
              disabled={allPanchayat?.length === 0}
              onChange={(e) => detectChangeOfDate(e)}
            >
              <option value="select" disabled>
                Select an option
              </option>
              <option value="7 days">1 week</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
            </select>
          </div>
        )}
      </form>
      <div className="flex justify-around items-center p-0 dark:text-white">
        <div className="w-[45%] overflow-hidden">
          <BarChart chartData={chartData} />
        </div>

        <div className="w-[45%] overflow-hidden">
          <PieChart chartData={chartData} />
        </div>
      </div>
    </>
  );
};

export default ShowCharts;
