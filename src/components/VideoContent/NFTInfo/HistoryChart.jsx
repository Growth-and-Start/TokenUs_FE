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
import { weiToMatic } from "../../../utils/blockchainNetwork";

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
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} / ${hh}:${min}:${ss}`;
  };

  const reversedHistory = [...history].reverse();

  const prices = reversedHistory.map((item) => weiToMatic(item.tradePrice));
  const labels = reversedHistory.map((item) => formatDateTime(item.createdAt));

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
