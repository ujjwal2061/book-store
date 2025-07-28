import { useContext } from "react"
import {  Link } from "react-router"
import { Usercontext } from "./context/userContext"
import { User2Icon } from "lucide-react"

export const Profile=()=>{
  const {user,loading} =useContext(Usercontext)
  const userInfo=user?.data;

 if (loading || !user) return <div>Loading...</div>
  return(
    <div className="flex flex-col gap-2 p-2  justify-center">
      <div className="flex  w-full   justify-center">
       <h1 className="text-2xl font-medium">My Account</h1>
      </div>
      <div className="  flex gap-2  p-3">
        <div className="flex gap-4  bg-slate-100  rounded-md justify-center sm:justify-start  w-full  p-2 ">
          <Link to="/"  className="text-xl font-medium text-gray-500">My Profile</Link>
          <Link to="/ " className="text-xl font-medium text-gray-500">My List</Link>
        </div>
      </div>
      <div className="flex gap-2 bg-slate-100 rounded-md p-2 ">
        <div className=" flex-col sm:flex sm:flex-row gap-3  items-start  sm:items-center">
          <div className="rounded-full w-12 bg-neutral-300  py-2  px-2">
          <User2Icon size={32} />
          </div>
          <div  className="flex  items-center">
            <h1 className="font-thin  text-gray-500">Name:</h1>
          <span>{userInfo.firstname}</span>
          <span>{userInfo.lastname}</span>
          </div>
          <div className="flex items-start  sm:items-center flex-row">
            <h1 className="text-gray-400 font-thin">Email:</h1>
            <p>{userInfo.email}</p>
          </div>
        </div>
      </div>
        <div className="flex  py-2 px-5 ">
         <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
    </div>
  )
}