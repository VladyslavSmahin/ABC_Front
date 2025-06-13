import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MainImg from "./mainImg/index.jsx";
import Divider from "../divider/index.jsx";
import ReadMoreCard from "./readMoreCard/index.jsx";
import './style.scss'

const Article = () => {
    const {postId} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [readMoreArticles, setReadMoreArticles] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {

                const response = await fetch(`${API_URL}/articles/${postId}`);

                if (!response.ok) {
                    throw new Error("Error while retrieving posts");
                }
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllArticles = async () => {
            try {
                const response = await fetch(`${API_URL}/articles`);
                if (!response.ok) throw new Error("Error while retrieving all articles");
                const data = await response.json();

                // исключаем текущую статью из списка
                const filtered = data.filter(item => item._id !== postId);

                // перемешиваем и берём 2 случайные
                const shuffled = filtered.sort(() => 0.5 - Math.random());


                setReadMoreArticles(shuffled.slice(0, 2));

            } catch (err) {
                console.error("Failed to load read more articles", err);
            }
        };

        fetchArticle();
        fetchAllArticles();

    }, [postId]);
    useEffect(() => {
        console.log("Read more articles updated:", readMoreArticles);
    }, [readMoreArticles]);


    if (loading) return <p className='loading'>Loading article...</p>;
    if (error) return <p style={{color: 'red'}}>Error: {error}</p>;
    if (!article) return null;

    return (
        <div className="postWrapper">
            <div className="post container">
                <MainImg src={article.imageUrl8_3 || article.imageUrl1_1}
                         alt="main img"
                         dateText={article.dateText}
                         classname="postWrapperMainImg"/>
                <h3 className="postTitle"
                    dangerouslySetInnerHTML={{ __html: article.title || 'пусто' }}
                ></h3>
                <div
                    className="postContent"
                    dangerouslySetInnerHTML={{ __html: article.description || 'пусто' }}
                />
                <div className="shareThis">
                    <p>Share this:</p>
                    <div className="socialsWrapper">
                        {/* <a href='' title='click here'><img src='' alt='social'/></a>*/}
                        Socials Links
                    </div>
                </div>
            </div>
            <Divider/>
            <div className="postReadMoreWrapper container">
                <h3 className="postReadMoreTitle">Read more...</h3>
                <div className="postReadMoreContent">
                    {readMoreArticles.map((item, index) => (
                        <ReadMoreCard
                            key={item._id || index}
                            readMoreCardPhotoDate={item.date}
                            srcImg={item.imageUrl3_2}
                            altImg="Article preview"
                            readMoreCardTitle={item.title}
                            to={`/${item.category}/post/${item._id}`}
                        />
                    ))}
                </div>
            </div>


        </div>
    );
};

export default Article;

