import { useContext, useState } from "react";
import { AdminContext } from "../Admincontext/Admin-context";
import { 
  User2Icon, 
  Mail, 
  Shield, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Settings,
  Key,
  Activity
} from "lucide-react";

export const AccountPage = () => {
  const { admin, logout } = useContext(AdminContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

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

  const adminInfo = admin?.data;

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({
        firstName: adminInfo?.firstName || adminInfo?.firstname || "",
        lastName: adminInfo?.lastName || adminInfo?.lastname || "",
        email: adminInfo?.email || ""
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // TODO: Implement admin profile update API call
    console.log("Saving admin profile:", editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      firstName: "",
      lastName: "",
      email: ""
    });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User2Icon },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "activity", label: "Activity", icon: Activity }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Admin Profile</h2>
          <button
            onClick={handleEditToggle}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 size={16} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User2Icon size={32} className="text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
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
            )}

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-semibold text-gray-900">$0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive notifications about new users and orders</p>
          </div>
          <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-gray-900">System Alerts</p>
            <p className="text-sm text-gray-500">Get alerts about system maintenance and updates</p>
          </div>
          <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
      <div className="space-y-4">
        <button className="flex items-center gap-3 w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <Key size={20} className="text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">Change Password</p>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Activity size={16} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Logged in</p>
            <p className="text-xs text-gray-500">Today at 9:00 AM</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Account</h1>
          <p className="text-gray-600 mt-1">Manage your admin profile and settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
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

        {/* Tab Content */}
        <div>
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "settings" && renderSettingsTab()}
          {activeTab === "security" && renderSecurityTab()}
          {activeTab === "activity" && renderActivityTab()}
        </div>
      </div>
    </div>
  );
};
