import './style.scss'
import {Link, useNavigate} from "react-router-dom";
import Divider from "../divider/index.jsx";
import {useState} from "react";
import InputSearch from "./inputSearch/index.jsx";
import AccountBtn from "./accountBtn/index.jsx";

const Header = ({className = ''}) => {
    const [isOpen, setIsOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const navigate = useNavigate();

    const handleClick = () => {
        setIsOpen(!isOpen);

        const header = document.querySelector('.header');
        const burgerMenuContent = document.querySelector('.burgerMenuContent');
        const headerContainer = document.querySelector('.headerContainer');

        if (header) header.classList.toggle('headerBurgerMenuOpen', !isOpen);
        if (burgerMenuContent) burgerMenuContent.classList.toggle('burgerMenuContentOpen', !isOpen);
        if (headerContainer) headerContainer.classList.toggle('headerContainerOpen', !isOpen);


    };
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
                        <li className='title' onClick={() => navigate('/')}>
                            <h2>Alps-Balkans-Carpathians</h2>
                            <h3>Political Studies</h3>
                        </li>
                        <li><Link to='/Analytics' className='linkTo linkToAnalytics'>Analytics</Link></li>
                        <li><Link to='/Reports' className='linkTo linkToReports'>Reports</Link></li>
                        <li><Link to='/Forecasts' className='linkTo linkToForecasts'>Forecasts</Link></li>
                        <li><Link to='/Databases' className='linkTo linkToDatabases'>Databases</Link></li>
                        <li><Link to='/Digests' className='linkTo linkToDigests'>Digests</Link></li>
                        <li><Link to='/Links' className='linkTo linkToLinks'>Links</Link></li>
                        <li className="searchLi">
                            <InputSearch className={`headerInput`}/>
                        </li>
                        <AccountBtn className={`buttonAccount`}/>
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
                    <li className="burgerSearchLi">
                        <InputSearch className={`burgerHeaderInput`} onResultClick={() => {
                            setIsOpen(false)
                        }}/>
                        <AccountBtn className={`burgerButtonAccount`}/>
                    </li>
                    <li onClick={() => setIsOpen(false)}><h3>Menu</h3></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/analytics'
                                                               className='linkTo linkToAnalytics'>Analytics</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/reports'
                                                               className='linkTo linkToReports'>Reports</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/forecasts'
                                                               className='linkTo linkToForecasts'>Forecasts</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/databases'
                                                               className='linkTo linkToDatabases'>Databases</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/digests'
                                                               className='linkTo linkToDigests'>Digests</Link></li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><Link to='/links' className='linkTo linkToLinks'>Links</Link>
                    </li>
                    <Divider className="dividerBurgerMenu"/>
                    <li onClick={() => setIsOpen(false)}><a href='#getInTouch' className='linkTo linkToGetInTouch'>Contact
                        us</a></li>
                    <Divider className="dividerBurgerMenu"/>
                </ul>
            </div>
            <Divider className='headerDivider'/>
        </div>
    );
};

export default Header;