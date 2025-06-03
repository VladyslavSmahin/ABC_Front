
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/index.jsx";
import Home from "./pages/home/index.jsx";
import Analytics from "./pages/analytics/index.jsx";
import Databases from "./pages/databases/index.jsx";
import Digests from "./pages/digests/index.jsx";
import Forecasts from "./pages/forecasts/index.jsx";
import Links from "./pages/links/index.jsx";
import Reports from "./pages/reports/index.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/index.jsx";
import TermsAndConditions from "./pages/termsAndConditions/index.jsx";
import CookiePolicy from "./pages/cookiePolicy/index.jsx";
import Article from "./components/article/index.jsx";
import MainAdminPage from "./pages/admin/mainAdminPage/index.jsx";
import ChangePost from "./pages/admin/changePost/index.jsx";
import GetAllArticlesPage from "./pages/admin/getAllArticles/index.jsx";

function App() {

    function truncateHtml(html, maxLength = 50) {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;

        let result = '';
        let currentLength = 0;
        let done = false;

        function walk(node) {
            if (done) return;

            if (node.nodeType === Node.TEXT_NODE) {
                const remaining = maxLength - currentLength;
                const text = node.nodeValue;

                if (text.length <= remaining) {
                    result += text;
                    currentLength += text.length;
                } else {
                    result += text.slice(0, remaining) + '...';
                    currentLength = maxLength;
                    done = true;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toLowerCase();
                result += `<${tag}>`;
                for (const child of node.childNodes) {
                    walk(child);
                    if (done) break;
                }
                result += `</${tag}>`;
            }
        }

        for (const child of tempElement.childNodes) {
            walk(child);
            if (done) break;
        }

        return result;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout><Home truncateHtml={truncateHtml} /></MainLayout>} />
                <Route path="/analytics" element={<MainLayout><Analytics truncateHtml={truncateHtml} /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/reports" element={<MainLayout><Reports truncateHtml={truncateHtml} /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/forecasts" element={<MainLayout><Forecasts truncateHtml={truncateHtml} /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/databases" element={<MainLayout><Databases truncateHtml={truncateHtml} /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/digests" element={<MainLayout><Digests truncateHtml={truncateHtml} /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/links" element={<MainLayout><Links truncateHtml={truncateHtml} /></MainLayout>}>
                <Route path="post/:postId" element={<Article/>}/>
                </Route>
                <Route path="/privacyPolicy" element={<MainLayout><PrivacyPolicy/></MainLayout>} />
                <Route path="/termsAndConditions" element={<MainLayout><TermsAndConditions/></MainLayout>} />
                <Route path="/cookiePolicy" element={<MainLayout><CookiePolicy/></MainLayout>} />
                <Route path="/admin" element={<MainAdminPage/>} >
                    <Route path="getAllArticles" element={<GetAllArticlesPage />} />
                    <Route path="changeArticle/:postId" element={<ChangePost/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
