import {Routes ,Route} from "react-router"
import Login from "./auth/Login"
import Signup from "./auth/Singup"
import Home from "./Pages/Home"
import Layout from "./Layout/Layout"
import {  useContext } from "react"
import {Usercontext} from "./Users/context/userContext"
import  {Profile} from "./Users/Proflie"
import BookStore from "./Users/Store/Book_Store"
import Book_by_id from "./Users/store/Book_by_id"

function App() {
 const {loading}=useContext(Usercontext);
 if(loading) return<p>Loading..</p>
  return (
   <Routes>
     <Route path="/" element={<Layout />} >
     <Route index element={<Home />} />
       <Route path="/profile" element={<Profile />} >
       <Route path="store" element={<BookStore />} />
      </Route>
      <Route path="/book/:id"  element={<Book_by_id />} />
     </Route>
     
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
   </Routes>
   
   
  )
}

export default App

// home router
// user router 
// admin router
// store router
// login router 
// sgin router 
// passowrd reset
// bookby/id router
// logout router
// purchasebook router
