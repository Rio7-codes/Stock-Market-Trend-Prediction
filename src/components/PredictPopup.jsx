import { useState } from "react";

export default function PredictPopup({ onClose, onResult }) {
  const [form, setForm] = useState({
    open: "", high: "", low: "", close: "",
    volume: "", ma10: "", rsi: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          open: parseFloat(form.open),
          high: parseFloat(form.high),
          low: parseFloat(form.low),
          close: parseFloat(form.close),
          volume: parseFloat(form.volume),
          ma10: parseFloat(form.ma10),
          rsi: parseFloat(form.rsi),
        }),
      });
      const result = await response.json();
      onResult(result.prediction);
      onClose();
    } catch (err) {
      alert("Prediction failed. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Stock Prediction</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(form).map(([key, value]) => (
            <input
              key={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key}
              className="p-2 bg-gray-800 rounded"
              type="number"
              step="any"
            />
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <button onClick={handleSubmit} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Predict
          </button>
          <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}