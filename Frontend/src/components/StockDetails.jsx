import React from "react";

export default function StockDetails({ info }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Information</h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-white">
        {Object.entries(info).map(([label, value]) => (
          <div key={label} className="flex justify-between border-b border-gray-700 pb-1">
            <span className="text-gray-400">{label}</span>
            <span className="text-right">{value ?? "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}