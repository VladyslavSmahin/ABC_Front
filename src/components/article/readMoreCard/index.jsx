import './style.scss'

const ReadMoreCard = ({className = '',readMoreCardPhotoDate, readMoreCardTitle, src, alt}) => {

    return (
        <div className={`readMoreCard ${className}`}>
            <img className='readMoreCardPhotoDate' src={src} alt={alt}/>
            <p className='readMoreCardPhotoDate'>{readMoreCardPhotoDate}</p>
            <p className='readMoreCardTitle'>{readMoreCardTitle}</p>
        </div>
    );
};

export default ReadMoreCard;