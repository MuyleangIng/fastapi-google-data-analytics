"use client";

import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import PageTracker from "./PageTracker";

export default function Stats() {
  const [stats, setStats] = useState({});
  const [selectedService, setSelectedService] = useState("Qummit"); // Default to Qummit

  // WebSocket to get live data
  const { lastMessage } = useWebSocket("ws://136.228.158.126:3039/ws", {
    onOpen: () => console.log("✅ WebSocket Connected"),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setStats(data);
    }
  }, [lastMessage]);

  // 🟢 Filtered Data for Selected Service
  const pageViewsLabels = Object.keys(stats).filter((key) => key.startsWith(`${selectedService}:pageview:`));
  const pageViewsData = pageViewsLabels.map((key) => stats[key]);

  const timeSpentLabels = Object.keys(stats).filter((key) => key.startsWith(`${selectedService}:time:`));
  const timeSpentData = timeSpentLabels.map((key) => stats[key]);

  // 🌍 Filter country visitor data
  const countryData = stats[`${selectedService}:countries`] || [];
  const countryCounts = countryData.reduce((acc, visitor) => {
    acc[visitor.country] = (acc[visitor.country] || 0) + 1;
    return acc;
  }, {});

  // Convert to array for display
  const countryList = Object.entries(countryCounts).map(([country, count]) => ({ country, count }));

  return (
    <PageTracker service={selectedService} pageName="/stats">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">📊 Statistics Dashboard</h1>

        {/* 🔄 Service Selection Dropdown */}
        <div className="mb-6 text-center">
          <label className="text-lg font-semibold mr-2">Select Service:</label>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="Qummit">Qummit</option>
            <option value="QuSpace">QuSpace</option>
            <option value="QuMatics">QuMatics</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
          {/* 📍 Page Views */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">📍 Page Views</h2>
            <BarChart
              labels={pageViewsLabels.map((label) => label.split(":")[2])}
              datasets={[
                {
                  label: "Page Visits",
                  data: pageViewsData,
                  backgroundColor: "rgb(59, 130, 246)",
                },
              ]}
            />
          </div>

          {/* ⏳ Time Spent */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">⏳ Time Spent per Page</h2>
            <LineChart
              labels={timeSpentLabels.map((label) => label.split(":")[2])}
              datasets={[
                {
                  label: "Time Spent (s)",
                  data: timeSpentData,
                  borderColor: "rgb(34, 197, 94)",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                },
              ]}
            />
          </div>

          {/* 🌎 Visitors by Country (World Map) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">🌍 Active Users by Country</h2>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
              <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const activeUsers = countryCounts[countryName] || 0;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={activeUsers > 0 ? "rgb(59, 130, 246)" : "#E5E7EB"}
                        stroke="#fff"
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* 🌏 Active Users by Country List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">🌏 Active Users by Country</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Country</th>
                  <th className="p-2">Active Users</th>
                </tr>
              </thead>
              <tbody>
                {countryList.map(({ country, count }) => (
                  <tr key={country} className="border-b">
                    <td className="p-2">{country}</td>
                    <td className="p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTracker>
  );
}
