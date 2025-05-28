
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/index.jsx";
import Home from "./pages/home/index.jsx";
import Analytics from "./pages/analytics/index.jsx";
import Databases from "./pages/databases/index.jsx";
import Digests from "./pages/digests/index.jsx";
import Forecasts from "./pages/forecasts/index.jsx";
import Links from "./pages/links/index.jsx";
import Reports from "./pages/reports/index.jsx";
import Admin from "./pages/admin/index.jsx";
import Divider from "./components/divider/index.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/index.jsx";
import TermsAndConditions from "./pages/termsAndConditions/index.jsx";
import CookiePolicy from "./pages/cookiePolicy/index.jsx";
import Post from "./components/article/index.jsx";
import Article from "./components/article/index.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/reports" element={<MainLayout><Reports /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/forecasts" element={<MainLayout><Forecasts /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/databases" element={<MainLayout><Databases /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/digests" element={<MainLayout><Digests /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/links" element={<MainLayout><Links /></MainLayout>}>
                    <Route path="post/:postId" element={<Article/>} />
                </Route>
                <Route path="/privacyPolicy" element={<MainLayout>< PrivacyPolicy/></MainLayout>} />
                <Route path="/termsAndConditions" element={<MainLayout>< TermsAndConditions/></MainLayout>} />
                <Route path="/cookiePolicy" element={<MainLayout>< CookiePolicy/></MainLayout>} />
                <Route path="/admin" element={< Admin/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
