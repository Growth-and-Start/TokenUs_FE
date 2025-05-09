import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { MAIN, SECONDARY } from "../../../constants/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function HistoryChart({ history }) {
  const prices = history.map((item) => item.tradePrice);
  const labels = history.map((item) => item.createdAt);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "NFT TX History",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        data: prices,
        borderColor: MAIN.BLUE,
        backgroundColor: "rgba(177,214,255,0.55)",
        borderWidth: 1.5,
      },
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}

export default HistoryChart;
