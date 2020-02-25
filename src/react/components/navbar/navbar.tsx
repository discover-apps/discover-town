import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSidebar} from "../../store/actions/sidebar.action";

export const Navbar = () => {

    const dispatch = useDispatch();

    const clickSidebar = () => {
        const sidebarOpen = useSelector((state: any) => state.sidebar.open);
        document.body.style.overflow = sidebarOpen ? "hidden" : "visible";
        dispatch(toggleSidebar(!sidebarOpen))
    };

    return <nav className="navbar_container">
        <div className="navbar_inner">
            <button className="icon-button" onClick={clickSidebar}>
                <MenuIcon/>
            </button>
            <span className="title">Log in</span>
            <button className="icon-button">
                <ProfileIcon/>
            </button>
        </div>
    </nav>
};

export default Navbar;