import "./sidebar.css";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return(
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={logo} alt="logo" />
                    <h1 style={{paddingRight: "15px"}}>Yolo</h1>
                </div>
                <i
                    className="fa fa-times"
                    id="sidebarIcon"
                    onClick={() => closeSidebar()} 
                ></i>
            </div>
            <div className="sidebar__menu">
                <div className="sidebar__link">
                    <i className="fa fa-home"></i>
                    <NavLink to="/">Dashboard</NavLink>
                </div>
                <div  className="sidebar__link">
                    <i className="fa fa-users"></i>
                    <NavLink to="/users">Users</NavLink>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-gamepad "></i>
                    <NavLink to="/games">Games</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;