import { useState, useEffect } from "react";
import axios from "axios";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6005/histories");
        setHistoryData(response.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-4">
  <h2 className="text-xl font-medium mb-4">Route History</h2>
  <table className="table-auto w-full text-left shadow-md rounded-lg">
    <thead>
      <tr>
        <th className="px-4 py-2 bg-gray-200 text-gray-700">Origin</th>
        <th className="px-4 py-2 bg-gray-200 text-gray-700">Destination</th>
        <th className="px-4 py-2 bg-gray-200 text-gray-700">Distance</th>
        <th className="px-4 py-2 bg-gray-200 text-gray-700">Duration</th>
        <th className="px-4 py-2 bg-gray-200 text-gray-700">Fare (Optional)</th>
      </tr>
    </thead>
    <tbody>
      {historyData.length > 0 ? (
        historyData.map((item) => (
          <tr key={item._id} className="border-b border-gray-400 hover:bg-gray-100">
            <td className="px-4 py-2">{item.src}</td>
            <td className="px-4 py-2">{item.dest}</td>
            <td className="px-4 py-2">{item.distance}</td>
            <td className="px-4 py-2">{item.duration}</td>
            <td className="px-4 py-2">{item.fare || "-"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center py-4 text-gray-500">
            No saved routes found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
}

export default History;
