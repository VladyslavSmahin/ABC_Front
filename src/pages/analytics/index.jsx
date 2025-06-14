import './style.scss';
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import { categoryList } from "../../data/data.js";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";
import ClickToBackBtn from "../../components/clickToBackBtn/index.jsx";

const Analytics = ({ className, truncateHtml }) => {
    const { postId } = useParams();
    const navigate = useNavigate(); // Для программной навигации

    return (
        <div className={`analytics container ${className}`}>
            <ArticleHeader category={categoryList.analytics} />
            {postId && (
                <span
                    className="back-arrow"
                    onClick={() => navigate(-1)}
                >
                    <ClickToBackBtn/>
                </span>
            )}
            {!postId && <PreviewArticle truncateHtml={truncateHtml} category={categoryList.analytics} />}
            <Outlet />
        </div>
    );
};

export default Analytics;