import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import BarChart from "../dashboards/BarChart";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../data/firebase";
import dayjs from "dayjs";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
}

interface AggregatedData {
  date: string;
  totalQuantity: number;
  totalPrice: number;
}

function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [purchaseData, setPurchaseData] = useState<AggregatedData[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = () => {
    const filteredData = items.filter((data) => {
      const itemDate = dayjs(data.date).startOf("day").valueOf();
      const start = dayjs(startDate).startOf("day").valueOf();
      const end = dayjs(endDate).endOf("day").valueOf();

      if (startDate && endDate) {
        return itemDate >= start && itemDate <= end;
      }
      return true;
    });

    const aggregated: { [key: string]: AggregatedData } = {};
    filteredData.forEach((data) => {
      const date = dayjs(data.date).format("YYYY-MM-DD");
      if (!aggregated[date]) {
        aggregated[date] = { date, totalQuantity: 0, totalPrice: 0 };
      }
      aggregated[date].totalQuantity += data.quantity;
      aggregated[date].totalPrice += data.price;
    });

    const aggregatedArray = Object.values(aggregated);
    setPurchaseData(aggregatedArray);
    setSearched(true);
  };

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "items"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Item[];
      setItems(newData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex w-full h-full">
        <div className="border border-black flex-1 m-4 p-4 rounded-lg">hit</div>
        <div className="border border-black flex-1 m-4 p-4 rounded-lg">hit</div>
      </div>

      <div className="border border-black m-4 p-4 rounded-lg h-[650px]">
        <div className="p-5 flex justify-end">
          <div className="flex items-center mb-4 space-x-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                วันที่เริ่ม:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                วันที่สิ้นสุด:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ค้นหา
            </button>
          </div>
        </div>
        {searched && purchaseData.length === 0 ? (
          <p className="mt-4 text-red-500">
            No data available for the selected date range.
          </p>
        ) : (
          searched && <BarChart data={purchaseData} />
        )}
      </div>
    </>
  );
}

export default Dashboard;
