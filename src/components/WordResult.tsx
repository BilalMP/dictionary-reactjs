import React from 'react';
import { WordEntry, Meaning, Definition } from './Dictionary';

interface WordResultProps {
    wordData: WordEntry;
}

const WordResult: React.FC<WordResultProps> = ({ wordData }) => {
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">{wordData.word}</h2>
            {wordData.phonetics.map((phonetic, index) => (
                phonetic.text && (
                    <p key={index} className="text-gray-600 italic">
                        {phonetic.text}
                        {phonetic.audio && (
                            <audio controls className="ml-2 inline-block">
                                <source src={phonetic.audio} type="audio/mpeg" />
                                Your browser does not support audio.
                            </audio>
                        )}
                    </p>
                )
            ))}
            {wordData.meanings.map((meaning: Meaning, index: number) => (
                <div key={index} className="mt-4">
                    <h3 className="text-xl font-medium text-gray-700 italic">{meaning.partOfSpeech}</h3>
                    {Array.isArray(meaning.definitions) ? (
                        <ul className="list-disc pl-5">
                            {meaning.definitions.map((def: Definition, defIndex: number) => (
                                <li key={defIndex} className="mt-2 text-gray-600">
                                    <p>{def.definition}</p>
                                    {def.example && <p className="text-gray-500 italic">Example: {def.example}</p>}
                                    {def.synonyms && def.synonyms.length > 0 && (
                                        <p className="text-gray-500">
                                            Synonyms: {def.synonyms.join(', ')}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No definitions available.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WordResult;