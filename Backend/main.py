from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

import os
import joblib
import numpy as np
import pandas as pd
import yfinance as yf

from io import BytesIO
import base64
from collections import deque

recent_stock_data = deque(maxlen=10)

app = FastAPI(title="Stock Trend Prediction API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join("models", "decision_tree.joblib")
SCALER_PATH = os.path.join("models", "scaler.joblib")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except FileNotFoundError as e:
    raise RuntimeError(f"Model artifact missing: {e}")

class InputData(BaseModel):
    open: float
    high: float
    low: float
    close: float
    volume: float
    ma10: float
    rsi: float

@app.get("/")
def root():
    return {"message": "API is running"}

def render_combined_recent_graph():
    if not recent_stock_data:
        return

    fig, ax = plt.subplots(figsize=(12, 5), dpi=100)
    fig.patch.set_facecolor('#0a0e1a')
    ax.set_facecolor('#0a0e1a')
    color_cycle = plt.cm.tab10.colors

    for idx, stock in enumerate(recent_stock_data):
        try:
            df = yf.download(stock["Ticker"], period="10d", interval="1d", progress=False)
            if df.empty or 'Close' not in df:
                continue
            df['Close'] = df['Close'].round(2)
            ax.plot(df.index, df['Close'], label=stock["Ticker"], color=color_cycle[idx % 10], linewidth=2)
        except:
            continue

    ax.set_title("Recent Stock Prices", color='white', fontsize=14)
    ax.grid(True, color='white', linestyle='--', linewidth=0.4)
    ax.legend(facecolor='#0a0e1a', edgecolor='white', labelcolor='white')

    for spine in ax.spines.values():
        spine.set_color('white')
    ax.tick_params(axis='x', colors='white', rotation=45)
    ax.tick_params(axis='y', colors='white')

    plt.tight_layout()
    buf = BytesIO()
    plt.savefig(buf, format="png", facecolor=fig.get_facecolor(), bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode("utf-8")
    return f"<img src='data:image/png;base64,{encoded}' style='width:100%; border-radius:8px;'/>"

def render_predicted_stock_graph(ticker, df, days):
    fig, ax = plt.subplots(figsize=(12, 5), dpi=100)
    fig.patch.set_facecolor('#0a0e1a')
    ax.set_facecolor('#0a0e1a')

    ax.plot(df.index, df['Close'], color='cyan', linewidth=2, label=f"{ticker.upper()} Prediction")
    ax.set_title(f"Predicted {ticker.upper()} Stock Price for the Next {days} Days", color='white', fontsize=14)
    ax.grid(True, color='white', linestyle='--', linewidth=0.4)
    ax.legend(facecolor='#0a0e1a', edgecolor='white', labelcolor='white')

    for spine in ax.spines.values():
        spine.set_color('white')
    ax.tick_params(axis='x', colors='white', rotation=45)
    ax.tick_params(axis='y', colors='white')

    plt.tight_layout()
    buf = BytesIO()
    plt.savefig(buf, format="png", facecolor=fig.get_facecolor(), bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode("utf-8")
    return f"<img src='data:image/png;base64,{encoded}' style='width:100%; border-radius:8px;'/>"

@app.get("/historical-chart", response_class=HTMLResponse)
def historical_chart(ticker: str = "AAPL", days: int = 30):
    try:
        df = yf.download(ticker, period=f"{days}d", interval="1d", progress=False)
        if df.empty or "Close" not in df.columns:
            raise HTTPException(status_code=404, detail="Chart not available for this ticker")

        fig, ax = plt.subplots(figsize=(12, 5), dpi=100)
        fig.patch.set_facecolor("#0a0e1a")
        ax.set_facecolor("#0a0e1a")

        ax.plot(df.index, df["Close"], label="Close", color="cyan", linewidth=2)

        ax.set_title(f"{ticker.upper()} - Last {days} Days", color="white", fontsize=14)
        ax.grid(True, color="white", linestyle="--", linewidth=0.4)
        ax.legend(facecolor="#0a0e1a", edgecolor="white", labelcolor='white')

        for spine in ax.spines.values():
            spine.set_color("white")
        ax.tick_params(axis="x", colors="white", rotation=45)
        ax.tick_params(axis="y", colors="white")

        plt.tight_layout()
        buf = BytesIO()
        plt.savefig(buf, format="png", facecolor=fig.get_facecolor(), bbox_inches="tight")
        plt.close(fig)
        buf.seek(0)
        encoded = base64.b64encode(buf.read()).decode("utf-8")
        return HTMLResponse(content=f"<img src='data:image/png;base64,{encoded}' style='width:100%; border-radius:8px;'/>")
    except Exception as e:
        print(f"🔥 Historical Chart Route Error: {e}")
        raise HTTPException(status_code=500, detail="Historical chart generation failed")

@app.get("/stock-graph", response_class=HTMLResponse)
def stock_graph(ticker: str = "AAPL", days: int = 30):
    try:
        if days <= 0 or days > 365:
            raise HTTPException(status_code=400, detail="Days must be between 1 and 365")

        df_hist = yf.download(ticker, period="60d", interval="1d", progress=False)
        if df_hist.empty or "Close" not in df_hist.columns:
            raise HTTPException(status_code=404, detail="Stock data not found or incomplete")

        close_series = df_hist["Close"].dropna()
        if close_series.empty:
            raise HTTPException(status_code=404, detail="No valid close prices found")

        last_close = close_series.iloc[-1]
        latest = df_hist.iloc[-1]
        ticker_upper = ticker.upper()

        if all(stock["Ticker"] != ticker_upper for stock in recent_stock_data):
            recent_stock_data.appendleft({
                "Ticker": ticker_upper,
                "Open": float(latest["Open"]),
                "High": float(latest["High"]),
                "Low": float(latest["Low"]),
                "Close": float(latest["Close"]),
                "Adj Close": float(latest.get("Adj Close", latest["Close"])),
                "Volume": int(latest["Volume"].item() if hasattr(latest["Volume"], 'item') else latest["Volume"]),
            })

        total_days = days + 1
        future_dates = pd.date_range(start=pd.Timestamp.today() + pd.Timedelta(days=1), periods=total_days, freq="B")
        predicted_changes = np.random.normal(loc=0.001, scale=0.01, size=total_days)
        predicted_prices = [last_close]

        for i in range(1, total_days):
            next_price = predicted_prices[-1] * (1 + predicted_changes[i])
            predicted_prices.append(round(next_price, 2))

        pred_df = pd.DataFrame({"Close": predicted_prices[1:]}, index=future_dates[1:])
        return HTMLResponse(content=render_predicted_stock_graph(ticker, pred_df, days))

    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"🔥 Prediction Graph Error: {e}")
        raise HTTPException(status_code=500, detail="Graph rendering failed")

@app.get("/recent-stocks")
def get_recent_stocks():
    return list(recent_stock_data)

@app.get("/recent-stock-graph", response_class=HTMLResponse)
def recent_stock_graph():
    try:
        return HTMLResponse(content=render_combined_recent_graph())
    except Exception as e:
        print(f"[Recent Stock Graph Error] {e}")
        raise HTTPException(status_code=500, detail="Failed to generate combined stock graph")

@app.post("/predict")
def predict(data: InputData):
    try:
        X = np.array([[data.open, data.high, data.low, data.close, data.volume, data.ma10, data.rsi]])
        X_scaled = scaler.transform(X)
        pred = int(model.predict(X_scaled)[0])
        return {"prediction": pred}
    except Exception as err:
        print(f"[Predict Error] {err}")
        raise HTTPException(status_code=500, detail=str(err))

@app.delete("/clear-history")
def clear_recent_stock_history():
    try:
        recent_stock_data.clear()
        return {"message": "History cleared"}
    except Exception as e:
        print(f"[Clear History Error] {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stock-info")
def get_stock_info(ticker: str = "AAPL"):
    try:
        stock = yf.Ticker(ticker)
        data = stock.info

        def safe_get(key, default="N/A"):
            return data.get(key) if data.get(key) not in [None, ""] else default

        ipo_year = "N/A"
        if "ipoYear" in data:
            ipo_year = safe_get("ipoYear")
        elif "startDate" in data:
            try:
                ipo_year = datetime.utcfromtimestamp(int(data["startDate"])).year
            except:
                pass

        return {
            "Symbol": safe_get("symbol"),
            "Short Name": safe_get("shortName"),
            "Long Name": safe_get("longName"),
            "Regular Market Price": safe_get("regularMarketPrice"),
            "Regular Market Change": safe_get("regularMarketChange"),
            "Regular Market Change Percent": safe_get("regularMarketChangePercent"),
            "Previous Close": safe_get("previousClose"),
            "Open": safe_get("open"),
            "Day Low": safe_get("dayLow"),
            "Day High": safe_get("dayHigh"),
            "52 Week Low": safe_get("fiftyTwoWeekLow"),
            "52 Week High": safe_get("fiftyTwoWeekHigh"),
            "Volume": safe_get("volume"),
            "Average Volume": safe_get("averageVolume"),
            "Market Cap": safe_get("marketCap"),
            "Currency": safe_get("currency"),
            "Exchange": safe_get("exchange"),
            "Quote Type": safe_get("quoteType"),
            "Sector": safe_get("sector"),
            "Industry": safe_get("industry"),
            "Country": safe_get("country"),
            "IPO Year": ipo_year,
            "Website": safe_get("website", f"https://finance.yahoo.com/quote/{ticker}"),
            "Logo URL": safe_get("logo_url"),
            "Full Time Employees": safe_get("fullTimeEmployees"),
        }

    except Exception as e:
        print(f"[Stock Info Error] {e}")
        raise HTTPException(status_code=500, detail=str(e))