import { Line } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AQIChart = ({ forecast, nextFiveDays }) => {
    const data = {
      labels: nextFiveDays.map((day) => day.date),
      datasets: [
        {
          label: "PM₂.₅ Concentration (µg/m³)", // Subscript formatted
          data: forecast?.slice(0, 5).map((data) => data?.pm25?.toFixed(2) || 0),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          tension: 0.5,
        },
        {
          label: "AQI",
          data: forecast?.slice(0, 5).map((data) => data?.aqi || 0),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          tension: 0.5,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
              weight: "bold",
            },
            padding: 20,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 16,
              weight: "bold",
            },
          },
          grid: {
            display: false, // Hides x-axis grid lines
          },
        },
        y: {
          title: {
            display: true,
            text: "PM₂.₅ & AQI Levels 📊",
            font: {
              size: 18,
              weight: "bold",
            },
          },
          ticks: {
            font: {
              size: 16,
              weight: "bold",
            },
          },
          grid: {
            display: false, // Hides y-axis grid lines
          },
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  

export default AQIChart;
