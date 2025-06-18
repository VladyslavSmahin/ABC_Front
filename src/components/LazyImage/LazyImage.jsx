import { useState } from 'react';
import './index.scss';

const LazyImage = ({ src, alt, className = '' }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`lazy-image-wrapper ${className}`}>
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`lazy-image ${loaded ? 'visible' : ''}`}
                loading="lazy"
            />
        </div>
    );
};

export default LazyImage;
