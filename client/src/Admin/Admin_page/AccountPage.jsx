import { useContext, useState } from "react";
import { AdminContext } from "../Admincontext/Admin-context";
import { 
  User2Icon, 
  Mail, 
  Shield, 
  Calendar,  
  Activity
} from "lucide-react";

export const AccountPage = () => {
  const {admin,books} = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState("profile");
  
  const adminInfo = admin?.data;

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin profile...</p>
        </div>
      </div>
    );
  }


  const tabs = [
    { id: "profile", label: "Profile", icon: User2Icon },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm  p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Admin Profile</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-mycolor to-mycolor/30 rounded-full flex items-center justify-center shadow-lg">
              <User2Icon size={32} className="text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User2Icon size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {adminInfo?.firstName || adminInfo?.firstname} {adminInfo?.lastName || adminInfo?.lastname}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{adminInfo?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-900">Administrator</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {adminInfo?.createdAt ? new Date(adminInfo.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <p className="text-xl font-semibold text-gray-900">{books?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Account</h1>
          <p className="text-gray-600 mt-1">Manage your admin profile and settings</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm  mb-6">
          <div className="">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2   cursor-pointer  py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-mycolor text-mycolor"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
        <div>
          {activeTab === "profile" && renderProfileTab()}

        </div>
      </div>
    </div>
  );
};
