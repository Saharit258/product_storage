import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import BarChart from '../dashboards/BarChart';

function Dashboard() {
  const initialData = [
    { date: '2024-06-01', items: 5, amount: 100 },
    { date: '2024-06-02', items: 3, amount: 60 },
    { date: '2024-06-03', items: 8, amount: 200 },
    { date: '2024-06-04', items: 2, amount: 50 },
    { date: '2024-06-05', items: 7, amount: 150 },
    { date: '2024-06-06', items: 4, amount: 80 },
    { date: '2024-06-07', items: 6, amount: 130 },
    { date: '2024-06-08', items: 3, amount: 70 },
    { date: '2024-06-09', items: 8, amount: 160 },
    { date: '2024-06-10', items: 5, amount: 120 },
    { date: '2024-06-11', items: 6, amount: 130 },
    { date: '2024-06-12', items: 4, amount: 80 },
    { date: '2024-06-13', items: 3, amount: 70 },
    { date: '2024-06-14', items: 8, amount: 160 },
    { date: '2024-06-15', items: 5, amount: 120 },
    { date: '2024-06-16', items: 7, amount: 150 },
    { date: '2024-06-17', items: 2, amount: 50 },
    { date: '2024-06-18', items: 3, amount: 60 },
    { date: '2024-06-19', items: 5, amount: 100 },
    { date: '2024-06-20', items: 3, amount: 60 },
    { date: '2024-06-21', items: 8, amount: 200 },
    { date: '2024-06-22', items: 2, amount: 50 },
    { date: '2024-06-23', items: 7, amount: 150 },
    { date: '2024-06-24', items: 4, amount: 80 },
    { date: '2024-06-25', items: 6, amount: 130 },
    { date: '2024-06-26', items: 3, amount: 70 },
    { date: '2024-06-27', items: 8, amount: 160 },
    { date: '2024-06-28', items: 5, amount: 120 },
    { date: '2024-06-29', items: 6, amount: 130 },
    { date: '2024-06-30', items: 4, amount: 80 },
    { date: '2024-07-01', items: 5, amount: 100 },
    { date: '2024-07-02', items: 3, amount: 60 },
    { date: '2024-07-03', items: 8, amount: 200 },
    { date: '2024-07-04', items: 2, amount: 50 },
    { date: '2024-07-05', items: 7, amount: 150 },
    { date: '2024-07-06', items: 4, amount: 80 },
    { date: '2024-07-07', items: 6, amount: 130 },
    { date: '2024-07-08', items: 3, amount: 70 },
    { date: '2024-07-09', items: 8, amount: 160 },
    { date: '2024-07-10', items: 5, amount: 120 },
    { date: '2024-07-11', items: 6, amount: 130 },
    { date: '2024-07-12', items: 4, amount: 80 },
    { date: '2024-07-13', items: 3, amount: 70 },
    { date: '2024-07-14', items: 8, amount: 160 },
    { date: '2024-07-15', items: 5, amount: 120 },
    { date: '2024-07-16', items: 7, amount: 150 },
    { date: '2024-07-17', items: 2, amount: 50 },
    { date: '2024-07-18', items: 3, amount: 60 },
  ];

  const [purchaseData, setPurchaseData] = useState(initialData);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    const filteredData = initialData.filter(data => {
      if (startDate && endDate) {
        return data.date >= startDate && data.date <= endDate;
      }
      return true;
    });
    setPurchaseData(filteredData);
  };

  useEffect(() => {
  }, [purchaseData]);

  return (
    <>
      <Nav />
      <div className="p-5">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
        {purchaseData.length === 0 ? (
          <p className="mt-4 text-red-500">No data available for the selected date range.</p>
        ) : (
          <BarChart data={purchaseData} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
