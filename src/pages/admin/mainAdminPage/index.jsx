import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";
import Divider from "../../../components/divider/index.jsx";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MainAdminPage = () => {
    const [data, setData] = useState({
        category: "",
        title: "",
        description: "",
        date: "",
        isMainArticle: "false",
    });

    const [files, setFiles] = useState({
        image1_1: null,
        image3_2: null,
        image8_3: null,
    });

    const API_URL = import.meta.env.VITE_API_URL || '';

    const [uploading, setUploading] = useState(false);

    const onDrop1_1 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({ ...prev, image1_1: acceptedFiles[0] }));
    }, []);

    const onDrop3_2 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({ ...prev, image3_2: acceptedFiles[0] }));
    }, []);

    const onDrop8_3 = useCallback((acceptedFiles) => {
        setFiles((prev) => ({ ...prev, image8_3: acceptedFiles[0] }));
    }, []);

    const dropzone1_1 = useDropzone({
        onDrop: onDrop1_1,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    const dropzone3_2 = useDropzone({
        onDrop: onDrop3_2,
        accept: { "image/!*": [] },
        maxFiles: 1,
    });

    const dropzone8_3 = useDropzone({
        onDrop: onDrop8_3,
        accept: { "image/!*": [] },
        maxFiles: 1,
    });

    const handleChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("isMainArticle", data.isMainArticle);

        // Append files to FormData
        if (files.image1_1) formData.append("files", files.image1_1);
        if (files.image3_2) formData.append("files", files.image3_2);
        if (files.image8_3) formData.append("files", files.image8_3);

        try {
            const res = await fetch(`${API_URL}/articles`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Ошибка при создании статьи");
            }

            alert("Статья успешно создана!");
            setData({
                category: "",
                title: "",
                description: "",
                date: "",
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

    return (
        <div className="adminPage">
            <p className="welcome">Welcome to Admin Panel 🙂</p>
            <Divider />
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
                            type="text"
                            placeholder="Дата (например, APR 12, 2025)"
                            value={data.date}
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
                    <CKEditor
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
                    />
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
                    <CKEditor
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
                    />
                </div>


                <button type="submit" disabled={uploading}>
                    {uploading ? "Загрузка..." : "Send Article"}
                </button>
            </form>
        </div>
    );
};

export default MainAdminPage;
