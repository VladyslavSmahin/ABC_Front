import './style.scss';
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import { categoryList } from "../../data/data.js";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";

const Analytics = ({ className }) => {
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

                    <img src='/images/arrow.png' className='arrowDescription' alt='arrow'/>
                </span>
            )}
            {!postId && <PreviewArticle category={categoryList.analytics} />}
            <Outlet />
        </div>
    );
};

export default Analytics;