import { Store, User2Icon, LayoutDashboard, BookAIcon } from "lucide-react";
import { Sidebar, SidebarItems } from "./Sidebar";
import { useState } from "react";
import { AccountPage } from "../Admin_page/AccountPage";
import DashboardPage from "../Admin_page/DashboardPage";  
import UpadateStorePage from "../Admin_page/UpadateStorePage";
import StorePage from "../Admin_page/StorePage";

export const DashboardView=() => {
    const [activePage ,setActivepage]=useState("dashbord")
    const renderpage=()=>{
        switch(activePage){
            case 'dashbord':
            return <DashboardPage />
             case 'store':
            return <StorePage />
             case 'account':
            return <AccountPage />
             case 'upload':
            return <UpadateStorePage />
             default: 
            return <DashboardPage />
        }
    }
  return (
    <div  className="flex bg-gray-50 min-h-screen">
    <Sidebar>
      <SidebarItems icons={<LayoutDashboard size={23} />} 
      text="Dashboard" active={activePage==="dashbord"} 
      onClick={()=>setActivepage('dashbord')}
      />
      <SidebarItems icons={<Store size={23} />} text="Store"
      active={activePage==="store"} 
      onClick={()=>setActivepage('store')}
      />
      <SidebarItems icons={<BookAIcon size={23} />} text="Upload"
      active={activePage==="upload"} 
      onClick={()=>setActivepage('upload')}
     />
      <SidebarItems icons={<User2Icon size={23} />} text="Account"
      active={activePage==="account"} 
      onClick={()=>setActivepage('account')}
      />
    </Sidebar>
    <main className="flex-1 overflow-auto">
     {renderpage()}
    </main>
    </div>
  );
};
 