import './style.scss';
import { useEffect, useState } from "react";

const ClickToTopBtn = ({ className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className={`clickToTopBtn ${isVisible ? 'visible' : ''} ${className}`}
            onClick={scrollToTop}
        >
            <img src='/images/arrow.svg' alt='arrow' />
        </div>
    );
};

export default ClickToTopBtn;
