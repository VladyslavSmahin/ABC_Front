import './style.scss';
import Divider from "../../components/divider/index.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SkeletonImage from "../../components/SkeletonImage/SkeletonImage.jsx";

const Home = ({className = '', truncateHtml}) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1080);
    const [mainArticles, setMainArticles] = useState({});
    const [randomArticles, setRandomArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {

        const handleResize = () => setIsDesktop(window.innerWidth > 1080);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const shuffleArray = (array) => {
            const result = array.slice();
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }
            return result;
        };

        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/articles`);
                if (!response.ok) throw new Error("Failed to fetch articles");
                const data = await response.json();

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                const filtered = data
                    .filter(a => !a.isDeleted && new Date(a.dateRaw).setHours(0, 0, 0, 0) <= currentDate)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                const picked = {};
                for (let i = 1; i <= 6; i++) {
                    const key = `homeArticle_${i}`;
                    const articles = filtered
                        .filter(a => a.isMainArticle === key)
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
                    picked[key] = articles[0] || null;
                }

                setMainArticles(picked);

                const usedIds = Object.values(picked).map(a => a?._id).filter(Boolean);
                const available = filtered.filter(a => !usedIds.includes(a._id));

                const shuffled = shuffleArray(available);
                setRandomArticles(shuffled.slice(0, 6));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);


    const renderMainArticle = (key, index, placeholderText) => {
        const article = mainArticles[key];  // <- вот здесь!
        if (!article) {
            return (
                <div key={`placeholder_${index}`}
                     className={`homeSection2TextWrapper homeSection2TextWrapper${index + 2}`}>
                    <p className='photoDate'>APR 12, 2025 | Forecasts</p>
                    <Link to='/post' className='photoDescription'>{placeholderText}</Link>
                </div>
            );
        }

        return (
            <div key={article._id || `main_${index}`}
                 className={`homeSection2TextWrapper homeSection2TextWrapper${index + 2}`}>
                <p className='photoDate'>{article.date} | {article.category}</p>
                <Link
                    to={`${article.category}/post/${article._id}`}
                    className='photoDescription'
                    dangerouslySetInnerHTML={{__html: article.title || ''}}
                />
            </div>
        );
    };


    if (error) return <p style={{color: 'red'}}>Error: {error}</p>;

    return (
        <div className={`homeWrapper ${className}`}>
            <div className='home'>
                <section className='homeSection1 container'>
                    <img src='/images/ABC_logo2.png' alt='logo' className='logoHome'/>
                    <div className='homeSection1Text'>
                        <h3>Alps - Balkans - Carpathians</h3>
                        <h4>Political studies</h4>
                    </div>
                </section>

                {!loading && (
                    <>
                        <Divider className="dividerSection1"/>
                        <section className={`homeSection2 ${isDesktop ? 'container' : ''}`}>
                            <div className='homeSection2LeftTextWrapper container'>
                                {mainArticles.homeArticle_1 ? (
                                    <>
                                        <Link
                                            to={`${mainArticles.homeArticle_1.category}/post/${mainArticles.homeArticle_1._id}`}>
                                            <SkeletonImage
                                                aspectRatio="571 / 378"
                                                src={mainArticles.homeArticle_1.imageUrl3_2 || mainArticles.homeArticle_1.imageUrl1_1}
                                                alt='main article'
                                                className='logoHomeSection2'
                                            />
                                        </Link>
                                        <div className='homeSection2TextWrapper homeSection2TextWrapper1'>
                                            <p className='photoDate'>{mainArticles.homeArticle_1.date} | {mainArticles.homeArticle_1.category}</p>
                                            <Link
                                                to={`${mainArticles.homeArticle_1.category}/post/${mainArticles.homeArticle_1._id}`}
                                                className='photoDescription photoDescriptionMain'
                                                dangerouslySetInnerHTML={{__html: mainArticles.homeArticle_1.title || ''}}
                                            />
                                        </div>
                                    </>
                                ) : <p></p>}
                            </div>

                            <Divider className="dividerSection2RightTextWrapper"/>

                            <div className='homeSection2RightTextWrapper container'>
                                {[...Array(5)].map((_, i) =>
                                    renderMainArticle(`homeArticle_${i + 2}`, i, `Статья ${i + 2}`)
                                )}
                            </div>
                        </section>

                        <Divider/>
                        <section className='homeSection3 container'>
                            {randomArticles.map((article, index) => (
                                <div key={article._id || index} className='homeSection3CardWrapper'>
                                    <Link to={`${article.category}/post/${article._id}`}>
                                        <SkeletonImage
                                            src={article.imageUrl1_1}
                                            alt='article img'
                                            className='homeSection3CardWrapperPhoto'
                                            aspectRatio="297 / 288"
                                        />
                                    </Link>
                                    <p className='photoDate'>{article.date} | {article.category}</p>
                                    <Link
                                        to={`${article.category}/post/${article._id}`}
                                        className='photoDescription'
                                        dangerouslySetInnerHTML={{
                                            __html: truncateHtml(article.title || 'пусто', 100)
                                        }}
                                    />
                                </div>
                            ))}
                        </section>
                    </>
                )}

                <Divider/>
                <section className='homeSection4 container'>
                    <p className='homeSection4Text'>
                        <span>
                            ABC PS (ALPS-BALKANS-CARPATHIANS POLITICAL STUDIES) </span>  is an emerging think tank rooted in Central Europe, dedicated to exploring and analyzing political, social, and economic processes across the region. We focus on the dynamic interplay between the Alpine, Balkan, and Carpathian spaces - a crossroads of histories, identities and strategic interests. Our mission is to produce insightful analysis, reliable data, and forward-looking forecasts that help decision-makers, researchers, and engaged citizens better understand the region's evolving landscape.<br/><br/>

                        ABC PS is an independent civic initiative with no legal entity status and no commercial activity.<br/><br/>

                        The project is created on a voluntary basis by a group of researchers and authors who publish analytical materials to promote a deeper understanding of political and social processes.
                        <br/><br/>

                        We do not receive funding, accept donations, cooperate with government bodies, or engage in lobbying. All publications are driven solely by research interest and a sense of public responsibility.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Home;
