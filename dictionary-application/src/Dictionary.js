import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";


export default function Dictionary ()
    {
      const [keyword, setKeyword] = useState("");
      const [results, setResults] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

        function fetchFromFallback(searchTerm) {
            const fallbackUrl = `https://api.datamuse.com/words?sp=${encodeURIComponent(searchTerm)}&md=dp&max=1`;

            return axios.get(fallbackUrl, { timeout: 8000 }).then(function (response) {
                const match = response.data && response.data[0];
                const definitions = match && match.defs;

                if (!match || !definitions || definitions.length === 0) {
                    throw new Error("No definition found");
                }

                return {
                    word: match.word,
                    phonetics: match.pron ? [{ text: match.pron }] : [],
                    meanings: [{
                        partOfSpeech: definitions[0].split("\t")[0] || "definition",
                        definitions: definitions.map(function (definition) {
                            return { definition: definition.split("\t").slice(1).join("\t") || definition };
                        }),
                    }],
                };
            });
        }

        function search(event){
            event.preventDefault();
            const searchTerm = keyword.trim();

            if (!searchTerm) {
                setError("Please enter a word to search.");
                setResults(null);
                return;
            }

            setLoading(true);
            setError("");
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchTerm)}`;

            axios.get(apiUrl, { timeout: 8000 })
                .then(function (response) {
                    const entry = response.data && response.data[0];
                    if (!entry) {
                        throw new Error("No definition found");
                    }
                    setResults(entry);
                })
                .catch(function () {
                    return fetchFromFallback(searchTerm).then(function (entry) {
                        setResults(entry);
                    });
                })
                .catch(function () {
                    setResults(null);
                    setError(`We couldn't find a definition for "${searchTerm}". Try another word.`);
                })
                .finally(function () {
                    setLoading(false);
                });
        }


    function handleKeyWordChange(event)
    {
        setKeyword(event.target.value);
    }
    return ( <div className="Dictionary">
             <form className="SearchForm" onSubmit={search}>
             <label htmlFor="word-search">Search for a word</label>
             <div className="SearchControls">
             <input id="word-search" type="search" value={keyword} onChange={handleKeyWordChange} placeholder="Try a word, like luminous" />
             <button type="submit" disabled={loading}>{loading ? "Searching..." : "Search"}</button>
             </div>
    </form>
    {error && <p className="SearchMessage error" role="alert">{error}</p>}
    {loading && <p className="SearchMessage" role="status">Looking up your word...</p>}
    <Results results={results} />
    </div>
    );

    }
