import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";
import ClickToBackBtn from "../../components/clickToBackBtn/index.jsx";

const CookiePolicy = ({className = ''}) => {
    return (
        <div className={`cookie container ${className}`}>
            <ArticleHeader category='COOKIE POLICY FOR ABCPS.EU'></ArticleHeader>
            <ClickToBackBtn onClick={() => window.history.back()}/>
            <strong>1. WHAT ARE COOKIES?</strong>
            <p>
                Cookies are small text files stored on your device when you visit a website. They help enhance your
                browsing experience, remember your preferences, and provide analytical data to improve the site's
                performance.
            </p>

            <strong>2. TYPES OF COOKIES WE USE</strong>
            <p>
                We only use strictly necessary cookies on abcps.eu. These cookies are essential for the website to
                function properly and cannot be switched off in our systems. They include:

                Session cookies to maintain user sessions
                Language preference cookies
                ecurity-related cookies

                These cookies do not collect personal information and do not require user consent under GDPR.
            </p>

            <strong>3. HOW TO MANAGE COOKIES</strong>
            <p>
                Most browsers are set to accept cookies automatically. However, you can change your browser
                settings to block or delete cookies. Please note that disabling cookies may affect the
                functionality of the website.
            </p>

            <strong>4. THIRD-PARTY COOKIES</strong>
            <p>
                Our website does not use third-party cookies or tracking technologies. If this changes, we
                will update this policy accordingly and obtain your consent where required.
            </p>

            <strong>5. CHANGES TO THIS POLICY</strong>
            <p>
                We may update this Cookie Policy from time to time in line with legal or technical
                requirements. Any changes will be posted on this page with an updated effective date.
            </p>

            <strong>6. CONTACT</strong>
            <p>
                If you have any questions about our use of cookies or this policy, please contact us at:
                <br/>

            </p>
            <p>📧 <a href="mailto:info.abcps@gmail.com">info.abcps@gmail.com</a></p>
        </div>
    );
};

export default CookiePolicy;
