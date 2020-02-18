import React from 'React';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/AccountCircle';

export const Navbar = () => {
    return <nav className="navbar_container">
        <div className="navbar_inner">
            <button className="icon-button">
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