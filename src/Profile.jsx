import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("No user session found");
        }

        const response = await axios.get(
          `http://31.97.78.230:3000/api/v1/users/me`,
          {
            withCredentials: true, // THIS IS CRITICAL
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        setError(
          err.response?.status === 401
            ? "Unauthorized: Please login again"
            : "Error loading profile"
        );

        // Redirect to login if unauthorized
        if (err.response?.status === 401) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://31.97.78.230:3000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear local storage
      localStorage.removeItem("userId");

      // Redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return (
      <div>
        <h3>Error</h3>
        <p>{error}</p>
        {error.includes("Unauthorized") && (
          <button onClick={handleLogout}>Go to Login</button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>

      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Phone: {userData.phoneNumber}</p>
          <p>Country: {userData.country}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
