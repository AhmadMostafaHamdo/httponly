import React, { useState } from "react";
import axios from "axios";

const AuthLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage("");

    try {
      // Use withCredentials: true to handle cookies
      const response = await axios.post(
        "http://31.97.78.230:3000/api/v1/auth/login",
        credentials,
        {
          withCredentials: true, // THIS IS CRITICAL
        }
      );

      // Handle successful login
      setMessage("Login successful! Redirecting...");

      // Store user ID in local storage for immediate access
      localStorage.setItem("userId", response.data.user.id);

      // Redirect to profile after successful login
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="username"
            placeholder="user@example.com"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            minLength="8"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <div className={`feedback ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="auth-links">
        <a href="/forgot-password">Forgot password?</a>
        <a href="/signup">Create new account</a>
      </div>
    </div>
  );
};

export default AuthLogin;
