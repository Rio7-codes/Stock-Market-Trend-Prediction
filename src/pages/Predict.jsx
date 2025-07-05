import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PredictPopup from "../components/PredictPopup";
import InfoPopup from "../components/InfoPopup";
import { Expand, X } from "lucide-react";
import styles from "./Predict.module.css";

export default function PredictPage() {
  const allTickers = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "NFLX", "AMD", "INTC",
    "BRK-B", "V", "JPM", "JNJ", "WMT", "PG", "MA", "DIS", "BAC", "PFE", "T", "KO",
    "CSCO", "CVX", "PEP", "XOM", "ABBV", "UNH", "ORCL", "NKE", "CRM", "COST", "WFC",
    "ABT", "QCOM", "TXN", "TMO", "LLY", "MRK", "MCD", "GE", "GS", "ADBE", "BMY", "IBM",
    "BA", "MDT", "PYPL", "HON", "AMGN", "CAT", "AVGO", "AXP", "LOW", "INTU", "NEE",
    "SBUX", "LMT", "AMAT", "BKNG", "NOW", "ISRG", "ZTS", "SPGI", "SYK", "GILD", "MO",
    "CI", "ADI", "MMC", "REGN", "TGT", "VRTX", "PLD", "CB", "APD", "BLK", "FISV",
    "DUK", "BDX", "CL", "CSX", "DE", "ADP", "SO", "PNC", "ICE", "NSC", "FDX", "ETN",
    "EW", "SHW", "DHR", "MNST", "GM", "F", "ROST", "ECL", "HUM", "DG", "PSA", "EMR",
    "AON", "AEP", "KMB", "ITW", "STZ", "SPG", "TRV", "TEL", "EXC", "PSX", "CME", "KMI",
    "AIG", "CARR", "IDXX", "MS", "YUM", "NOC", "CTSH", "MTD", "ORLY", "PAYX", "HLT",
    "OXY", "ODFL", "HPQ", "BIIB", "VRSK", "D", "TDG", "AZO", "SRE", "WELL", "EFX",
    "VLO", "EBAY", "HES", "WBD", "PGR", "CNC", "RCL", "LEN", "ANET", "MAR", "ZBH",
    "KHC", "ABC", "DLR"
  ];

  const [ticker, setTicker] = useState("AAPL");
  const [tickerSuggestions, setTickerSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [days, setDays] = useState(30);
  const [showPopup, setShowPopup] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [chartHTML, setChartHTML] = useState("");
  const [info, setInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewResult, setViewResult] = useState(searchParams.get("view") === "results");
  const [showChart, setShowChart] = useState(true);
  const [fullscreenTarget, setFullscreenTarget] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const chartRef = useRef(null);
  const tickerInputRef = useRef(null);
  const navigate = useNavigate();

  const renderHTMLWithScripts = (containerId, htmlString) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = htmlString;
    const scripts = container.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const oldScript = scripts[i];
      const newScript = document.createElement("script");
      newScript.text = oldScript.text;
      if (oldScript.src) newScript.src = oldScript.src;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    }
  };

  useEffect(() => {
    localStorage.setItem("showFooter", "false");
    const urlTicker = searchParams.get("ticker");
    const urlDays = searchParams.get("days");
    if (urlTicker) setTicker(urlTicker);
    if (urlDays) setDays(Number(urlDays));
  }, []);

  useEffect(() => {
    const view = searchParams.get("view");
    setViewResult(view === "results");
  }, [searchParams]);

  useEffect(() => {
    if (viewResult && ticker && days) {
      fetch(`http://localhost:8000/stock-graph?ticker=${ticker}&days=${days}`)
        .then((res) => res.text())
        .then((html) => {
          setChartHTML(html);
          setTimeout(() => renderHTMLWithScripts("prediction-chart", html), 0);
        });

      fetch(`http://localhost:8000/stock-info?ticker=${ticker}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    }
  }, [viewResult, ticker, days]);

  const handleTickerChange = (e) => {
    const val = e.target.value.toUpperCase();
    setTicker(val);
    setHighlightedIndex(-1);
    if (val === "") {
      setTickerSuggestions([]);
      return;
    }
    const matches = allTickers.filter((t) => t.includes(val));
    setTickerSuggestions(matches);
  };

  const handleTickerKeyDown = (e) => {
    if (tickerSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, tickerSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      setTicker(tickerSuggestions[highlightedIndex]);
      setTickerSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handlePredict = (e) => {
    if (e) e.preventDefault();
    const trimmedTicker = ticker.trim();
    const numDays = Number(days);
    if (trimmedTicker === "" || days === "") {
      alert("Please fill in both the Ticker Name and Number of Days.");
      return;
    }
    if (isNaN(numDays) || numDays < 1 || numDays > 365) {
      alert("Please enter a valid number of days (1–365).");
      return;
    }
    setSearchParams({ view: "results", ticker: trimmedTicker, days: numDays + 1 });
    localStorage.setItem("showFooter", "true");
  };

  const toggleFullscreen = (ref, id) => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen();
      setFullscreenTarget(id);
    } else {
      document.exitFullscreen();
      setFullscreenTarget(null);
    }
  };

  useEffect(() => {
    const handleExit = () => setFullscreenTarget(null);
    document.addEventListener("fullscreenchange", handleExit);
    return () => document.removeEventListener("fullscreenchange", handleExit);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="flex-grow p-3 overflow-y-auto">
        {!viewResult && (
          <>
            <h1 className="text-4xl font-bold mb-6">📈 Predict Stock Trends</h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter a stock ticker and number of days to generate a future prediction based on historical data.
            </p>
            <div className="bg-[#161e2e] p-6 rounded-md mb-8">
              <form className="space-y-5" onSubmit={handlePredict}>
                <div className="relative">
                  <label className="block mb-1">Ticker Name</label>
                  <input
                    type="text"
                    value={ticker}
                    ref={tickerInputRef}
                    onChange={handleTickerChange}
                    onKeyDown={handleTickerKeyDown}
                    placeholder="e.g. GOOGL"
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700"
                  />
                  {tickerSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg w-full max-h-48 overflow-y-auto">
                      {tickerSuggestions.map((suggestion, index) => (
                        <li
                          key={suggestion}
                          onClick={() => {
                            setTicker(suggestion);
                            setTickerSuggestions([]);
                            setHighlightedIndex(-1);
                          }}
                          className={`px-4 py-2 cursor-pointer text-white ${
                            index === highlightedIndex ? "bg-gray-600" : "hover:bg-gray-700"
                          }`}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Number of Days</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={days}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setDays(val === "" ? "" : Number(val));
                      }
                    }}
                    placeholder="e.g. 250"
                    className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter a number between 1 and 365.</p>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white"
                  >
                    Predict
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {viewResult && info && (
          <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-[#161e2e] p-6 rounded-md border border-gray-700 shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-white">Information</h2>
                  <span
                    className="text-red-500 text-sm cursor-pointer hover:underline"
                    onClick={() => setShowInfoPopup(true)}
                  >
                    Show More
                  </span>
                </div>
                <table className="w-full text-sm text-left text-gray-300">
                  <tbody>
                    {Object.entries(info).slice(0, 9).map(([key, val]) => (
                      <tr key={key}>
                        <th className="py-2 pr-4 font-medium text-gray-400 whitespace-nowrap">
                          {key.replace(/([A-Z])/g, " $1")}
                        </th>
                        <td className="py-2">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#161e2e] p-6 rounded-md border border-gray-700 shadow-md flex flex-col items-center justify-center">
                <h2 className="text-md font-semibold text-gray-200 mb-4">Scan the QR Code</h2>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${
                    encodeURIComponent(info?.Website || `https://finance.yahoo.com/quote/${info?.Symbol}`)
                  }`}
                  alt="QR Code"
                  className="border-2 border-white p-1 rounded"
                />
              </div>
            </div>

            <div
              ref={chartRef}
              className="relative bg-[#161e2e] p-6 rounded-md border border-gray-700 shadow-md w-full"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                Predicted Stock Price for next {days} days
              </h2>
              {showChart ? (
                chartHTML ? (
                  <div
                    id="prediction-chart"
                    dangerouslySetInnerHTML={{ __html: chartHTML }}
                    className="rounded-lg border border-gray-700 w-full"
                  />
                ) : (
                  <p className="text-gray-400 italic">Loading chart...</p>
                )
              ) : (
                <p className="text-gray-500 italic">Chart hidden</p>
              )}
              <div className="absolute bottom-3 right-9 flex gap-2">
                <button
                  onClick={() => setShowChart((prev) => !prev)}
                  className="text-xs bg-[#161e2e] border border-gray-700 px-2 py-1 rounded hover:bg-gray-800"
                >
                  {showChart ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => toggleFullscreen(chartRef, "prediction")}
                  className="text-xs bg-[#161e2e] border border-gray-700 px-2 py-1 rounded hover:bg-gray-800 flex items-center gap-1"
                >
                  {fullscreenTarget === "prediction" ? <><X size={14} /> Exit</> : <><Expand size={14} /> Fullscreen</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <PredictPopup
            onClose={() => setShowPopup(false)}
            onResult={(result) => setPrediction(result)}
          />
        )}

        {showInfoPopup && (
          <InfoPopup info={info} onClose={() => setShowInfoPopup(false)} />
        )}
      </div>
    </div>
  );
}