interface SearchBarProps {
    onSearch: (term: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm, setSearchTerm }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            onSearch(searchTerm);
        }
    }

    return (
        <div className="flex mb-6">
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a word..."
                className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <button
            onClick={()=>onSearch(searchTerm)}
                className="p-3 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar