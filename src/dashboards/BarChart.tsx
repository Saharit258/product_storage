import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PurchaseData {
  date: string;
  items: number;
  amount: number;
}

interface BarChartProps {
  data: PurchaseData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Items",
        data: data.map((entry) => entry.items),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Amount ($)",
        data: data.map((entry) => entry.amount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Purchase Data",
      },
    },
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
