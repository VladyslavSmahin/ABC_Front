
import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import {Outlet, useParams} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";

const Databases = () => {
    const { postId } = useParams();
    return (
        <div className='container'>
            <ArticleHeader category={categoryList.databases} />
            {!postId && <PreviewArticle category={categoryList.databases} />}
            <Outlet />
        </div>
    );
};

export default Databases;