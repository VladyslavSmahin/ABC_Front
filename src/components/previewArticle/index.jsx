import {useEffect, useState} from "react";
import './style.scss';
import {Link} from "react-router-dom";
import SkeletonImage from "../SkeletonImage/SkeletonImage.jsx";

const PreviewArticle = ({ className, category, truncateHtml }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';



   /* useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/articles`);
                if (!response.ok) {
                    throw new Error("Error while retrieving posts");
                }
                const data = await response.json();

                const activeArticles = data.filter((post) => {
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0); // Сбрасываем время для сравнения только дат
                    const publishDate = new Date(post.dateRaw);
                    publishDate.setHours(0, 0, 0, 0); // Сбрасываем время для dateRaw
                    return publishDate <= currentDate;
                });

                const articles = activeArticles.filter((post) => !post.isDeleted);

                const filtered = category ? articles.filter(post => post.category === category) : articles;
                setPosts(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);*/

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/articles`);
                if (!response.ok) {
                    throw new Error("Error while retrieving posts");
                }
                const data = await response.json();

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0); // обнуление времени

                const activeArticles = data.filter(post => {
                    const publishDate = new Date(post.dateRaw);
                    publishDate.setHours(0, 0, 0, 0);
                    return publishDate <= currentDate;
                });

                const articles = activeArticles.filter(post => !post.isDeleted);

                const filtered = category
                    ? articles.filter(post => post.category === category)
                    : articles;

                // Сортировка от самых свежих к старым
                const sorted = filtered.sort((a, b) => new Date(b.dateRaw) - new Date(a.dateRaw));

                setPosts(sorted);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [API_URL, category]);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (posts.length === 0) return <p>There are no matching articles for {category}</p>;

    const [firstPost, ...otherPosts] = posts;

    return (
        <div className={`previewArticleWrapper container ${className}`}>
            <div className="previewArticleMain">
                <Link to={`post/${firstPost._id}`}>
                    <SkeletonImage src={firstPost.imageUrl8_3 ? firstPost.imageUrl8_3 : firstPost.imageUrl3_2} alt='img 8.3' aspectRatio="12 / 5"/>
                    <p className='photoDate'>{firstPost.date}</p>
                    <h2 className='photoDescription'
                        dangerouslySetInnerHTML={{ __html: firstPost.title || 'пусто' }}
                    ></h2>
                </Link>
            </div>
            <div className="previewArticleSmallContainer">
                {otherPosts.map(post => (
                    <div className="previewArticleSmall" key={post._id}>
                        <Link to={`post/${post._id}`}>
                            <SkeletonImage src={post.imageUrl1_1} alt='img 1.1' aspectRatio="1 / 1"/>
                            <p className='photoDate'>{post.date}</p>
                            <h4
                                className='photoDescription'
                                dangerouslySetInnerHTML={{ __html: truncateHtml(post.title || 'пусто', 70) }}
                            ></h4>

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewArticle;
