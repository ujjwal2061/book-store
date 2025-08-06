import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const Usercontext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [IsOpen, setOpen] = useState(true);

  // User logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setError("");
  };
  // Get user from the db
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/v1/user/my-details", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const res = await response.data;

        setUser(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.log("Error", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const contextValue = { user, setUser, loading, setLoading, error, setError, IsOpen, setOpen, logout };
  return <Usercontext.Provider value={contextValue}>{children}</Usercontext.Provider>;
};
//
