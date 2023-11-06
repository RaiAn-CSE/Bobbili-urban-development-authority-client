import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 3000,
      easing: "easeInBounce",
    },
    title: {
      display: true,
      text: "Bar + Line Chart",
      fontSize: 25,
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Months",
          },
          stacked: "true",
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Values",
          },
          stacked: "true",
        },
      ],
    },
  };
  console.log(chartData, "Barchart");
  return (
    <div className="chart-container w-full h-full">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          animation: {
            duration: 3000,
            easing: "easeInBounce",
          },

          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Application type",
                color: "#1f1132",
                font: {
                  family: "Roboto Condensed, sans-serif",
                  size: 20,
                  weight: "bold",
                  lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
              },
            },
            y: {
              display: true,
              title: {
                display: false,
                text: "Value",
                color: "#191",
                font: {
                  family: "Times",
                  size: 20,
                  style: "normal",
                  lineHeight: 1.2,
                },
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              // text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
