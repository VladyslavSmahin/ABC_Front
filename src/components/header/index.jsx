import './style.scss'
import {Link} from "react-router-dom";
import Divider from "../divider/index.jsx";
import {useEffect, useState} from "react";

const Header = ({className = ''}) => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);

        const header = document.querySelector('.header');
        const burgerMenuContent = document.querySelector('.burgerMenuContent');
        const headerContainer = document.querySelector('.headerContainer');

        if (header) header.classList.toggle('headerBurgerMenuOpen', !isOpen);
        if (burgerMenuContent) burgerMenuContent.classList.toggle('burgerMenuContentOpen', !isOpen);
        if (headerContainer) headerContainer.classList.toggle('headerContainerOpen', !isOpen);

       // if (onClick) onClick(e);

    };

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

        console.log("searchTerm:", searchTerm);
        console.log("searchResults:", filtered);
    }, [searchTerm, posts]);



    return (
        <div className='headerWrapper'>
            <div className='header container'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/' className='linkTo linkToHome'>
                                <picture>
                                    <source media="(max-width: 1079px)" srcSet="/images/ABC_logo2.png"/>
                                    <img src="/images/miniLogo.svg" alt="miniLogo"/>
                                </picture>
                            </Link>
                        </li>
                        <li className='title'>
                            <h2>Alps-Balkans-Carpathians</h2>
                            <h3>Political Studies</h3>
                        </li>
                        <li><Link to='/analytics' className='linkTo linkToAnalytics'>Analytics</Link></li>
                        <li><Link to='/reports' className='linkTo linkToReports'>Reports</Link></li>
                        <li><Link to='/forecasts' className='linkTo linkToForecasts'>Forecasts</Link></li>
                        <li><Link to='/databases' className='linkTo linkToDatabases'>Databases</Link></li>
                        <li><Link to='/digests' className='linkTo linkToDigests'>Digests</Link></li>
                        <li><Link to='/links' className='linkTo linkToLinks'>Links</Link></li>
                        <li className="searchLi">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="headerInput"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
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
                                                onClick={() => setSearchTerm('')}
                                                dangerouslySetInnerHTML={{ __html: post.title || 'пусто' }}
                                            />
                                        ))
                                    )}
                                </div>
                            )}
                        </li>
                        <button type='submit' className='buttonAccount'><img src='/images/accountIcon.svg'
                                                                             alt='accountIcon'/></button>
                        <li><a href='#getInTouch' className='linkTo linkToGetInTouch'>Contact us</a></li>
                        <div className='verticalLine'></div>
                        <button
                            className={`burgerMenuBtn ${isOpen ? "burgerMenuBtnOpen" : ""} ${className}`}
                            onClick={handleClick}
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </ul>
                </nav>
            </div>
            <div className={isOpen ? 'burgerMenu burgerMenuOpen' : 'burgerMenu'}>
                <ul>
                    <li onClick={() => setIsOpen(false)}><h3>Menu</h3></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/analytics' className='linkTo linkToAnalytics'>Analytics</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/reports' className='linkTo linkToReports'>Reports</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/forecasts' className='linkTo linkToForecasts'>Forecasts</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/databases' className='linkTo linkToDatabases'>Databases</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/digests' className='linkTo linkToDigests'>Digests</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/links' className='linkTo linkToLinks'>Links</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><a href='#getInTouch' className='linkTo linkToGetInTouch'>Contact us</a></li>
                    <Divider className="dividerBurgerMenu"/>
                </ul>
            </div>
            <Divider className='headerDivider'/>
        </div>
    );
};

export default Header;