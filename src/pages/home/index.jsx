import './style.scss'
import Divider from "../../components/divider/index.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Home = ({className = '', truncateHtml}) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1080);
    const [mainArticle1, setMainArticle1] = useState(null);
    const [mainArticle2, setMainArticle2] = useState(null);
    const [mainArticle3, setMainArticle3] = useState(null);
    const [mainArticle4, setMainArticle4] = useState(null);
    const [mainArticle5, setMainArticle5] = useState(null);
    const [mainArticle6, setMainArticle6] = useState(null);
    const [randomArticles, setRandomArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';



    const [error, setError] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 1080);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/articles`);
                if (!response.ok) {
                    throw new Error("Ошибка при получении постов");
                }
                const data = await response.json();

                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));


                const main1 = sortedData.find(post => post.isMainArticle === "homeArticle_1");
                setMainArticle1(main1);

                const main2 = sortedData.find(post => post.isMainArticle === "homeArticle_2");
                setMainArticle2(main2);

                const main3 = sortedData.find(post => post.isMainArticle === "homeArticle_3");
                setMainArticle3(main3);

                const main4 = sortedData.find(post => post.isMainArticle === "homeArticle_4");
                setMainArticle4(main4);

                const main5 = sortedData.find(post => post.isMainArticle === "homeArticle_5");
                setMainArticle5(main5);

                const main6 = sortedData.find(post => post.isMainArticle === "homeArticle_6");
                setMainArticle6(main6);

                // Фильтруем статьи, исключая те, что уже используются в homeSection2
                const usedIds = [
                    mainArticle1?._id,
                    mainArticle2?._id,
                    mainArticle3?._id,
                    mainArticle4?._id,
                    mainArticle5?._id,
                    mainArticle6?._id,
                ].filter(id => id);

                const availableArticles = sortedData.filter(article => !usedIds.includes(article._id));

                // Перемешиваем оставшиеся статьи случайным образом
                const shuffledArticles = availableArticles.sort(() => Math.random() - 0.5);

                // Берем первые 6 статей (или меньше, если их меньше)
                setRandomArticles(shuffledArticles.slice(0, 6));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

    return (
        <div className={`homeWrapper ${className}`}>
            <div className='home '>
                <section className='homeSection1 container'>
                    <img src='/images/ABC_logo2.png' alt='logo' className='logoHome'/>
                    <div className='homeSection1Text'>
                        <h3>Alps - Balkans - Carpathians</h3>
                        <h4>Political studies</h4>
                    </div>
                </section>
                <Divider className="dividerSection1" />
                <section className={`homeSection2 ${isDesktop ? 'container' : ''}`}>
                    <div className='homeSection2LeftTextWrapper container'>
                        {mainArticle1 ? (
                            <>
                                <Link to={`${mainArticle1.category}/post/${mainArticle1._id}`}>
                                    <img
                                        src={mainArticle1.imageUrl3_2 || mainArticle1.imageUrl1_1}
                                        alt='main article'
                                        className='logoHomeSection2'
                                    />
                                </Link>
                                <div className='homeSection2TextWrapper homeSection2TextWrapper1'>
                                    <p className='photoDate'>{mainArticle1.date} | {mainArticle1.category}</p>
                                    <Link
                                        to={`${mainArticle1.category}/post/${mainArticle1._id}`}
                                        className='photoDescription'
                                        dangerouslySetInnerHTML={{ __html: mainArticle1.title || 'пусто' }}
                                    />
                                </div>
                            </>
                        ) : (
                            <p>Нет главной статьи</p>
                        )}

                        {mainArticle2 ? (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper2'>
                                <p className='photoDate'>{mainArticle2.date} | {mainArticle2.category}</p>
                                <Link to={`${mainArticle2.category}/post/${mainArticle2._id}`}
                                      className='photoDescription'
                                      dangerouslySetInnerHTML={{ __html: mainArticle2.title || 'пусто' }}
                                >
                                </Link>
                            </div>
                        ) : (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper2'>
                                <p className='photoDate'>APR 12 , 2025 | Forecasts</p>
                                <Link to='/post' className='photoDescription'>Статья 2</Link>
                            </div>
                        )}
                    </div>
                    <Divider className="dividerSection2RightTextWrapper" />
                    <div className='homeSection2RightTextWrapper container'>
                        {mainArticle3 ? (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper3'>
                                <p className='photoDate'>{mainArticle3.date} | {mainArticle3.category}</p>
                                <Link to={`${mainArticle3.category}/post/${mainArticle3._id}`} className='photoDescription'
                                      dangerouslySetInnerHTML={{ __html: mainArticle3.title || 'пусто' }}
                                >
                                </Link>
                            </div>
                        ) : (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper3'>
                                <p className='photoDate'>APR 12 , 2025 | Forecasts</p>
                                <Link to='/post' className='photoDescription'>Статья 3</Link>
                            </div>
                        )}
                        {mainArticle4 ? (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper4'>
                                <p className='photoDate'>{mainArticle4.date} | {mainArticle4.category}</p>
                                <Link to={`${mainArticle4.category}/post/${mainArticle4._id}`} className='photoDescription'
                                      dangerouslySetInnerHTML={{ __html: mainArticle4.title || 'пусто' }}
                                >
                                </Link>
                            </div>
                        ) : (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper4'>
                                <p className='photoDate'>APR 12 , 2025 | Forecasts</p>
                                <Link to='/post' className='photoDescription'>Статья 4</Link>
                            </div>
                        )}
                        {mainArticle5 ? (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper5'>
                                <p className='photoDate'>{mainArticle5.date} | {mainArticle5.category}</p>
                                <Link to={`${mainArticle5.category}/post/${mainArticle5._id}`} className='photoDescription'
                                      dangerouslySetInnerHTML={{ __html: mainArticle5.title || 'пусто' }}
                                >
                                </Link>
                            </div>
                        ) : (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper5'>
                                <p className='photoDate'>APR 12 , 2025 | Forecasts</p>
                                <Link to='/post' className='photoDescription'>Статья 5</Link>
                            </div>
                        )}
                        {mainArticle6 ? (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper6'>
                                <p className='photoDate'>{mainArticle6.date} | {mainArticle6.category}</p>
                                <Link to={`${mainArticle6.category}/post/${mainArticle6._id}`} className='photoDescription'
                                      dangerouslySetInnerHTML={{ __html: mainArticle6.title || 'пусто' }}
                                >
                                </Link>
                            </div>
                        ) : (
                            <div className='homeSection2TextWrapper homeSection2TextWrapper6'>
                                <p className='photoDate'>APR 12 , 2025 | Forecasts</p>
                                <Link to='/post' className='photoDescription'>Статья 6</Link>
                            </div>
                        )}
                    </div>
                </section>
                <Divider />
                <section className='homeSection3 container'>
                    {randomArticles.map((article, index) => (
                        <div key={article._id || index} className='homeSection3CardWrapper'>
                            <Link to={`${article.category}/post/${article._id}`}>
                                <img
                                    src={article.imageUrl1_1}
                                    alt='article img'
                                    className='homeSection3CardWrapperPhoto'
                                />
                            </Link>
                            <p className='photoDate'>{article.date} | {article.category}</p>
                            <Link
                                to={`${article.category}/post/${article._id}`}
                                className='photoDescription'
                                dangerouslySetInnerHTML={{ __html: truncateHtml(article.title || 'пусто', 100) }}
                            />
                        </div>
                    ))}
                </section>

                <Divider />
                <section className='homeSection4 container'>
                    <p className='homeSection4Text'><span>ABC Political Studies</span> is an emerging think tank rooted
                        in Central Europe, dedicated to exploring and analyzing political, social, and economic
                        processes across the region.
                        We focus on the dynamic interplay between the Alpine, Balkan, and Carpathian spaces — a
                        crossroads of histories, identities and strategic interests. Our mission is to produce
                        insightful analysis, reliable data, and forward-looking forecasts that help decision-makers,
                        researchers, and engaged citizens better understand the region's evolving landscape.</p>
                </section>
            </div>
        </div>
    );
};

export default Home;