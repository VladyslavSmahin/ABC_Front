import './style.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const InputSearch = ({className = '', onResultClick }) => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${API_URL}/articles`);
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Ошибка загрузки статей:", err);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (searchTerm.length < 3) {
            setSearchResults([]);
            return;
        }

        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);

    }, [searchTerm, posts]);
    return (
        <div className='headerInputWrapper'>

                            <input
                                type="text"
                                placeholder="Search by name"
                                className={`headerInputInput ${className}`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                            />
                            {searchTerm.length > 0 && isFocused && (
                                <div className="searchResults">
                                    {searchTerm.length < 3 ? (
                                        <div className="searchResultItem">Please enter at least 3 characters</div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="searchResultItem">No matches found</div>
                                    ) : (
                                        searchResults.slice(0, 10).map((post) => (
                                            <Link
                                                key={post._id}
                                                to={`/${post.category}/post/${post._id}`}
                                                className="searchResultItem"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setIsFocused(false);
                                                    if (onResultClick) onResultClick();
                                                }}
                                                dangerouslySetInnerHTML={{ __html: post.title || 'пусто' }}
                                            />
                                        ))
                                    )}
                                </div>
                            )}
        </div>
    );
};

export default InputSearch;