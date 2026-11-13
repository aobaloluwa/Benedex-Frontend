import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on application initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // Register
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    const { token, user: userProfile } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userProfile || res.data));

    const finalUser = userProfile || res.data;
    setUser(finalUser);
    return finalUser;
  };

  // Login
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    const { token, user: userProfile } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userProfile || res.data));

    const finalUser = userProfile || res.data;
    setUser(finalUser);
    return finalUser;
  };

  // Google Authentication Handler Node
  const loginWithGoogle = async (idToken) => {
    try {
      const res = await API.post("/auth/google", { credential: idToken });
      const { token, user: userProfile } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userProfile || res.data));

      const finalUser = userProfile || res.data;
      setUser(finalUser);
      return finalUser;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Trigger Forgot Password Recovery Email
  const forgotPassword = async (email) => {
    try {
      const res = await API.post("/auth/forgot-password", { email });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Reset Password using token from URL
  const resetPassword = async (token, newPassword) => {
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password: newPassword });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Update logged in user profile state & local persistence
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);