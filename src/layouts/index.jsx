import './style.scss'
import Header from "../components/header/index.jsx";
import Footer from "../components/footer/index.jsx";

const MainLayout = ({ children }) => {
    return (
        <div className='layout'>
            <Header/>
            <main className='main'>{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;