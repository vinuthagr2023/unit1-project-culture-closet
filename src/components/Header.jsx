import { Link } from "react-router-dom";

function Header({ isLoggedIn, user, onLogout}) {  
    
    return (
        <header className="main-header">
            <div className="header-brand">
                <h1 className="title">Culture Closet</h1>
                <div className="logo">Heritage kids</div>
            </div>

            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/browse-dresses" >BrowseDresses</Link>
               
             </nav>

            {/* User Session Info */}
            {isLoggedIn && (
                <div className="user-session">
                    <span>Welcome, <strong>{user}</strong>!</span>
                    <button type="button" onClick={onLogout}>Logout</button>
                </div>
            )}
        </header>

    );
}
export default Header;