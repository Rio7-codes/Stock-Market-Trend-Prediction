export default function InfoPopup({ info, onClose }) {
  const mappedInfo = {
    Symbol: info?.Symbol,
    Name: info?.Name || info?.["Short Name"] || info?.["Long Name"],
    "Last Sale": info?.["Regular Market Price"],
    "Net Change": info?.["Regular Market Change"],
    "Percent Change": info?.["Regular Market Change Percent"],
    "Market Capital": info?.MarketCapital || info?.["Market Cap"],
    Country: info?.Country,
    "IPO Year": info?.["IPO Year"],
    Volume: info?.Volume,
    Sector: info?.Sector,
    Industry: info?.Industry,
    Exchange: info?.Exchange || "NASDAQ",
    Currency: info?.Currency || "USD",
    "52 Week High": info?.["52 Week High"],
    "52 Week Low": info?.["52 Week Low"],
    "Open": info?.Open,
    "Day High": info?.["Day High"],
    "Day Low": info?.["Day Low"],
    "Full Time Employees": info?.["Full Time Employees"],
    Website: info?.Website || `https://finance.yahoo.com/quote/${info?.Symbol}`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#161e2e] p-6 rounded-md border border-gray-700 w-[90%] max-w-2xl max-h-[90%] overflow-y-auto relative">
        <button
          className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">More Information</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <tbody>
            {Object.entries(mappedInfo).map(([key, val]) => (
              <tr key={key}>
                <th className="py-2 pr-4 font-medium text-gray-400 whitespace-nowrap">
                  {key}
                </th>
                <td className="py-2 break-words">
                  {key === "Website" ? (
                    <a
                      href={val}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      {val}
                    </a>
                  ) : val !== undefined && val !== "" ? (
                    val
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}