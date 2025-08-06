import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext(null);

const AdminSetupContext = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const token = localStorage.getItem("adminToken");

  // Admin logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };
  
  useEffect(() => {
      const Getadmin = async () => {
      if (!token) {
        setAdmin(null);
        return;
      }
      try {
        const adminInfo = await axios.get("http://localhost:3000/api/v1/admin/admin-details", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const res = await adminInfo.data;
        setAdmin(res.data);
      } catch (err) {
        setAdmin(null);
        throw new Error || "Something went Wrong";
       
      } 
    };
    Getadmin();
  }, []);
  const Adminvalue = {
    admin,
    token,
    logout
  };
  return <AdminContext.Provider value={Adminvalue}>{children}</AdminContext.Provider>;
};
export default AdminSetupContext;
