import { useState } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import WordResult from './WordResult'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'

export interface Definition {
    definition: string;
    example?: string;
    synonyms?: string[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

export interface WordEntry {
    word: string;
    phonetics: { text?: string; audio?: string }[];
    meanings: Meaning[];
}

const Dictionary: React.FC = () => {

    const [searchData, setSearchData] = useState<string>("");
    const [wordData, setWordData] = useState<WordEntry | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (term: string): Promise<void> => {
        if (!term.trim()) {
            setError("Please enter a search term");
            setWordData(null);
            return;
        }
        setLoading(true);
        setError("");
        setWordData(null);

        try {
            const response = await axios.get<WordEntry[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
            setWordData(response.data[0]);
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100 py-8'>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <h1 className='text-3xl font-bold mb-6 text-center'>Dictionary</h1>
                <SearchBar
                    searchTerm={searchData}
                    setSearchTerm={setSearchData}
                    onSearch={handleSearch}
                />
                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {wordData && <WordResult wordData={wordData} />}
            </div>
        </div>
    )
}

export default Dictionary