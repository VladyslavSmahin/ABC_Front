import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import "./style.scss";
import Divider from "../../../components/divider/index.jsx";
import {useLocation, useParams} from "react-router-dom";
import TinyEditor from "../../../components/AdminEditor/TinyEditor.jsx";

const ChangePost = () => {

    const { postId } = useParams();

    const [data, setData] = useState({
        _id: "",
        category: "",
        title: "",
        description: "",
        date: "",      // Форматированная дата (MAY 28, 2025)
        dateRaw: "",   // Оригинальная дата (2025-05-28)
        isMainArticle: "false",
    });

    const [files, setFiles] = useState({
        image1_1: null,
        image3_2: null,
        image8_3: null,
    });


    const location = useLocation();

    useEffect(() => {
        if (location.state?.article) {
            setData(location.state.article);
        }
    }, [location.state]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


    const [uploading, setUploading] = useState(false);

    const onDrop1_1 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({...prev, image1_1: acceptedFiles[0]}));
    }, []);

    const onDrop3_2 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({...prev, image3_2: acceptedFiles[0]}));
    }, []);

    const onDrop8_3 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({...prev, image8_3: acceptedFiles[0]}));
    }, []);

    const dropzone1_1 = useDropzone({
        onDrop: onDrop1_1,
        accept: {"image/*": []},
        maxFiles: 1,
    });

    const dropzone3_2 = useDropzone({
        onDrop: onDrop3_2,
        accept: {"image/*": []},
        maxFiles: 1,
    });

    const dropzone8_3 = useDropzone({
        onDrop: onDrop8_3,
        accept: {"image/*": []},
        maxFiles: 1,
    });

    const handleChange = (e, field) => {
        if (field === "date") {
            const raw = e.target.value;
            const dateObj = new Date(raw);
            const formatted = dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }).toUpperCase(); // MAY 28, 2025

            setData(prev => ({
                ...prev,
                dateRaw: raw,
                date: formatted
            }));
            console.log("RAW:", raw, "FORMATTED:", formatted);

        } else {
            setData({...data, [field]: e.target.value});
        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        formData.append("_id", data._id);
        formData.append("category", data.category);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("dateRaw", data.dateRaw);
        formData.append("isMainArticle", data.isMainArticle);

        // Append files to FormData
        if (files.image1_1) formData.append("files", files.image1_1);
        if (files.image3_2) formData.append("files", files.image3_2);
        if (files.image8_3) formData.append("files", files.image8_3);

        try {
            const res = await fetch(`${API_URL}/articles/${data._id}`, {
                method: "PUT",
                body: formData,
            });


            if (!res.ok) {
                throw new Error("Ошибка при изменении статьи");
            }

            alert("Статья успешно изменена!");
            setData({
                id: "",
                category: "",
                title: "",
                description: "",
                date: "",
                dateRaw: "",
                isMainArticle: "false",
            });
            setFiles({
                image1_1: null,
                image3_2: null,
                image8_3: null,
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };
    useEffect(() => {
        if (location.state?.article) {
            setData(location.state.article);
        } else if (postId) {
            // Получаем статью с сервера по postId
            fetch(`${API_URL}/articles/${postId}`)
                .then(res => res.json())
                .then(article => setData(article))
                .catch(() => alert("Ошибка при загрузке статьи"));
        }
    }, [location.state, postId]);

    return (
        <div className="adminPage_changePost">
            <Divider/>
            <form onSubmit={handleSubmit}>
                <div className="title_dateWrapper">
                    <select
                        value={data.category}
                        onChange={(e) => handleChange(e, "category")}
                    >
                        <option value="Home">Home</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Reports">Reports</option>
                        <option value="Databases">Databases</option>
                        <option value="Digests">Digests</option>
                        <option value="Links">Links</option>
                    </select>
                    <div className="idWrapper">
                        <span className="id">{data._id}</span>
                    </div>

                    <div className="selectWrapper">
                        <label htmlFor="articlePlacement">Выберите место размещения статьи на главной странице:</label>
                        <select
                            id="articlePlacement"
                            value={data.isMainArticle}
                            onChange={(e) => handleChange(e, "isMainArticle")}
                        >
                            <option value="false">Не выбрано</option>
                            <option value="homeArticle_1">1</option>
                            <option value="homeArticle_2">2</option>
                            <option value="homeArticle_3">3</option>
                            <option value="homeArticle_4">4</option>
                            <option value="homeArticle_5">5</option>
                            <option value="homeArticle_6">6</option>
                        </select>
                    </div>

                    <div className="dateWrapper">
                        <input
                            className="date"
                            type="date"
                            value={data.dateRaw}
                            onChange={(e) => handleChange(e, "date")}
                        />
                    </div>
                </div>
                {/*<textarea
                    className="title"
                    placeholder="Заголовок"
                    value={data.title}
                    onChange={(e) => handleChange(e, "title")}
                />*/}
                <div className="titleEditor">
                    {/*<CKEditor
                        editor={ClassicEditor}
                        data={data.title}
                        onChange={(event, editor) => {
                            const titleData = editor.getData();
                            setData(prev => ({ ...prev, title: titleData }));
                        }}
                        config={{
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "|",
                                "outdent",
                                "indent",
                                "|",
                                "undo",
                                "redo",
                            ],
                        }}
                    />*/}
                    <TinyEditor
                        data={data.title}
                        onChange={(newValue) => setData(prev => ({...prev, title: newValue}))}
                    ></TinyEditor>
                </div>
                <div className="imgWrapper">
                    <div {...dropzone1_1.getRootProps()} className="dropzone">
                        <input {...dropzone1_1.getInputProps()} />
                        {dropzone1_1.isDragActive ? (
                            <p>Отпустите файл здесь ...</p>
                        ) : (
                            <p>Перетащите изображение 1:1 или кликните для выбора</p>
                        )}
                        {files.image1_1 && <p>Выбрано: {files.image1_1.name}</p>}
                    </div>

                    <div {...dropzone3_2.getRootProps()} className="dropzone">
                        <input {...dropzone3_2.getInputProps()} />
                        {dropzone3_2.isDragActive ? (
                            <p>Отпустите файл здесь ...</p>
                        ) : (
                            <p>Перетащите изображение 3:2 или кликните для выбора</p>
                        )}
                        {files.image3_2 && <p>Выбрано: {files.image3_2.name}</p>}
                    </div>

                    <div {...dropzone8_3.getRootProps()} className="dropzone">
                        <input {...dropzone8_3.getInputProps()} />
                        {dropzone8_3.isDragActive ? (
                            <p>Отпустите файл здесь ...</p>
                        ) : (
                            <p>Перетащите изображение 8:3 или кликните для выбора</p>
                        )}
                        {files.image8_3 && <p>Выбрано: {files.image8_3.name}</p>}
                    </div>
                </div>


                <div className="description">
                    {/*<CKEditor
                        editor={ClassicEditor}
                        data={data.description}
                        onChange={(event, editor) => {
                            const dataEditor = editor.getData();
                            setData(prev => ({ ...prev, description: dataEditor }));
                        }}
                        config={{
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "|",
                                "outdent",
                                "indent",
                                "|",
                                "imageUpload",
                                "undo",
                                "redo",
                            ],
                            image: {
                                toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
                            },
                        }}
                    />*/}
                    <TinyEditor
                        data={data.description}
                        onChange={(newValue) => setData(prev => ({...prev, description: newValue}))}
                    ></TinyEditor>
                </div>


                <button type="submit" disabled={uploading}>
                    {uploading ? "Loading..." : "Update"}
                </button>


            </form>
        </div>
    );
};

export default ChangePost;
