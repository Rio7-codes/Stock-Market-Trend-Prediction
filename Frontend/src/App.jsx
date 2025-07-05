import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PredictPage from "./pages/Predict";
import SearchPage from "./pages/Search";
import AboutPage from "./pages/About";
import SidebarLayout from "./components/SidebarLayout";
import LoginModel from "./components/LoginModel";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("Guest");

  return (
    <>
      <SidebarLayout onLoginClick={() => setShowLogin(true)} username={username}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </SidebarLayout>

      {showLogin && (
        <LoginModel
          onClose={() => setShowLogin(false)}
          onLogin={(uname) => setUsername(uname)}
        />
      )}
    </>
  );
}