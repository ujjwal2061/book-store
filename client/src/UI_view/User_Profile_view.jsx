import { CircleArrowRight, User2Icon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function User_Profile_view({ firstname, lastname, email }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className=" relative w-full flex h-screen">
      <div
        className={`flex flex-col bg-mycolor/80  transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        } overflow-hidden h-full shadow-2xl `}
      >
        <div className="flex-grow p-2 space-y-4 ">
          <div className="flex justify-between items-center px-2">
            <h1 className="font-bold text-lg text-white">Dashboard</h1>
            <CircleArrowRight
              size={30}
              onClick={() => setOpen(false)}
              className="cursor-pointer rotate-180 bg-mycolor text-white rounded-md p-1.5"
            />
          </div>
          <div className="mt-2">
            <div className="rounded-md px-2 py-2 cursor-pointer bg-mycolor/30 border-mycolor shadow-3xl hover:bg-mycolor transition-colors ease-in-out duration-300">
              <Link to="/profile" className="font-semibold text-gray-200">
                Account
              </Link>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="shadow-2xl bg-neutral-200 rounded-md px-2 py-1 flex gap-1 items-center">
            <User2Icon />
            <p className="font-semibold text-gray-600 ">{firstname}{' '}{lastname}</p>
          </div>
        </div>
      </div>
      <div className="flex-1  px-3 py-2">
        {!isOpen && (
          <CircleArrowRight
            size={30}
            onClick={() => setOpen(true)}
            className="cursor-pointer bg-mycolor text-white shadow-2xl rounded-md p-1.5"
          />
        )}
        <div className="">
          <h2 className=" text-base md:text-2xl font-semibold font-sans   text-gray-700">Welcome,{firstname} 👋</h2>
        </div>
      </div>
    </div>
  );
}
