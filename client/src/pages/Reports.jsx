import React, { useState, useEffect } from "react";

const Reports = () => {
  const [scrapedData, setScrapedData] = useState({ title: '', content: [] });
  const [loading, setLoading] = useState(true);

  // Sample data for statistics - you can modify based on actual data
  const railwayStats = [
    { line: "Western Line", dailyRidership: "3.5 million", stations: 36 },
    { line: "Central Line", dailyRidership: "3.2 million", stations: 24 },
    { line: "Harbour Line", dailyRidership: "1.4 million", stations: 18 }
  ];

  const majorStations = [
    { name: "CSMT", dailyPassengers: "650,000", lines: "Central, Harbour" },
    { name: "Dadar", dailyPassengers: "580,000", lines: "Western, Central" },
    { name: "Andheri", dailyPassengers: "630,000", lines: "Western" },
    { name: "Thane", dailyPassengers: "520,000", lines: "Central" }
  ];

  useEffect(() => {
    const fetchScrapedData = async () => {
      try {
        const response = await fetch('http://localhost:6005/scrape');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScrapedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScrapedData();
  }, []);

  const renderContent = (content) => {
    return content.map((item, index) => {
      if (item.startsWith('##')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-800">
            {item.replace('##', '').trim()}
          </h2>
        );
      }
      
      if (item.startsWith('•')) {
        return (
          <li key={index} className="ml-6 mb-2">
            {item.substring(1).trim()}
          </li>
        );
      }

      if (item.startsWith('**')) {
        const [label, value] = item.replace(/\*\*/g, '').split(':');
        return (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2 border-b border-gray-200 py-2">
            <div className="font-semibold text-gray-700">{label}</div>
            <div className="col-span-2">{value}</div>
          </div>
        );
      }

      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-700">
          {item}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-900">
              {scrapedData.title}
            </h1>
            <img 
              src="/api/placeholder/50/50"
              alt="Railway Icon"
              className="w-12 h-12"
            />
          </div>
          <div className="prose max-w-none">
            {renderContent(scrapedData.content)}
          </div>
        </div>
      </div>

      {/* Statistics Tables */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Railway Lines Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Railway Lines Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Ridership</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stations</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {railwayStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{stat.line}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stat.dailyRidership}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stat.stations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Major Stations Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Major Stations Data
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Passengers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lines</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {majorStations.map((station, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{station.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{station.dailyPassengers}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{station.lines}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Table of Contents
        </h2>
        <nav>
          {scrapedData.content
            .filter(item => item.startsWith('##'))
            .map((section, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded transition duration-200"
              >
                {section.replace('##', '').trim()}
              </div>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Reports;