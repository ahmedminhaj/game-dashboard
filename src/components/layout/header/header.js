import "./header.css";

const Header = ({ sidebarOpen, openSidebar }) => {
    return(
        <nav className="header">
            <div className="header_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="header__left">
                <p className="header_title" >Bombay Gamers</p>
            </div>
            <div className="header__right">
                <a>
                    <i className="fa fa-user"></i>
                </a>
            </div>
        </nav>
    );
}

export default Header;