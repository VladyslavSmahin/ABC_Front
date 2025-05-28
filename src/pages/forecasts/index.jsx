import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import {Outlet, useParams} from "react-router-dom";

import PreviewArticle from "../../components/previewArticle/index.jsx";

const Forecasts = () => {
    const { postId } = useParams();

    return (
        <div className='container'>
            <ArticleHeader category={categoryList.forecasts}/>
            {!postId && <PreviewArticle category={categoryList.forecasts} />}
            <Outlet />
        </div>
    );
};

export default Forecasts;