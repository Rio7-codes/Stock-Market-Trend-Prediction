export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold mb-6">📈 About This Application</h1>

      <div className="text-lg text-gray-400 mb-8 space-y-6">
        <p>
          This intelligent web application empowers users to explore and predict stock market movements using classical machine learning algorithms and technical indicators. 
          Built with a <span className="text-gray-100 font-semibold">FastAPI backend</span> and a <span className="text-gray-100 font-semibold">React + Tailwind CSS frontend</span>, 
          the app offers seamless navigation and interactive stock trend predictions tailored for both casual investors and data enthusiasts.
        </p>

        <p>
          The machine learning pipeline incorporates models including <span className="text-gray-100 font-semibold">Support Vector Machine (SVM)</span>, 
          <span className="text-gray-100 font-semibold">Random Forest</span>, <span className="text-gray-100 font-semibold">Logistic Regression</span>, 
          and <span className="text-gray-100 font-semibold">Decision Tree</span>. Historical stock data was fetched using <code className="text-white bg-gray-700 px-1 rounded">yfinance</code> and 
          enhanced with indicators like RSI, MACD, EMA, SMA, and Bollinger Bands, then preprocessed for training. 
          After evaluating all models using accuracy scores, confusion matrices, and ROC-AUC, the <span className="text-white font-semibold">Decision Tree</span> emerged as the final choice due to its balance of 
          simplicity, interpretability, and high performance. It was ultimately exported for real-time inference along with the preprocessing scaler.
        </p>
      </div>
      <br></br>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.python.org/static/opengraph-icon-200x200.png" alt="Python" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://numpy.org/doc/" target="_blank" rel="noopener noreferrer">
            <img src="https://raw.githubusercontent.com/valohai/ml-logos/master/numpy.svg" alt="Numpy" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer">
            <img src="https://raw.githubusercontent.com/valohai/ml-logos/master/pandas.svg" alt="Pandas" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://scikit-learn.org/stable/user_guide.html" target="_blank" rel="noopener noreferrer">
            <img src="https://raw.githubusercontent.com/valohai/ml-logos/master/scikit-learn.svg" alt="scikit-learn" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://pypi.org/project/yfinance/" target="_blank" rel="noopener noreferrer">
            <img src="https://avatars.githubusercontent.com/u/52099355?s=200&v=4" alt="yfinance" className="h-12 hover:scale-110 transition-transform rounded-full" />
          </a>
          <a href="https://matplotlib.org/stable/users/index.html" target="_blank" rel="noopener noreferrer">
            <img src="https://matplotlib.org/_static/logo2_compressed.svg" alt="Matplotlib" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.tensorflow.org/learn" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" alt="TensorFlow" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://keras.io/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" alt="Keras" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" className="h-12 hover:scale-110 transition-transform" />
          </a>
          <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="FastAPI" className="h-12 hover:scale-110 transition-transform" />
          </a>
        </div>
        <br></br>
        <br></br>
      </main>

      <footer className="mt-20 mb-30 text-gray-600 text-xs text-center">
        © 2025 Souhardya Mridha | Snehashree Nayak | Debaranjan Lenka | Rishav Raj | Sreyashi Dash | Poonam Parida • Built using FastAPI, React and Python ML tools
      </footer>
    </div>
  );
}