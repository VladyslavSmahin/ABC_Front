import {useState, useEffect} from "react"; // Добавляем useEffect для начальной загрузки
import './style.scss';
import Divider from "../../../components/divider/index.jsx";

function GetAllArticlesPage() {
    const [isEdit, setIsEdit] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDescriptionId, setOpenDescriptionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const API_URL = import.meta.env.VITE_API_URL || '';

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    console.log(posts)
    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/articles`);
            if (!response.ok) {
                throw new Error("Ошибка при получении постов");
            }
            const data = await response.json();
            console.log(data.isChecked)
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log("delete", id);

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении поста");
            }

            await fetchPosts();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
     const handleUpdate = async (id) => {
         console.log("update", id);
         setLoading(true);
         setError(null);
     }


    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="GetAllArticlesPage">
            <div className="getAllPosts_header">
                <button className='getAllPostsBtn' onClick={fetchPosts}>Get all articles</button>
                <input
                    type="text"
                    placeholder="Поиск по заголовку"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
            </div>

            <div className='allPostsWrapper'>
                {loading && <p>Загрузка...</p>}
                {error && <p style={{color: 'red'}}>Ошибка: {error}</p>}
                {posts.length > 0 ? (
                    <ul>
                        {filteredPosts.map((post) => (
                            <div key={post._id} className={`article ${openDescriptionId === post._id ? 'article_full' : ''}`}>
                            <div className='article_header'>
                                    <strong>ID:</strong> {post._id} <br/>
                                    <strong>Category:</strong>{!isEdit ? post.category : <input/>}
                                    <strong>Date:</strong> {post.date} | | ${post.category} <br/>
                                </div>
                                <div className="article_description">
                                     <p><strong>Title:</strong> {post.title}</p>

                                    <button
                                        className="btn"
                                        onClick={() =>
                                            setOpenDescriptionId(openDescriptionId === post._id ? null : post._id)
                                        }
                                    >
                                        {openDescriptionId === post._id ? 'Скрыть' : 'Показать описание'}
                                    </button>

                                    {openDescriptionId === post._id && <p>{post.description}</p>}

                                </div>
                                <div className='article_images'>
                                    <strong>Images:</strong> {post.imageUrl1_1}, {post.imageUrl3_2}, {post.imageUrl8_3}
                                </div>
                                <div className='article_isMain'>
                                    <strong>isMainArticle:</strong> {post.isMainArticle}
                                </div>
                                <div className={`article_btn_wrapper`}>
                                    <button className={`btn`} onClick={() => handleDelete(post._id)}>Delete</button>

                                    <button className={`btn`} onClick={() => handleUpdate(post._id)}>Update</button>
                                </div>
                                <Divider/>
                            </div>

                        ))}
                    </ul>
                ) : !loading && !error && <p>Нет постов для отображения</p>}
            </div>
        </div>
    );
}

export default GetAllArticlesPage;