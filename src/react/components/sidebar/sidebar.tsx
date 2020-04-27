import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {toggleSidebar} from "../../store/actions/sidebar.action";
import {deauthorizeClient} from "../../util/auth";
import {verifyAdmin} from "../../api/auth.api";

export const Sidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        verifyAdmin().then((isAdmin) => {
            setAdmin(isAdmin);
        });
    }, []);

    const clickSidebar = () => {
        document.body.style.overflow = sidebarOpen ? "visible" : "hidden";
        dispatch(toggleSidebar(!sidebarOpen));
    };

    const navigateTo = (url: string) => {
        history.push(url);
        clickSidebar();
    };

    const logoutUser = async () => {
        await deauthorizeClient();
        history.push("/");
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
                <div className="link" onClick={() => navigateTo("/browse")}>
                    Browse
                </div>
                <div className="link"
                     onClick={() => navigateTo(`${currentUser ? "/profile/" + currentUser.username : "login"}`)}>
                    Profile
                </div>
                <div className="link" onClick={() => navigateTo("/events/")}>
                    Events
                </div>
                <div className="link" onClick={() => navigateTo("/discover")}>
                    Discover
                </div>
                {
                    admin ?
                        <div className="link" onClick={() => navigateTo("/admin")}>
                            Administration
                        </div>
                        :
                        ""
                }
                {
                    currentUser ?
                        <div className="link" onClick={() => logoutUser()}>
                            Sign out
                        </div>
                        :
                        <div className="link" onClick={() => navigateTo("/login")}>
                            Sign in
                        </div>
                }
            </div>
        </section>
    )
};

export default Sidebar;