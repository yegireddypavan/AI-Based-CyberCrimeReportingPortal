import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState("REGISTER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // 🟢 Register - Request OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.text();
      alert(data);

      if (data.includes("OTP sent")) {
        setStep("VERIFY_OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while requesting OTP!");
    }
  };

  // 🟢 Register - Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp, role }),
      });

      const data = await response.text();
      alert(data);

      if (data.includes("Registration successful")) {
        setIsRegister(false);
        setStep("REGISTER");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error verifying OTP!");
    }
  };

  // 🟢 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (data.includes("Login successful")) {
        alert("Login Successful!");

        // Save to localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        // ✅ Navigate based on role
        if (role === "ADMIN") {
          navigate("/view-complaints"); // or ""
        } else {
          navigate("/complaint");
        }
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <h2>Cybercrime Reporting Portal</h2>

      {/* ✅ Register Form */}
      {isRegister && step === "REGISTER" && (
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {/* ✅ Verify OTP */}
      {isRegister && step === "VERIFY_OTP" && (
        <form onSubmit={handleVerifyOtp} className="login-form">
          <input
            type="text"
            placeholder="Enter OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {/* ✅ Login Form */}
      {!isRegister && (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
      )}

      <p className="toggle-text">
        {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          type="button"
          className="toggle-button"
          onClick={() => {
            setIsRegister(!isRegister);
            setStep("REGISTER");
          }}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
