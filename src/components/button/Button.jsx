import "./Button.css";

function Button({ children, onClick, type = "button", className = "", disabled = false }) {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`reusable-btn ${className}`}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    );
}

export default Button;