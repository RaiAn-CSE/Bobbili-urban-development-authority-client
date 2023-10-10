import React, { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Data from "../../assets/Data.json";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

Chart.register(CategoryScale);

const ShowCharts = () => {
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
  return (
    <div className="flex justify-around items-center p-0 dark:text-white">
      <div className="w-[45%] overflow-hidden">
        <BarChart chartData={chartData} />
      </div>

      <div className="w-[45%] overflow-hidden">
        <PieChart chartData={chartData} />
      </div>
    </div>
  );
};

export default ShowCharts;
