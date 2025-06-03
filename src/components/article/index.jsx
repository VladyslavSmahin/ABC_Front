/*
import './style.scss'
import Logo from "./logo/index.jsx";
import Category from "./category/index.jsx";
import MainImg from "./mainImg/index.jsx";
import Divider from "../divider/index.jsx";
import ReadMoreCard from "./readMoreCard/index.jsx";
import { useParams } from "react-router-dom";


const Article = ({className = '',category, postTitle, postContent,dateText,mainImgSrc }) => {
    const { postId } = useParams();

    const articlesData = {
        "1": {
            postTitle: "Заголовок статьи 1",
            postContent: "Содержимое статьи 1",
            mainImgSrc: "/path/to/image1.jpg",
            dateText: "2025-05-23",
        },
        "2": {
            postTitle: "Заголовок статьи 2",
            postContent: "Содержимое статьи 2",
            mainImgSrc: "#",
            dateText: "2025-05-22",
        },
        "3": {
            postTitle: "Заголовок статьи 3",
            postContent: "Содержимое статьи 2",
            mainImgSrc: "#",
            dateText: "2025-05-22",
        },
    };
    const article = articlesData[postId];

    console.log(postId)
    return (
        <div className={`postWrapper ${className}`}>
            <div className={`post container`}>
                <MainImg src='' alt='main img' dateText={article.dateText}
                         classname='postWrapperMainImg'/>
                <h3 className='postTitle'>{article.postTitle}</h3>
                <p className='postContent'>{article.postContent}</p>
                <div className='shareThis'>
                    <p>Share this:</p>
                    <div className='socialsWrapper'>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                        <a href='' title='click here'><img src='' alt='social'/></a>
                    </div>

                </div>
            </div>
            <Divider/>
            <div className={`postReadMoreWrapper container`}>
                <h3 className={`postReadMoreTitle`}>Read more...</h3>
                <div className={`postReadMoreContent`}>
                    <ReadMoreCard/>
                    <ReadMoreCard/>
                    <ReadMoreCard/>
                </div>
            </div>
        </div>
    );
};

export default Article;*/
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

        fetchArticle();
    }, [postId]);

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
                    <ReadMoreCard/>
                    <ReadMoreCard/>
                    <ReadMoreCard/>
                </div>
            </div>
        </div>
    );
};

export default Article;

