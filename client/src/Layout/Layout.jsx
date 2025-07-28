import Home from "../Pages/Home"
import Content from "../Pages/Content"
import Footer from "../Pages/Footer"
import Nava from "../Pages/Nava"
import { Outlet } from "react-router"
export default  function Screen(){
    return(
       <div className="min-h-screen flex flex-col">
        <Nava />
        <main className="flex-grow">
             <Outlet />
        </main>
        <Footer />
       </div>
    )
}