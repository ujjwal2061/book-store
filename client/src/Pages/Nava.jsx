import { Search,Menu,X, User2Icon } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Usercontext } from "../Users/context/userContext";

const Nava = () => {
const [isMoblieOpen ,setMoblieOpen]=useState(false);
const {user,loading}=useContext(Usercontext)

    return (
    <div className="bg-[#fdf7f7e2] relative ">
        <div className="w-full px-2 py-1">
      <nav className="   flex  gap-2  items-center justify-between  sm:px-10  px-4">
        <div>
          <h1 className="font-bold font-serif text-mycolor">
            Read<span className="text-gray-800 font-serif font-medium">Link</span>
          </h1>
        </div>
        <div className=" hidden md:w-[30%] w-[40%] sm:flex justify-center ">
          <label className=" flex  items-center w-full ">
            <input
              type="search"
              placeholder="Search books, authors, genres..."
              className="w-full  px-2 py-1.5 border border-gray-300 rounded-l-md  outline-0 placeholder:text-sm"
              />
            <button className="bg-mycolor cursor-pointer  rounded-r-md px-2 py-1.5">
              <Search color="white" />
            </button>
          </label>
        </div>
          {user? <div className="flex md:hidden px-2 py-1  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
                  <User2Icon />    
            </div>:
         <div className="">
           <button onClick={()=>setMoblieOpen(!isMoblieOpen)} className="md:hidden flex cursor-pointer justify-center shadow-2xl  p-2 bg-mycolor/15 rounded-full">
             {isMoblieOpen ? <X /> : <Menu className="rounded-2xl" />}
            </button>
            {isMoblieOpen &&(
              <div className=" md:hidden bg-[#fdf7f7e2]   w-full z-30  border-transparent sm:w-72 shadow-2xl  rounded-md mt-1 absolute  right-0 flex flex-col border-2 p-2  gap-2 ">
            <span className="btn rounded-md  text-center font-semibold border-mycolor border-2 px-6 py-2 ">
            <Link to="/login">Login</Link>
          </span>
          <span className="rounded-md  text-center font-semibold text-white border-mycolor px-6 bg-mycolor py-2 ">
            <Link to="/signup">Singup</Link>
          </span>
            </div>
           ) }
           </div>
          }
        <div className=" hidden md:flex  font-sans font-semibold gap-2  items-center ">
          {user? <div className= " flex px-4 py-1.5  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
                  <Link to="/my-space" ><User2Icon /></Link>
                  <span>{user.data.firstname}</span>
            </div> :<>
           <button className="btn rounded-md  border-mycolor border-2 px-6 py-2 ">
            <Link to="/login">Login</Link>
          </button>
          <button className="rounded-md  text-white border-mycolor px-6 bg-mycolor py-2 ">
            <Link to="/signup">Singup</Link>
          </button>
          </>  
          }
        </div>
      </nav>
  </div>
    </div>
    
  );
};
export default Nava;
