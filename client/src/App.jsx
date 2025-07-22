import {Routes ,Route} from "react-router"
import Login from "./auth/Login"
import Signup from "./auth/Singup"
import Layout from "./Layout/Layout"
function App() {
  return (
   <Routes>
     <Route path="/" element={<Layout />} />
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
     {/* <Route path="/store" element={<Store />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/book/:id" element={<Book />} />
     <Route path="/restpassword" element={<RestPawword />} />
     <Route path="/adminstore" element={<AdminStore />} /> */}
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
