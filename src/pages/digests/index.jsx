
import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import Article from "../../components/article/index.jsx";
import {Link, Outlet} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";

const Digests = ({truncateHtml}) => {

    return (
        <div className='container'>
            <ArticleHeader category={categoryList.digests} />
            <PreviewArticle truncateHtml={truncateHtml} category={categoryList.digests}/>
            <Outlet />
        </div>
    );
};

export default Digests;