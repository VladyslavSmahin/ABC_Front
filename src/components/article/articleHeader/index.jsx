import './style.scss'
import Category from "../category/index.jsx";
import Logo from "../logo/index.jsx";

const ArticleHeader = ({className = '', category}) => {


    return (
        <div className={`articleHeaderWrapper ${className}`}>

            <Category text={category}/>
            <Logo/>

        </div>
    );
};

export default ArticleHeader;