import { useEffect, useState } from "react";
import './style.scss';
import { Link } from "react-router-dom";

const PreviewArticle = ({ className, category }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:5000/articles");
                if (!response.ok) {
                    throw new Error("Ошибка при получении постов");
                }
                const data = await response.json();
                const filtered = category
                    ? data.filter(post => post.category === category)
                    : data;
                setPosts(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (posts.length === 0) return <p>Нет подходящих статей для {category}</p>;

    const [firstPost, ...otherPosts] = posts;

    return (
        <div className={`previewArticleWrapper ${className}`}>
            <div className="previewArticleMain">
                <Link to={`post/${firstPost._id}`}>
                    <img src={firstPost.imageUrl8_3 ? firstPost.imageUrl8_3 : firstPost.imageUrl3_2} alt='img 8.3' />
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
                            <img src={post.imageUrl1_1} alt='img 1.1' />
                            <p className='photoDate'>{post.date}</p>
                            <h4 className='photoDescription'
                                dangerouslySetInnerHTML={{ __html: post.title || 'пусто' }}></h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewArticle;
