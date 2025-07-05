import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginModel({ closeModal, onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Enter") {
        mode === "login" ? handleLogin() : handleSignup();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData, confirmPassword, mode]);

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (!minLength.test(password)) return "Min 8 characters required";
    if (!hasUpper.test(password)) return "At least 1 uppercase letter required";
    if (!hasNumber.test(password)) return "At least 1 number required";
    if (!hasSpecial.test(password)) return "At least 1 special character required";
    return "";
  };

  const showTimedError = (field, message) => {
    const errorMap = {
      username: [setUsernameError, setShowUsernameError],
      password: [setPasswordError, setShowPasswordError],
      confirm: [setConfirmError, setShowConfirmError],
    };
    const [setError, setShowError] = errorMap[field];
    setError(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 2500);
  };

  const handleLogin = () => {
    const username = formData.username.trim();
    const password = formData.password;
    const storedUsers = JSON.parse(localStorage.getItem("userCredentials")) || {};

    if (!username) return showTimedError("username", "Username cannot be empty");
    if (!storedUsers[username]) return showTimedError("username", "User not registered");
    if (!password) return showTimedError("password", "Password is required");
    if (storedUsers[username] !== password) {
      setFormData((prev) => ({ ...prev, password: "" }));
      return showTimedError("password", "Password is incorrect");
    }

    setUsernameError("");
    setPasswordError("");
    onLogin(username);

    window.location.href = "/";
  };

  const handleSignup = () => {
    const username = formData.username.trim();
    const password = formData.password;
    const storedUsers = JSON.parse(localStorage.getItem("userCredentials")) || {};

    if (!username) return showTimedError("username", "Username cannot be empty");
    if (storedUsers[username]) return showTimedError("username", "This account is already registered");

    const validationMsg = validatePassword(password);
    if (validationMsg) return showTimedError("password", validationMsg);
    if (!confirmPassword) return showTimedError("confirm", "Confirm your password");
    if (password !== confirmPassword) return showTimedError("confirm", "Passwords do not match");

    storedUsers[username] = password;
    localStorage.setItem("userCredentials", JSON.stringify(storedUsers));

    setConfirmPassword("");
    setUsernameError("");
    setPasswordError("");
    setFormData({ username, password: "" });
    setMode("login");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-10 rounded-xl shadow-2xl w-96 relative">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <div className="space-y-5">
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Username"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            />
            {usernameError && (
              <div
                className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[280px] text-sm px-4 py-2 rounded shadow-xl transition-opacity duration-500 ${
                  showUsernameError ? "opacity-100" : "opacity-0"
                } bg-gray-800/90 text-red-400 border border-red-500`}
              >
                {usernameError}
              </div>
            )}
          </div>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder={mode === "signup" ? "New Password" : "Password"}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none pr-10"
            />
            <div
              className="absolute right-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {passwordError && (
              <div
                className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[280px] text-sm px-4 py-2 rounded shadow-xl transition-opacity duration-500 ${
                  showPasswordError ? "opacity-100" : "opacity-0"
                } bg-gray-800/90 text-red-400 border border-red-500`}
              >
                {passwordError}
              </div>
            )}
          </div>

          {mode === "signup" && (
            <div className="relative flex items-center mb-3">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none pr-10"
              />
              <div
                className="absolute right-3 cursor-pointer text-gray-400"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {confirmError && (
                <div
                  className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[280px] text-sm px-4 py-2 rounded shadow-xl transition-opacity duration-500 ${
                    showConfirmError ? "opacity-100" : "opacity-0"
                  } bg-gray-800/90 text-red-400 border border-red-500`}
                >
                  {confirmError}
                </div>
              )}
            </div>
          )}
        </div>

        {mode === "login" && (
          <div className="flex justify-end mt-3 px-1.5">
            <button
              onClick={() => {
                setMode("signup");
                setFormData({ username: "", password: "" });
              }}
              className="text-red-500 text-sm hover:text-red-400 hover:underline"
            >
              Sign Up
            </button>
          </div>
        )}

        <div className={`mt-${mode === "signup" ? "6" : "5"} flex justify-between`}>
          <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
          <button
            onClick={() => (mode === "signup" ? setMode("login") : closeModal())}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold"
          >
            {mode === "login" ? "Cancel" : "Back"}
          </button>
        </div>
      </div>
    </div>
  );
}