import { Menu, X, User2Icon, ChevronDown, ChevronUp } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Usercontext } from "../Users/context/userContext";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
const Nava = () => {
  const [isMoblieOpen, setMoblieOpen] = useState(false);
  const { user } = useContext(Usercontext);
  const [IsScroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScroll(scroll);
    };
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  const secondaryLinks = [{ label: "Profile", link: "/profile" }];

  return (
    <div
      className={`sticky top-0 w-full justify-center flex  z-20  ${
        IsScroll >= 10 ? "bg-[#f8f8f8e2] backdrop-blur-md" : " bg-transparent"
      }`}>
      <div className="w-full max-w-7xl px-2 py-1">
        <nav className=" flex  gap-2  items-center justify-between  sm:px-10  px-4 py-1">
          <div>
            <Link to="/" className="font-semibold font-serif cursor-pointer">
              Perlego
            </Link>
          </div>

          {user ? (
            <div className="flex relative  md:hidden px-2 py-1  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
              <Link to="/profile">
                <User2Icon />
              </Link>
            </div>
          ) : (
            <div className="">
              <button
                onClick={() => setMoblieOpen(!isMoblieOpen)}
                className="md:hidden   flex cursor-pointer justify-center shadow-2xl  p-2 rounded-full">
                {isMoblieOpen ? <X /> : <Menu className="rounded-2xl" />}
              </button>
              {isMoblieOpen && (
                <div className=" md:hidden   w-full z-30  border-transparent sm:w-72 shadow-2xl  rounded-md mt-1 absolute  right-0 flex flex-col border-2 p-2  gap-2 ">
                  <Link to="/login">
                    <Button className="w-full cursor-pointer shadow" variant="secondary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full cursor-pointer">Signup</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className=" hidden relative  md:flex  font-sans font-semibold gap-2  items-center ">
            {user ? (
              <div className=" flex px-4 py-1.5  rounded-xl border-2  border-neutral-200 gap-2 cursor-pointer">
                <div className="flex items-center gap-1 ">
                  <User2Icon />
                  <Link to="/profile">
                    <span>{user.data.firstname}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button className="w-full cursor-pointer shadow" variant="secondary">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full cursor-pointer">Signup</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Nava;
