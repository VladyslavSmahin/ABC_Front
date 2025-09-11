import { useState, useEffect } from "react";
import "./style.scss";
import Divider from "../../../components/divider/index.jsx";
import { useNavigate } from "react-router-dom";

const SLOTS = [
    { value: "false", label: "Не выбрано" },
    { value: "homeArticle_1", label: "1" },
    { value: "homeArticle_2", label: "2" },
    { value: "homeArticle_3", label: "3" },
    { value: "homeArticle_4", label: "4" },
    { value: "homeArticle_5", label: "5" },
    { value: "homeArticle_6", label: "6" },
];

function GetAllArticlesPage() {
    const [showDeleted, setShowDeleted] = useState(false);
    const [showScheduled, setShowScheduled] = useState(false);
    const [posts, setPosts] = useState([]);
    const [slotEdits, setSlotEdits] = useState({}); // { [postId]: "homeArticle_1" | "false" }
    const [updatingId, setUpdatingId] = useState(null); // id статьи, которая сейчас обновляется
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDescriptionId, setOpenDescriptionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const navigate = useNavigate();

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/articles`);
            if (!response.ok) {
                throw new Error("Error fetching posts");
            }
            const data = await response.json();

            // свежие первыми
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(sorted);

            // синхронизируем локальные значения слотов
            const mapping = Object.fromEntries(
                sorted.map((p) => [p._id, p.isMainArticle || "false"])
            );
            setSlotEdits(mapping);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter((post) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const publishDate = new Date(post.dateRaw);
        publishDate.setHours(0, 0, 0, 0);
        const isPublished = publishDate <= currentDate;

        const matchCondition =
            (!showDeleted && !showScheduled && isPublished && !post.isDeleted) ||
            (showDeleted && post.isDeleted) ||
            (showScheduled && !isPublished && !post.isDeleted);

        const matchSearch = (post.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchCondition && matchSearch;
    });

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDeleted: true }),
            });

            if (!response.ok) throw new Error("Error deleting article");

            setPosts((prev) =>
                prev.map((post) => (post._id === id ? { ...post, isDeleted: true } : post))
            );
            setOpenDescriptionId(null);
            alert("The article has been deleted");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDeleted: false }),
            });

            if (!response.ok) throw new Error("Error restoring article");

            setPosts((prev) =>
                prev.map((post) => (post._id === id ? { ...post, isDeleted: false } : post))
            );
            setOpenDescriptionId(null);
            alert("The article has been restored");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateMainSlot = async (id) => {
        const value = slotEdits[id] ?? "false";
        setUpdatingId(id);
        try {
            const res = await fetch(`${API_URL}/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isMainArticle: value }),
            });
            if (!res.ok) throw new Error("Error updating isMainArticle");

            // Оптимистично обновим локально
            setPosts((prev) =>
                prev.map((p) => (p._id === id ? { ...p, isMainArticle: value } : p))
            );

            // Если на бэке снимается прежний держатель слота — подтянем актуальные данные
            await fetchPosts();
            alert("Главный слот обновлён");
        } catch (e) {
            alert(e.message);
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        fetchPosts();
        console.log(posts)
    }, []);

    function stripHtmlTags(html) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    return (
        <div className="GetAllArticlesPage">
            <div className="getAllPosts_header">
                <button
                    className="getAllPostsBtn"
                    onClick={() => {
                        setShowDeleted(false);
                        setShowScheduled(false);
                        fetchPosts();
                    }}
                >
                    Get active articles
                </button>
                <button
                    className="getAllPostsBtn getAllDeletedPostsBtn"
                    onClick={() => {
                        setShowDeleted(true);
                        setShowScheduled(false);
                        fetchPosts();
                    }}
                >
                    Get deleted articles
                </button>
                <button
                    className="getAllPostsBtn getAllScheduledPostsBtn"
                    onClick={() => {
                        setShowDeleted(false);
                        setShowScheduled(true);
                        fetchPosts();
                    }}
                >
                    Get scheduled articles
                </button>
                <input
                    type="text"
                    placeholder="Поиск по заголовку"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
            </div>

            <div className="allPostsWrapper">
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>error: {error}</p>}
                {posts.length > 0 ? (
                    <ul>
                        {filteredPosts.map((post) => {
                            const currentValue =
                                slotEdits[post._id] ?? post.isMainArticle ?? "false";
                            const unchanged =
                                currentValue === (post.isMainArticle || "false");

                            return (
                                <div
                                    key={post._id}
                                    className={`article ${
                                        openDescriptionId === post._id ? "article_full" : ""
                                    }`}
                                >
                                    <div className="article_header">
                                        <strong>ID:</strong> {post._id} <br />
                                        <strong>Title:</strong>{" "}
                                        <p>{stripHtmlTags(post.title || "пусто")}</p>
                                    </div>

                                    <div className="article_btn_wrapper">
                                        {showDeleted ? (
                                            <button className="btn" onClick={() => handleRestore(post._id)}>
                                                Restore
                                            </button>
                                        ) : (
                                            <button className="btn" onClick={() => handleDelete(post._id)}>
                                                Delete
                                            </button>
                                        )}

                                        <button
                                            className="btn"
                                            onClick={() => navigate(`/admin/changeArticle/${post._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    {/* Новый блок: выбор слота главной + Update */}
                                    <div className="article_main_slot_inline">
                                        <label style={{ marginRight: 8 }}>Назначить на главную:</label>
                                        <select
                                            value={currentValue}
                                            onChange={(e) =>
                                                setSlotEdits((prev) => ({
                                                    ...prev,
                                                    [post._id]: e.target.value,
                                                }))
                                            }
                                        >
                                            {SLOTS.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            className="btn"
                                            style={{ marginLeft: 8 }}
                                            disabled={updatingId === post._id || unchanged}
                                            onClick={() => updateMainSlot(post._id)}
                                        >
                                            {updatingId === post._id ? "Updating..." : "Update"}
                                        </button>
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() =>
                                            setOpenDescriptionId(
                                                openDescriptionId === post._id ? null : post._id
                                            )
                                        }
                                    >
                                        {openDescriptionId === post._id ? "Скрыть" : "Показать описание"}
                                    </button>

                                    {openDescriptionId === post._id && (
                                        <>
                                            <div>
                                                <strong>Category:</strong> {post.category}
                                            </div>
                                            <div>
                                                <strong>Date:</strong> {post.date}
                                            </div>
                                            <div>
                                                <strong>Date origin:</strong> {post.dateRaw}
                                            </div>
                                            <div className="article_images">
                                                <strong>Images:</strong> {post.imageUrl1_1},{" "}
                                                {post.imageUrl3_2}, {post.imageUrl8_3}
                                            </div>
                                            <div className="article_isMain">
                                                <strong>isMainArticle:</strong> {post.isMainArticle}
                                            </div>
                                            <div>
                                                <strong>Статус:</strong>{" "}
                                                {post.isDeleted ? "Deleted" : "Active"}{" "}
                                                <strong>deletedAt:</strong> {post.deletedAt}
                                            </div>
                                            <div className="article_description">
                                                <p>{stripHtmlTags(post.description || "пусто")}</p>
                                            </div>

                                            <Divider />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    !loading && !error && <p>Нет постов для отображения</p>
                )}
            </div>
        </div>
    );
}

export default GetAllArticlesPage;
