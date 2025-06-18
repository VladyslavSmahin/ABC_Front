import { useState } from 'react';
import './index.scss';

const SkeletonImage = ({ src, alt, className = '' , aspectRatio = ''}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`skeleton-wrapper ${className}`} style={{ aspectRatio: aspectRatio }}
        >
            {!loaded && <div className="skeleton-loader" />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`skeleton-image ${loaded ? 'visible' : ''}`}
                loading="lazy"
            />
        </div>
    );
};

export default SkeletonImage;
