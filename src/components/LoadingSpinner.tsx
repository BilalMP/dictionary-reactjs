const LoadingSpinner: React.FC = () => {
    return (
        <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default LoadingSpinner