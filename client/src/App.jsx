import {Routes ,Route} from "react-router"

import Layout from "./Layout/Layout"
function App() {
  return (
   <Routes>
     <Route path="/" element={<Layout />} />
     {/* <Route path="/store" element={<Store />} />
     <Route path="/login" element={<Login />} />
     <Route path="/singup" element={<Singup />} />
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
