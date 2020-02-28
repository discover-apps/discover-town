import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../../store/actions/sidebar.action";
import CloseIcon from '@material-ui/icons/Close';

export const Sidebar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);

    const clickSidebar = () => {
        document.body.style.overflow = sidebarOpen ? "visible" : "hidden";
        dispatch(toggleSidebar(!sidebarOpen));
    };

    const navigateTo = (url: string) => {
        history.push(url);
        clickSidebar();
    };

    return (
        <section id="sidebar">
            <nav className="sidebar_nav">
                <div className="sidebar_nav_inner">
                    <button className="icon-button" onClick={clickSidebar}>
                        <CloseIcon/>
                    </button>
                    <span className="title">Discover Town</span>
                </div>
            </nav>
            <div className="links">
                <div className="link" onClick={() => navigateTo('/')}>
                    Home
                </div>
                <div className="link" onClick={() => navigateTo('/browse')}>
                    Browse
                </div>
                <div className="link" onClick={() => navigateTo('/profile')}>
                    My Profile
                </div>
                <div className="link" onClick={() => navigateTo('/categories')}>
                    Categories
                </div>
                <div className="link" onClick={() => navigateTo('/feed')}>
                    Activity feed
                </div>
                <div className="link" onClick={() => navigateTo('/notifications')}>
                    Notifications
                </div>
                <div className="link" onClick={() => navigateTo('/myevents')}>
                    My events
                </div>
            </div>
        </section>
    )
};

export default Sidebar;