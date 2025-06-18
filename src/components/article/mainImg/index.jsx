import './style.scss'
import SkeletonImage from "../../SkeletonImage/SkeletonImage.jsx";

const MainImg = ({src, alt = '', classname = '', dateText}) => {
    return (
        <div className={`mainImg ${classname}`}>
            <SkeletonImage src={src} alt={alt} aspectRatio="12 / 5"/>
            <p className='photoDate'>{dateText}</p>
        </div>
    );
};

export default MainImg;