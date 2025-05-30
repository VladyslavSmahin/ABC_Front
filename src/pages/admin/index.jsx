/*
import './style.scss'
import MainAdminPage from "./mainAdminPage/index.jsx";
import { useState } from "react";
import GetAllPosts from "./getAllArticles/index.jsx";
import Dropdown from "../../components/dropdown/index.jsx";
import ChangePost from "./changePost/index.jsx";

function AdminPage() {
    const [page, setPage] = useState("mainPage");

    const handlePageChange = (e) => {
        setPage(e.target.value);
    };

    return (
        <div className="admin-page">

            <Dropdown
                className={``}
                value={page}
                onChange={handlePageChange}
                options={[{value: 'mainPage', label: 'Main Page'}, {value: 'allPosts', label: 'All Posts'}]}
            />
            {page === "mainPage" && <MainAdminPage />}
            {page === "allPosts" && <GetAllPosts setPage={setPage}/>}

        </div>
    );
}

export default AdminPage;*/
