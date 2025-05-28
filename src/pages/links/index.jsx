
import './style.scss'
import {useEffect} from "react";
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import {Link, Outlet, useParams} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";

const Links = ({  }) => {

    return (
        <div className='container'>
            <ArticleHeader category={categoryList.links} />
            <PreviewArticle category={categoryList.links}/>
            <Outlet />
        </div>
    );
};

export default Links;