import './style.scss';
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import { categoryList } from "../../data/data.js";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";

const Reports = () => {
    const { postId } = useParams();
    const navigate = useNavigate(); // Для программной навигации
    return (
        <div className="reports container">
            <ArticleHeader category={categoryList.reports} />
            {postId && (
                <span
                    className="back-arrow"
                    onClick={() => navigate(-1)}
                >

                    <img src='/images/arrow.png' className='arrowDescription' alt='arrow'/>
                </span>
            )}
            {!postId && <PreviewArticle category={categoryList.reports} />}
            <Outlet />
        </div>
    );
};

export default Reports;
