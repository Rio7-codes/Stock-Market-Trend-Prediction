import { useEffect, useState } from "react";

export default function HomePage() {
  const [recentStocks, setRecentStocks] = useState([]);
  const [graphHtml, setGraphHtml] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/recent-stocks")
      .then((res) => res.json())
      .then((data) => setRecentStocks(data))
      .catch((err) => console.error("Failed to fetch recent stocks", err));

    fetch("http://localhost:8000/recent-stock-graph")
      .then((res) => res.text())
      .then((html) => setGraphHtml(html))
      .catch((err) => console.error("Failed to load recent stock graph", err));
  }, []);

  const handleClearHistory = async () => {
    try {
      await fetch("http://localhost:8000/clear-history", { method: "DELETE" });
      setRecentStocks([]);
      setGraphHtml(""); // Clear the graph as well
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex-grow p-3 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6">📊 Stock Trend Predictor</h1>
        <p className="text-lg text-gray-400 mb-8">
          Welcome to the intelligent stock trend forecasting dashboard. Use the navigation bar to access predictions and more...
        </p>

        {graphHtml && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Active Stocks</h2>
            <div
              dangerouslySetInnerHTML={{ __html: graphHtml }}
              className="rounded-md border border-gray-700"
            ></div>
          </div>
        )}

        {recentStocks.length > 0 ? (
          <div className="bg-[#161e2e] p-6 rounded-md border border-gray-700 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Recent Stocks</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
                  <tr>
                    <th className="py-2 pr-4">Ticker</th>
                    <th className="py-2 pr-4">Open</th>
                    <th className="py-2 pr-4">High</th>
                    <th className="py-2 pr-4">Low</th>
                    <th className="py-2 pr-4">Close</th>
                    <th className="py-2 pr-4">Adj. Close</th>
                    <th className="py-2 pr-4">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStocks.map((stock) => (
                    <tr key={stock.Ticker} className="border-b border-gray-700">
                      <td className="py-2 pr-4">{stock.Ticker}</td>
                      <td className="py-2 pr-4">{stock.Open.toFixed(2)}</td>
                      <td className="py-2 pr-4">{stock.High.toFixed(2)}</td>
                      <td className="py-2 pr-4">{stock.Low.toFixed(2)}</td>
                      <td className="py-2 pr-4">{stock.Close.toFixed(2)}</td>
                      <td className="py-2 pr-4">{stock["Adj Close"].toFixed(2)}</td>
                      <td className="py-2 pr-4">{stock.Volume.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No recent stocks yet. Go to "Predict" and try one!
          </p>
        )}
      </div>

      {recentStocks.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClearHistory}
            className="text-red-400 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}