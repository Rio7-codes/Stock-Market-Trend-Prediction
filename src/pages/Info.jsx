export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="mb-4">
        This Stock Market Trend Predictor uses machine learning models trained on historical stock data to forecast whether the stock price is likely to go up or down.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How It Works</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Users enter recent stock values (Open, Close, RSI, etc.)</li>
        <li>Data is scaled and fed into a trained ML model (e.g., Decision Tree)</li>
        <li>The backend returns a prediction for upward 📈 or downward 📉 trend</li>
        <li>Additionally, users can get multi-day predictions based on ticker</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Technologies Used</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><b>Frontend:</b> React + Tailwind CSS</li>
        <li><b>Backend:</b> FastAPI + Scikit-learn + Pandas</li>
        <li><b>Model:</b> Trained using historical data from Yahoo Finance</li>
      </ul>

      <p className="mt-6 text-sm text-gray-400">
        Created by Souhardya Mridha &mdash; 2025
      </p>
    </div>
  );
}
