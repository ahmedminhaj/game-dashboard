import { useState } from "react";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return(
        <div className="container">
            <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <main>
                <Outlet />
            </main>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    );
}

export default Layout;