
import Nava from "../Pages/Nava"
import { Outlet } from "react-router"
import {Footer}  from "@/Pages/Footer"
export default  function Screen(){
    return(
       <div className="min-h-screen flex flex-col ">
        <Nava />
        <main className="flex-grow">
             <Outlet />
        </main>
       <Footer />
       </div>
    )
}