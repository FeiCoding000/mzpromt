type ButtonProps = {
        children: React.ReactNode;
        icon?: React.ReactNode;
        fullWidth?: boolean;
    }
export default function Button({ children, icon, fullWidth }: ButtonProps) {
    return (
        <button className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${fullWidth ? 'w-full' : ''}`}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    )
}
