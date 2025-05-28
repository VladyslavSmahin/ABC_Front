import './style.scss'
import logo from "../logo/index.jsx";

const MainImg = ({src, alt = '', classname = '', dateText}) => {
    return (
        <div className={`mainImg ${classname}`}>
            <img src={src} alt={alt} />
            <p className='photoDate'>{dateText}</p>
        </div>
    );
};

export default MainImg;