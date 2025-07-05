# 📈 Stock Market Trend Prediction
A full-stack web application that predicts stock prices using machine learning, built with **React** (frontend) and **FastAPI** (backend). It fetches real-time stock data via **yfinance**, processes it using a **Decision Tree** model (as it provides maximum accuracy), and visualizes predicted trends interactively.

---

## 🚀 Features
- 🔍 **Ticker Search** – Search from 100+ popular stock tickers (AAPL, GOOGL, TSLA, etc.)
- 📆 **Days Selection** – Predict future stock prices for 1 to 365 days
- 📊 **Dual Charts** – See:
  - Predicted price chart for next N days
- ℹ️ **Stock Info** – Company info, IPO year, market cap, volume, etc.
- 📱 **QR Code** – Instantly open stock info on your phone
- 👤 **Login System** – Store history when logged in
- 🌙 **Modern UI** – Fully responsive dark theme

---

## 🖥️ Tech Stack
|   Frontend   |    Backend     |        ML Models        |       Others        |
|--------------|----------------|-------------------------|---------------------|
|   React.js   |    FastAPI     | Decision Tree Regressor |      yfinance       |
| Tailwind CSS |  Python 3.10+  |      Scikit-learn       | Plotly + Matplotlib |
|     Vite     |    Pydantic    |         Joblib          |     QR Code API     |

---

## 📂 Folder Structure
Stock-Market-Trend-Prediction/  
│  
├── Frontend/ # React frontend  
│ ├── public/  
│ ├── src/  
│ └── package.json  
│  
├── Backend/ # FastAPI backend  
│ ├── models/ # Trained ML model & scaler  
│ ├── static/ # Temporary plot images  
│ ├── main.py # Core backend logic  
│ └── requirements.txt  
│  
└── README.md  

---

## 🧠 ML Model Used
- **Decision Tree Regressor**
  - Trained on historical stock data
  - Features: Open, High, Low, Close, Volume, MA10, RSI
  - Used `scikit-learn`, `joblib`, `MinMaxScaler`
[Plenty of ML Models have been used with Decision Tree providing maximum Accuracy]

---

## ⚙️ How to Run Locally

### Frontend (React)
```bash  
cd Frontend  
npm install  
npm run dev
```
Runs on http://localhost:5173  

### Backend (FastAPI)
```bash  
cd Backend  
.\.venv\Scripts\activate  
uvicorn main:app --reload
```
Runs on http://127.0.0.1:8000   

---

## 📌 Author
Made with ❤️ by Souhardya Mridha [@Rio7-codes]

---

## 📃 License
This project is for educational/demo purposes. No commercial use without permission.
