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

  const [allDistricts, setAllDistricts] = useState([]);
  const [allMandal, setAllMandal] = useState([]);
  const [allPanchayat, setAllPanchayat] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");
  const [serverData, setServerData] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  console.log(district, "District");

  useEffect(() => {
    const districts = district.map((each) => each?.name);
    setAllDistricts(districts);
  }, []);

  const detectSelectOfDistrict = (e) => {
    setAllMandal([]);
    setAllPanchayat([]);
    setSelectedMandal("");
    setSelectedPanchayat("");
    setSelectedDate("");

    const chooseDistrict = e.target.value;
    console.log(chooseDistrict);
    setSelectedDistrict(chooseDistrict);

    // Reset the selected value of the Mandal dropdown to "select"
    const mandalSelect = document.getElementById("mandal");
    mandalSelect.value = "";

    const panchayatSelect = document.getElementById("panchayat");
    panchayatSelect.value = "";

    const dateSelected = document.getElementById("date");
    dateSelected.value = "";

    if (chooseDistrict === "Vizianagaram") {
      console.log(district[0]?.mandal);
      setAllMandal(district[0]?.mandal);
    }
    if (chooseDistrict === "Parvathipuram Manyam") {
      setAllMandal(district[1]?.mandal);
    }
  };

  const detectChangeOfMandals = (e) => {
    setAllPanchayat([]);
    setSelectedPanchayat("");
    setSelectedDate("");
    const panchayatSelect = document.getElementById("panchayat");
    panchayatSelect.value = "";
    const dateSelected = document.getElementById("date");
    dateSelected.value = "";
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
    console.log(e.target.value);
    setSelectedDate(e.target.value);
  };
  console.log(
    selectedDistrict,
    selectedMandal,
    selectedPanchayat,
    selectedDate,
    "All"
  );

  console.log(allMandal, allPanchayat, "ALL");

  useEffect(() => {
    if (selectedDistrict.length) {
      const data = { district: "", mandal: "", panchayat: "", date: "" };

      selectedDistrict?.length && (data["district"] = selectedDistrict);
      selectedMandal?.length && (data["mandal"] = selectedMandal);
      selectedPanchayat?.length && (data["panchayat"] = selectedPanchayat);
      selectedDate?.length && (data["date"] = selectedDate);

      console.log(data);
      fetch(
        `https://residential-building.vercel.app/filterApplications?search=${JSON.stringify(
          data
        )}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setServerData(result?.totalApplication);
        });

      console.log(data, "Data");
    } else {
      console.log("all");
      fetch("https://residential-building.vercel.app/totalApplications")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setServerData(result?.totalApplication);
        });
    }
  }, [selectedDistrict, selectedMandal, selectedPanchayat, selectedDate]);

  const [chartData, setChartData] = useState({});

  const canvas = document.createElement("canvas");

  // background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);;;

  const getData = (canvas, labels, data) => {
    const ctx = canvas.getContext("2d");
    const gradient1 = ctx.createLinearGradient(0, 0, 300, 0);
    gradient1.addColorStop(0, "#ffecd2");
    gradient1.addColorStop(1, "#fcb69f");
    // gradient1.addColorStop(1, "rgb(107, 33, 168)");

    const gradient2 = ctx.createLinearGradient(0, 0, 300, 0);
    gradient2.addColorStop(0, "#d4fc79");
    gradient2.addColorStop(1, "#96e6a1");
    // gradient2.addColorStop(1, "rgb(34, 197, 94)");
    const gradient3 = ctx.createLinearGradient(0, 0, 300, 0);
    gradient3.addColorStop(0, "#f78ca0");
    gradient3.addColorStop(0.19, "#f9748f");
    gradient3.addColorStop(0.5, "#fd868c");
    gradient3.addColorStop(1, "#fe9a8b");

    return {
      labels,
      datasets: [
        {
          label: "Chart",
          data,
          backgroundColor: [gradient1, gradient2, gradient3],
          borderColor: "#000",
          borderWidth: 0.1,
        },
      ],
    };
  };

  useEffect(() => {
    console.log(serverData, "Server data");

    const filterData = {};

    for (const key in serverData) {
      if (!Array.isArray(serverData[key])) {
        filterData[key] = serverData[key];
      }
    }

    delete filterData["total"];
    const labels = Object.keys(filterData);
    const data = Object.values(filterData);

    const chartValue = getData(canvas, labels, data);
    setChartData(chartValue);

    // setChartData({
    //   labels,
    //   datasets: [
    //     {
    //       label: "Total",
    //       data,
    //       background: [
    //         "rgb(198, 163, 238)",
    //         "rgba(0, 255, 0, 0.5)",
    //         "rgba(0, 0, 255, 0.5)",
    //       ],

    //       // borderColor: "black",
    //       // borderWidth: 2,
    //     },
    //   ],
    // });
  }, [serverData]);

  return (
    <>
      <form className="flex justify-around items-center font-sans my-16">
        {/* district  */}
        <div className="basis-1/5">
          <label
            htmlFor="district"
            className="block mb-2 text-base font-bold text-gray-900"
          >
            District
          </label>
          <select
            id="district"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={selectedDistrict}
            onChange={(e) => detectSelectOfDistrict(e)}
          >
            <option value="" disabled>
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
            className="block mb-2 text-base font-bold text-gray-900"
          >
            Mandal
          </label>
          <select
            id="mandal"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={selectedMandal}
            onChange={(e) => detectChangeOfMandals(e)}
            disabled={allMandal?.length === 0}
          >
            <option value="" disabled>
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
            className="block mb-2 text-base font-bold text-gray-900"
          >
            Grama Panchayat
          </label>
          <select
            id="panchayat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={selectedPanchayat}
            disabled={allPanchayat?.length === 0}
            onChange={(e) => detectChangeOfPanchayat(e)}
          >
            <option value="" disabled>
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
              className="block mb-2 text-base font-bold text-gray-900"
            >
              Date
            </label>
            <select
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={selectedDate}
              disabled={selectedPanchayat?.length === 0}
              onChange={(e) => detectChangeOfDate(e)}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="7 days">1 week</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
            </select>
          </div>
        )}
      </form>
      <div className="flex justify-between items-center p-0 dark:text-white">
        <div className="w-[45%] overflow-hidden">
          {serverData?.length !== 0 && <BarChart chartData={chartData} />}
        </div>

        <div className="w-[45%] overflow-hidden">
          {serverData?.length !== 0 && <PieChart chartData={chartData} />}
        </div>
      </div>
    </>
  );
};

export default ShowCharts;
