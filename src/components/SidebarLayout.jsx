import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BarChart3, Home, Info, LineChart, LogIn } from "lucide-react";
import LoginModel from "./LoginModel";

export default function SidebarLayout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const clearHistory = async () => {
    try {
      await fetch("http://127.0.0.1:8000/clear-history", {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to clear history on login/logout", err);
    }
  };

  const handleLogin = async (inputName) => {
    setUsername(inputName);
    localStorage.setItem("username", inputName);
    setShowLogin(false);
    await clearHistory();
    navigate("/");
    window.location.reload();
  };

  const handleLogout = async () => {
    setUsername("Guest");
    localStorage.removeItem("username");
    setShowUserOptions(false);
    await clearHistory();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden text-white" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="w-56 bg-[#161e2e] flex flex-col justify-between p-5">
        <div>
          <Link
            to="/"
            className="text-3xl font-bold flex items-center gap-2 mb-10 hover:text-red-400 transition"
          >
            <BarChart3 className="text-red-500" /> Stocks
          </Link>

          <nav className="space-y-4">
            <NavLink to="/" className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`}>
              <Home /> Home
            </NavLink>
            <NavLink to="/predict" className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`}>
              <LineChart /> Predict
            </NavLink>
            <NavLink to="/search" className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`}>
              <Info /> Ticker Info
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`}>
              <Info /> About
            </NavLink>
          </nav>
        </div>

        <div
          onClick={() => {
            username === "Guest" ? setShowLogin(true) : setShowUserOptions(true);
          }}
          className="cursor-pointer hover:text-red-400"
        >
          {username === "Guest" ? (
            <div className="pl-2.5 group cursor-pointer text-left transition-all duration-300 ease-out hover:scale-105 -mt-1">
              <div className="flex items-center gap-2 text-[1.25rem] font-semibold text-white group-hover:text-red-400 transition-colors duration-300 relative">
                <LogIn className="text-white text-lg transition-colors duration-300" />
                <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-red-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Guest
                </span>
              </div>
            </div>
          ) : (
            <div className="text-left cursor-pointer group pl-2">
              <div className="text-xs text-white transition-all duration-300  leading-tight pl-7 group-hover:-translate-x-1 ease-out">
                &nbsp;Welcome,
              </div>
              <div className="flex items-center gap-2 text-white text-lg font-semibold relative transition duration-300 ease-out">
                <LogIn
                  className="text-white transition-all duration-300 ease-out group-hover:-translate-x-1"
                />
                <span className="relative transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-red-400 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-red-400 group-hover:after:w-full after:transition-all after:duration-300">
                  {username}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 min-w-0 overflow-y-auto p-8">{children}</main>

      {showLogin && (
        <LoginModel
          closeModal={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {showUserOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl w-80">
            <h2 className="text-2xl font-bold mb-6 text-center">Hello, {username}!</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowUserOptions(false)}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold"
              >
                Continue
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}