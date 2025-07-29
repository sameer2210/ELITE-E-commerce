const Button = ({
    onClick,
    className = "",
    type = "button",
    disabled = false,
    loading = false,
    icon: Icon,
    loadingText = "Loading...",
    iconColor = "text-gray-900",
    children,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            aria-label={loading ? loadingText : children}
            className={`group relative flex items-center gap-2 rounded-tr-2xl bg-gray-50 text-gray-900 font-medium py-3 px-4 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {Icon && (
                <Icon
                    className={`w-5 h-5 ${iconColor} group-hover:scale-110 transition-transform duration-300`}
                />
            )}
            {loading ? loadingText : children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
            <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
        </button>
    );
};

export default Button;



//-------------------------------------------------------Example for pages.jsx code-----------


// const [isLoading, setIsLoading] = useState(false);

// <Button
//     onClick={() => resetForm(true)}
//     disabled={isLoading}
//     loadingText="Logging out..."
//     icon={Save}
//     iconColor="text-red-400"
// > Discard Changes
// </Button>