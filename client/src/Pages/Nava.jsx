import { Search,Menu,X, User2Icon ,ChevronDown, ChevronUp} from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Usercontext } from "../Users/context/userContext";
import { useEffect } from "react";

const Nava = () => {
const [isMoblieOpen ,setMoblieOpen]=useState(false);
const {user}=useContext(Usercontext)
const [IsDrop,setIsDrop]=useState(false);
const [IsScroll,setScroll]=useState(0);


useEffect(()=>{
  const handleScroll=()=>{
    const scroll=window.scrollY;
    setScroll(scroll);
  }
    addEventListener("scroll",handleScroll);
  return ()=>removeEventListener("scroll",handleScroll)

},[])

const secondaryLinks=[
  {label:"Profile",
    link:"/profile"
  },
  
]

    return (
    <div className={`sticky top-0 w-full  z-20  ${IsScroll >=10 ? "bg-[#f8f8f8e2] backdrop-blur-md" :" bg-transparent" }`}>
        <div className="w-full px-2 py-1">
      <nav className="   flex  gap-2  items-center justify-between  sm:px-10  px-4">
        <div>
          <Link to="/" className="font-bold font-serif text-mycolor cursor-pointer">
            Read<span className="text-gray-800 font-serif font-medium">Link</span>
          </Link>
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
          {user? <div className="flex relative  md:hidden px-2 py-1  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
                  <User2Icon /> 
                    <button onClick={()=>setIsDrop(!IsDrop)} className="cursor-pointer">
                      {IsDrop ? <ChevronUp />:<ChevronDown />}
                    </button>
                    {IsDrop && (
                      <div className="flex flex-col absolute top-9 z-20   w-44  -right-5 sm:-right-12 bg-slate-100 px-3 shadow-md border-transparent   py-2 rounded-md gap-2">
                        {secondaryLinks.map((item,idx)=>(
                          <Link to={item.link} key={idx} className="px-2 bg-slate-200  border-neutral-200 rounded-md py-1 font-semibold text-center text-base shadow">{item.label}</Link>
                        ))}
                      </div>
                    )}
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
        <div className=" hidden relative  md:flex  font-sans font-semibold gap-2  items-center ">
          {user? <div className= " flex px-4 py-1.5  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
                  <div className="flex items-center gap-1 ">
                    <User2Icon />
                  <span>{user.data.firstname}</span>
                    </div>
                  <button onClick={()=>setIsDrop(!IsDrop)} className="cursor-pointer">
                      {IsDrop ? <ChevronUp />:<ChevronDown />}
                    </button>
                       {IsDrop && (
                      <div className="flex flex-col absolute top-11  z-20  w-44 -right-10 bg-slate-100 px-3 shadow-md border-transparent   py-2 rounded-md gap-2">
                        {secondaryLinks.map((item,idx)=>(
                          <Link to={item.link} key={idx} className="px-2 bg-slate-200  border-neutral-200 rounded-md py-1 font-semibold text-center text-base shadow">{item.label}</Link>
                        ))}
                      </div>
                    )}
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
