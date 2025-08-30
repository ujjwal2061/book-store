import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Usercontext } from "./context/userContext"
import { User2Icon, LogOut } from "lucide-react"

import BookStore from "./store/Book_Store"

export const Profile = () => {
  const { user, loading, logout } = useContext(Usercontext)
  const userInfo = user?.data;
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading || !user) return <div>Loading...</div>

  return (
    <div className=" max-w-7xl w-full mx-auto flex flex-col gap-4 p-4 justify-center">
      <div className="flex text-start">
        <h1 className="text-2xl font-semibold">My Account</h1>
      </div>

      <div className="flex justify-between items-center dark:bg-neutral-900  dark:text-white bg-slate-100 rounded-md p-3">
        <div className="flex gap-4">
          <Link to="/profile" className="text-xl font-medium   hover:text-slate-50/60 transition-colors">My Profile</Link>
          <Link to="/profile/store" className="text-xl font-medium hover:text-slate-50/60 transition-colors">Add Books</Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {location.pathname === "/profile/store" ? (
        <div className="py-4 px-5">
         <BookStore />
        </div>
      ) : (
        <div className="flex gap-4  dark:bg-neutral-900  bg-slate-100 rounded-md p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="rounded-full w-12 h-12 bg-neutral-300 flex items-center justify-center">
              <User2Icon size={28} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold">Name:</h1>
                <span>{userInfo.firstname} {userInfo.lastname}</span>
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold ">Email:</h1>
                <span className="text-base text-gray-200">{userInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
