import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return (
    <div className="chart-container w-[70%] h-[70%] mx-auto">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
