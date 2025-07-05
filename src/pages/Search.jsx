import { useEffect, useState } from "react";

export default function SearchPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showModal) {
      window.history.pushState({ modal: true }, "");

      const handlePopState = (event) => {
        setShowModal(false);
        setSearchTerm("");
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [showModal]);


  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSearchTerm("");
  };

  const tickerData = [
    ["AAPL", "Apple Inc."],
    ["MSFT", "Microsoft Corporation"],
    ["GOOGL", "Alphabet Inc. (Google)"],
    ["AMZN", "Amazon.com, Inc."],
    ["TSLA", "Tesla, Inc."],
    ["NVDA", "NVIDIA Corporation"],
    ["META", "Meta Platforms, Inc."],
    ["NFLX", "Netflix, Inc."],
    ["AMD", "Advanced Micro Devices, Inc."],
    ["INTC", "Intel Corporation"],
    ["BRK-B", "Berkshire Hathaway Inc."],
        ["V", "Visa Inc."],
    ["JPM", "JPMorgan Chase & Co."],
    ["JNJ", "Johnson & Johnson"],
    ["WMT", "Walmart Inc."],
    ["PG", "Procter & Gamble Company"],
    ["MA", "Mastercard Incorporated"],
    ["DIS", "The Walt Disney Company"],
    ["BAC", "Bank of America Corporation"],
    ["PFE", "Pfizer Inc."],
    ["T", "AT&T Inc."],
    ["KO", "The Coca-Cola Company"],
    ["CSCO", "Cisco Systems, Inc."],
    ["CVX", "Chevron Corporation"],
    ["PEP", "PepsiCo, Inc."],
    ["XOM", "Exxon Mobil Corporation"],
    ["ABBV", "AbbVie Inc."],
    ["UNH", "UnitedHealth Group Incorporated"],
    ["ORCL", "Oracle Corporation"],
    ["NKE", "NIKE, Inc."],
    ["CRM", "Salesforce, Inc."],
    ["COST", "Costco Wholesale Corporation"],
    ["WFC", "Wells Fargo & Company"],
    ["ABT", "Abbott Laboratories"],
    ["QCOM", "QUALCOMM Incorporated"],
    ["TXN", "Texas Instruments Incorporated"],
    ["TMO", "Thermo Fisher Scientific Inc."],
    ["LLY", "Eli Lilly and Company"],
    ["MRK", "Merck & Co., Inc."],
    ["MCD", "McDonald's Corporation"],
    ["GE", "General Electric Company"],
    ["GS", "The Goldman Sachs Group, Inc."],
    ["ADBE", "Adobe Inc."],
    ["BMY", "Bristol-Myers Squibb Company"],
    ["IBM", "International Business Machines Corporation"],
    ["BA", "The Boeing Company"],
    ["MDT", "Medtronic plc"],
    ["PYPL", "PayPal Holdings, Inc."],
    ["HON", "Honeywell International Inc."],
    ["AMGN", "Amgen Inc."],
    ["CAT", "Caterpillar Inc."],
    ["AVGO", "Broadcom Inc."],
    ["AXP", "American Express Company"],
    ["LOW", "Lowe's Companies, Inc."],
    ["INTU", "Intuit Inc."],
    ["NEE", "NextEra Energy, Inc."],
    ["SBUX", "Starbucks Corporation"],
    ["LMT", "Lockheed Martin Corporation"],
    ["AMAT", "Applied Materials, Inc."],
    ["BKNG", "Booking Holdings Inc."],
    ["NOW", "ServiceNow, Inc."],
    ["ISRG", "Intuitive Surgical, Inc."],
    ["ZTS", "Zoetis Inc."],
    ["SPGI", "S&P Global Inc."],
    ["SYK", "Stryker Corporation"],
    ["GILD", "Gilead Sciences, Inc."],
    ["MO", "Altria Group, Inc."],
    ["CI", "The Cigna Group"],
    ["ADI", "Analog Devices, Inc."],
    ["MMC", "Marsh & McLennan Companies, Inc."],
    ["REGN", "Regeneron Pharmaceuticals, Inc."],
    ["TGT", "Target Corporation"],
    ["VRTX", "Vertex Pharmaceuticals Incorporated"],
    ["PLD", "Prologis, Inc."],
    ["CB", "Chubb Limited"],
    ["APD", "Air Products and Chemicals, Inc."],
    ["BLK", "BlackRock, Inc."],
    ["FISV", "Fiserv, Inc."],
    ["DUK", "Duke Energy Corporation"],
    ["BDX", "Becton, Dickinson and Company"],
    ["CL", "Colgate-Palmolive Company"],
    ["CSX", "CSX Corporation"],
    ["DE", "Deere & Company"],
    ["ADP", "Automatic Data Processing, Inc."],
    ["SO", "The Southern Company"],
    ["PNC", "The PNC Financial Services Group, Inc."],
    ["ICE", "Intercontinental Exchange, Inc."],
    ["NSC", "Norfolk Southern Corporation"],
    ["FDX", "FedEx Corporation"],
    ["ETN", "Eaton Corporation plc"],
    ["EW", "Edwards Lifesciences Corporation"],
    ["SHW", "The Sherwin-Williams Company"],
    ["DHR", "Danaher Corporation"],
    ["MNST", "Monster Beverage Corporation"],
    ["GM", "General Motors Company"],
    ["F", "Ford Motor Company"],
    ["ROST", "Ross Stores, Inc."],
    ["ECL", "Ecolab Inc."],
    ["HUM", "Humana Inc."],
    ["DG", "Dollar General Corporation"],
    ["PSA", "Public Storage"],
    ["EMR", "Emerson Electric Co."],
    ["AON", "Aon plc"],
    ["AEP", "American Electric Power Company, Inc."],
    ["KMB", "Kimberly-Clark Corporation"],
    ["ITW", "Illinois Tool Works Inc."],
    ["STZ", "Constellation Brands, Inc."],
    ["SPG", "Simon Property Group, Inc."],
    ["TRV", "The Travelers Companies, Inc."],
    ["TEL", "TE Connectivity Ltd."],
    ["EXC", "Exelon Corporation"],
    ["PSX", "Phillips 66"],
    ["CME", "CME Group Inc."],
    ["KMI", "Kinder Morgan, Inc."],
    ["AIG", "American International Group, Inc."],
    ["CARR", "Carrier Global Corporation"],
    ["IDXX", "IDEXX Laboratories, Inc."],
    ["MS", "Morgan Stanley"],
    ["YUM", "Yum! Brands, Inc."],
    ["NOC", "Northrop Grumman Corporation"],
    ["CTSH", "Cognizant Technology Solutions Corporation"],
    ["MTD", "Mettler-Toledo International Inc."],
    ["ORLY", "O'Reilly Automotive, Inc."],
    ["PAYX", "Paychex, Inc."],
    ["HLT", "Hilton Worldwide Holdings Inc."],
    ["OXY", "Occidental Petroleum Corporation"],
    ["ODFL", "Old Dominion Freight Line, Inc."],
    ["HPQ", "HP Inc."],
    ["BIIB", "Biogen Inc."],
    ["VRSK", "Verisk Analytics, Inc."],
    ["D", "Dominion Energy, Inc."],
    ["TDG", "TransDigm Group Incorporated"],
    ["AZO", "AutoZone, Inc."],
    ["SRE", "Sempra"],
    ["WELL", "Welltower Inc."],
    ["EFX", "Equifax Inc."],
    ["VLO", "Valero Energy Corporation"],
    ["EBAY", "eBay Inc."],
    ["HES", "Hess Corporation"],
    ["WBD", "Warner Bros. Discovery, Inc."],
    ["PGR", "The Progressive Corporation"],
    ["CNC", "Centene Corporation"],
    ["RCL", "Royal Caribbean Group"],
    ["LEN", "Lennar Corporation"],
    ["ANET", "Arista Networks, Inc."],
    ["MAR", "Marriott International, Inc."],
    ["ZBH", "Zimmer Biomet Holdings, Inc."],
    ["KHC", "The Kraft Heinz Company"],
    ["ABC", "AmerisourceBergen Corporation"],
    ["DLR", "Digital Realty Trust, Inc."]
  ];

  const filteredTickers = tickerData.filter(
    ([symbol, name]) =>
      symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 text-white min-h-screen">
      <div className="bg-[#0d111c] rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Tickers</h2>
          <button
            className="text-red-500 hover:underline text-sm"
            onClick={() => setShowModal(true)}
          >
            Show All
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-2 font-semibold text-sm text-red-500">Ticker Symbol</th>
              <th className="px-4 py-2 font-semibold text-sm text-red-500">Ticker Name</th>
            </tr>
          </thead>
          <tbody>
            {tickerData.slice(0, 12).map(([symbol, name], idx) => (
              <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="px-4 py-2 text-sm">{symbol}</td>
                <td className="px-4 py-2 text-sm">{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        id="scrollToTopBtn"
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        onClick={handleScrollToTop}
        style={{ display: "none" }}
      >
        ↑
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="absolute top-10 right-28 z-50">
            <button
              className="text-white text-lg hover:text-red-400"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
          <div className="bg-[#0d111c] rounded-lg p-6 w-[90%] max-w-3xl h-[80vh] overflow-y-auto relative">
            <input
              type="text"
              placeholder="Search tickers..."
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-2 font-semibold text-sm text-red-500">Ticker Symbol</th>
                  <th className="px-4 py-2 font-semibold text-sm text-red-500">Ticker Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickers.map(([symbol, name], idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="px-4 py-2 text-sm">{symbol}</td>
                    <td className="px-4 py-2 text-sm">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}