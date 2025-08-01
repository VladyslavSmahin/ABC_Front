import './style.scss';
import {useEffect, useState} from "react";

const ClickToBackBtn = ({className, onClick}) => {

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 270);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className={`clickToBackBtn ${isFixed ? 'fixed' : 'static'} ${className}`} onClick={onClick}>
            <img src='/images/arrow.svg' alt='arrow' />
            <p>back</p>
        </div>
    );
};

export default ClickToBackBtn;