import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext(null);

const AdminSetupContext = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading ,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [books,setBooks]=useState([{}]);
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
  // get the books
    useEffect(()=>{
    const adminBooks=async()=>{
      try{
        setLoading(true);
        const response=await axios.get( `http://localhost:3000/api/v1/admin/dashbord`,{
           headers:{
            Authorization:`Bearer ${token}`
         },
         withCredentials:true
        })
        const res=response.data?.data;
        setBooks(res);
      }catch(err){
        setError( "Something went Wrong  Please try again !")
      }finally{
        setLoading(false);
      }
    }
    adminBooks();
  },[])
  const Adminvalue = {
    admin,
    token,
    logout,
    loading,
    setLoading,
    setBooks,
    books,
    error,
    setError
  };
  return <AdminContext.Provider value={Adminvalue}>{children}</AdminContext.Provider>;
};
export default AdminSetupContext;
