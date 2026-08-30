import { Link } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout }) {
    const isLoggedIn = Boolean(user);
    const displayName = typeof user === "object" ? user?.name : user;

    return (
        <header className="main-header">
            <div className="header-brand">
                <h1 className="title">Culture Closet</h1>
                <h2 className="logo">Heritage kids</h2>
            </div>

            <nav className="nav">
                <div className="nav-left">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/browse-dresses">BrowseDresses</Link>
                    <Link to={isLoggedIn ? "/add-dress" : "/login"}>DonateDresses</Link>
                </div>
                <div className="nav-right">
                    <Link to="/recent-dresses" className="recent-item">
                        Recent Dresses
                    </Link>
                    {!isLoggedIn && (
                        <div className="login">
                            <Link to="/login" className="user-login">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* User Session Info */}
            {isLoggedIn && (
                <div className="user-session">
                    <span>Welcome, <strong>{displayName}</strong>!</span>
                    <button type="button" onClick={onLogout}>Logout</button>
                </div>
            )}
        </header>

    );
}
export default Header;