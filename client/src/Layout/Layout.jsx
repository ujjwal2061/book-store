
import Nava from "../Pages/Nava"
import { Outlet } from "react-router"
export default  function Screen(){
    return(
       <div className="min-h-screen flex flex-col">
        <Nava />
        <main className="flex-grow">
             <Outlet />
        </main>
       
       </div>
    )
}