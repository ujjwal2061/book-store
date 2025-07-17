import { Search,Menu,X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Nava = () => {
const [isMoblieOpen ,setMoblieOpen]=useState(false);

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
        {/*Moblie Section*/}
         <div className="">
           <button onClick={()=>setMoblieOpen(!isMoblieOpen)} className="md:hidden flex cursor-pointer justify-center shadow-2xl  p-2 bg-mycolor/15 rounded-full">
             {isMoblieOpen ? <X /> : <Menu className="rounded-2xl" />}
            </button>
            {isMoblieOpen &&(
                <div className=" md:hidden bg-[#fdf7f7e2]  border-transparent  shadow-2xl w-48 rounded-md mt-1 absolute  right-0 flex flex-col border-2 p-2  gap-2 ">
            <sapn className="btn rounded-md  text-center font-semibold border-mycolor border-2 px-6 py-2 ">
            <Link>Login</Link>
          </sapn>
          <span className="rounded-md  text-center font-semibold text-white border-mycolor px-6 bg-mycolor py-2 ">
            <Link>Singup</Link>
          </span>
            </div>
           ) }
           </div>
        <div className=" hidden md:flex  font-sans font-semibold gap-2  items-center ">
          <button className="btn rounded-md  border-mycolor border-2 px-6 py-2 ">
            <Link>Login</Link>
          </button>
          <button className="rounded-md  text-white border-mycolor px-6 bg-mycolor py-2 ">
            <Link>Singup</Link>
          </button>
        </div>
      </nav>
  </div>
    </div>
    
  );
};
export default Nava;
