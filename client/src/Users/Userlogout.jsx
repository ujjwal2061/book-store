import { useContext } from "react";
import { useNavigate } from "react-router";
import { Usercontext } from "./context/userContext";
import { LogOut, User } from "lucide-react";

export const UserLogout = ({ showName = true, variant = "default" }) => {
  const { user, logout } = useContext(Usercontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  const userInfo = user?.data;

  if (variant === "sidebar") {
    return (
      <div className="flex justify-between items-center gap-2 w-full bg-gray-50 p-2 rounded-md shadow">
        <div className="leading-4">
          {showName && (
            <>
              <h4 className="font-semibold">
                {userInfo?.firstname} {userInfo?.lastname}
              </h4>
              <span className="text-xs text-gray-600">{userInfo?.email}</span>
            </>
          )}
        </div>
        <button 
          onClick={handleLogout}
          className="p-1 rounded-md hover:bg-red-500/20 cursor-pointer transition-colors"
          title="Logout"
        >
          <LogOut className="text-red-600" size={18} />
        </button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleLogout}
        className="p-1 rounded-md hover:bg-red-500/20 cursor-pointer mx-auto transition-colors"
        title="Logout"
      >
        <LogOut className="text-red-600" size={18} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border">
      {showName && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={16} />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              {userInfo?.firstname} {userInfo?.lastname}
            </p>
            <p className="text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-red-600 transition-colors text-sm"
        title="Logout"
      >
        <LogOut size={14} />
        Logout
      </button>
    </div>
  );
};

export default UserLogout;
