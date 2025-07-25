import axios from "axios";
import {createContext ,useState,useEffect } from "react";

export const Usercontext=createContext(null);

export const ContextProvider=({children})=>{
    const [user ,setUser]=useState(null);
    const [loading ,setLoading]=useState(false);
    const [error,setError]=useState("");
    // Get user from the db
    useEffect( ()=>{
        const fetchUser=async ()=>{
            try{
                setLoading(true);
                const token=localStorage.getItem("authToken");
              const response= await axios.get("http://localhost:3000/api/v1/user/my-details",{
              headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true 
            })
            const res=await response.data;
            setUser(res.data);
        }catch(err){
              setError(err.message|| "Something went wrong")
            console.log("Error",err)
        }finally{
      setLoading(false)
     }
        }
        fetchUser();
     },[])

          

const contextValue={user,setUser,loading,setLoading,error,setError}
    return(
  <Usercontext.Provider value={contextValue}>
    {children}
  </Usercontext.Provider>
    )
 }
 //
