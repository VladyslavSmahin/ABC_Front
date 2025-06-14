import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";
import ClickToBackBtn from "../../components/clickToBackBtn/index.jsx";

const Forecasts = ({truncateHtml}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    return (
        <div className='container'>
            <ArticleHeader category={categoryList.forecasts}/>
            {postId && (
                <span
                    className="back-arrow"
                    onClick={() => navigate(-1)}
                >
                    <ClickToBackBtn/>
                </span>
            )}
            {!postId && <PreviewArticle truncateHtml={truncateHtml} category={categoryList.forecasts} />}
            <Outlet />
        </div>
    );
};

export default Forecasts;