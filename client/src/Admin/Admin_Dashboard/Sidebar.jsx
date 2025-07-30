import { ChevronFirst, ChevronLast, LogOut, User2, Store, LayoutDashboard, Settings, ShoppingCart, Users, BarChart3, Package, Bell, Search } from "lucide-react"
import { createContext, useContext, useState } from "react"

const SideContext = createContext();

export const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className={`h-screen ${expanded ? "w-52" : "w-20"} transition-all duration-300`}>
      <nav className="h-full flex flex-col bg-neutral-100 border-r border-neutral-200 shadow-2xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>
            <h1 className="text-xl font-bold text-mycolor">Dashboard</h1>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-md shadow-2xl bg-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SideContext.Provider value={expanded}>
          <ul className="flex-1 gap-2 px-3">
            {children}
          </ul>
        </SideContext.Provider>
        <div className="border-t border-neutral-300 bg-gray-100 p-3 flex items-center">
          {expanded && (
            <div className="flex justify-between items-center gap-2 w-full bg-gray-50 p-2 rounded-md shadow">
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">john@gmail.com</span>
              </div>
              <button className="p-1 rounded-md hover:bg-red-500/20 cursor-pointer">
                <LogOut />
              </button>
            </div>
          )}
          {!expanded && (
            <button className="p-1 rounded-md hover:bg-red-500/20 cursor-pointer mx-auto">
              <LogOut />
            </button>
          )}
        </div>
      </nav>
    </aside>
  )
}

export const SidebarItems = ({ icons, text, alert, active, onClick }) => {
  const expanded = useContext(SideContext);

  return (
    <li
      onClick={onClick}
      className={`m-2 flex ${expanded ? 'items-center' : 'justify-center items-center'} relative py-2 px-3 font-medium rounded-md cursor-pointer transition-colors
        ${active ? "bg-mycolor text-white" : "hover:bg-mycolor/10 text-gray-400"}`}
    >
      {icons}
      <span className={`ml-3 transition-all duration-300 ${expanded ? "inline-block" : "hidden"}`}>
        {text}
      </span>
      {alert && <div className="absolute right-1 w-2 h-2 bg-indigo-400 rounded-full" />}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-800 text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
          {text}
        </div>
      )}
    </li>
  );
};