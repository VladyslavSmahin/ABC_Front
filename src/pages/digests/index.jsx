
import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import {categoryList} from "../../data/data.js";
import Article from "../../components/article/index.jsx";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import PreviewArticle from "../../components/previewArticle/index.jsx";
import ClickToBackBtn from "../../components/clickToBackBtn/index.jsx";

const Digests = ({truncateHtml}) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    return (
        <div className='container'>
            <ArticleHeader category={categoryList.digests} />
            {postId && (
                <span
                    className="back-arrow"
                    onClick={() => navigate(-1)}
                >
                    <ClickToBackBtn/>
                </span>
            )}
            {!postId && <PreviewArticle truncateHtml={truncateHtml} category={categoryList.digests} />}
            <Outlet />
        </div>
    );
};

export default Digests;