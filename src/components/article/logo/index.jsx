import './style.scss'

const Logo = ({className}) => {
    return (
        <div className={`logo ${className}`}>
            <p>ABC</p>
            <p>political studies</p>
        </div>
    );
};

export default Logo;