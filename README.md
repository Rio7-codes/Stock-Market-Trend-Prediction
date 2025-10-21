# Stock Market Trend Prediction 📈
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

## 📃 License
MIT License

Copyright (c) 2025 Rio7-codes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 📌 Author
Made with ❤️ by Souhardya Mridha [@Rio7-codes]

---
