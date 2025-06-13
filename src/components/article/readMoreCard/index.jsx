import './style.scss';
import { Link } from 'react-router-dom';

const ReadMoreCard = ({ className = '', readMoreCardPhotoDate, readMoreCardTitle, srcImg, altImg, to }) => {
    return (
        <Link to={to}  className={`readMoreCard ${className}`}>
            <img className='readMoreCardPhoto' src={srcImg} alt={altImg} />
            <p className='readMoreCardPhotoDate photoDate'
               dangerouslySetInnerHTML={{__html: readMoreCardPhotoDate || 'пусто'}}></p>
            <p className='readMoreCardTitle photoDescription'
               dangerouslySetInnerHTML={{__html: readMoreCardTitle || 'пусто'}}></p>
        </Link>
    );
};

export default ReadMoreCard;
