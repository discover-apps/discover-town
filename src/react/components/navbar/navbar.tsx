import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSidebar} from "../../store/actions/sidebar.action";
import {useHistory} from 'react-router-dom';

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
        history.push(`/profile${currentUser ? '/' + currentUser.username : ''}`);
    };

    return <nav className="navbar_container">
        <div className="navbar_inner">
            <button className="icon-button" onClick={clickSidebar}>
                <MenuIcon/>
            </button>
            <span className="title">Discover Town</span>
            <button className="icon-button" onClick={clickProfile}>
                <ProfileIcon/>
            </button>
        </div>
    </nav>
};

export default Navbar;