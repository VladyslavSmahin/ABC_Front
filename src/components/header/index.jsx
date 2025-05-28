import './style.scss'
import {Link} from "react-router-dom";
import Divider from "../divider/index.jsx";
import {useState} from "react";

const Header = ({className = ''}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        setIsOpen(!isOpen);

        const header = document.querySelector('.header');
        const burgerMenuContent = document.querySelector('.burgerMenuContent');
        const headerContainer = document.querySelector('.headerContainer');

        if (header) header.classList.toggle('headerBurgerMenuOpen', !isOpen);
        if (burgerMenuContent) burgerMenuContent.classList.toggle('burgerMenuContentOpen', !isOpen);
        if (headerContainer) headerContainer.classList.toggle('headerContainerOpen', !isOpen);

       // if (onClick) onClick(e);
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
                        <input type='text' placeholder='Search by name' className='headerInput'/>
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