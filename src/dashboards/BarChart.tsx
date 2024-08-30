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

interface AggregatedData {
  date: string;
  totalQuantity: number;
  totalPrice: number;
}

interface BarChartProps {
  data: AggregatedData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "จำนวนเงิน (บาท)",
        data: data.map((entry) => entry.totalPrice),
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
        text: "จำนวนเงินในแต่ละวัน",
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
