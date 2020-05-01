import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import {toggleSidebar} from "../../store/actions/sidebar.action";
import logo from "../../../assets/img/logo.png";

export const Navbar = () => {
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const history = useHistory();

    const clickSidebar = () => {
        document.body.style.overflow = sidebarOpen ? "visible" : "hidden";
        dispatch(toggleSidebar(!sidebarOpen));
    };

    const clickProfile = () => {
        history.push(`${currentUser ? "/profile/" + currentUser.username : "login"}`);
    };

    return <nav className="navbar_container">
        <div className="navbar_inner">
            <button className="icon-button" onClick={clickSidebar}>
                <MenuIcon/>
            </button>
            <span className="title" onClick={() => history.push("/")}><img src={logo} alt="logo"/></span>
            <button className="icon-button" onClick={clickProfile}>
                <ProfileIcon/>
            </button>
        </div>
    </nav>
};

export default Navbar;