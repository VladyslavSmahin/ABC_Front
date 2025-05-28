import './style.scss'

const Category = ({classname = '', text}) => {
    return (
        <div className={`category ${classname}`}>
            <p>{text}</p>
        </div>
    );
};

export default Category;