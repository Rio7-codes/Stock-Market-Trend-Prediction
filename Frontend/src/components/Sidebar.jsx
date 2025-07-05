import { BarChart3, Home, Info, LineChart, LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ onLoginClick, username }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="w-56 bg-gray-800 p-5 space-y-6 flex flex-col justify-between min-h-screen">
      <div>
        <div
          onClick={() => (window.location.href = "/")}
          className="text-3xl font-bold flex items-center gap-2 mb-10 cursor-pointer"
        >
          <BarChart3 className="text-red-500" /> Stocks
        </div>
        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`
            }
          >
            <Home /> Home
          </NavLink>
          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`
            }
          >
            <LineChart /> Predict
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:text-red-400"
              }`
            }
          >
            <Info /> Ticker Info
          </NavLink>
        </nav>
      </div>

      <div
        onClick={() => {
          if (username && username !== "Guest") {
            handleLogout();
          } else {
            onLoginClick();
          }
        }}
        className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white"
      >
        <LogIn /> {username && username !== "Guest" ? `Welcome ${username}` : "Guest"}
      </div>
    </div>
  );
}