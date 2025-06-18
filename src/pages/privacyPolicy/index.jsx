import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";

const PrivacyPolicy = ({ className = '' }) => {
        return (
            <div className={`privacyPolicy container ${className}`}>
                    <ArticleHeader category='PRIVACY POLICY FOR ABCPS.EU' />

                    <p>
                            The administration of the website abcps.eu is committed to protecting your privacy online. We pay great attention to safeguarding the personal data you provide to us. "Personal data" refers to any information relating to an identified or identifiable natural person. This Privacy Policy complies with the General Data Protection Regulation (GDPR) and explains how we collect, use, and store personal data.
                    </p>

                    <strong>1. PURPOSES OF PERSONAL DATA PROCESSING</strong>
                    <p>
                            We collect and process personal data for the following purposes:
                            <br />• Providing information upon user request;
                            <br />• Delivering services related to the site's activities;
                            <br />• Complying with legal obligations.
                    </p>

                    <strong>2. COLLECTION AND USE OF PERSONAL DATA</strong>
                    <p>
                            We collect and use your personal data only with your explicit, informed, and voluntary consent. By accepting this Privacy Policy, you authorize us to collect and use the following data:
                            <br />• First and last name;
                            <br />• Email address.
                    </p>
                    <p>
                            Your personal data will only be used for the purposes specified in this Policy and only to the extent necessary to achieve those purposes. All data processing is carried out in accordance with the laws of the European Union.
                    </p>

                    <strong>3. STORAGE, MODIFICATION, AND DELETION OF DATA</strong>
                    <p>
                            You have the right to:
                            <br />• Request information on how your data is processed;
                            <br />• Request a copy of your personal data;
                            <br />• Request correction or deletion of your data;
                            <br />• Withdraw your consent to data processing;
                            <br />• Restrict or object to the processing of your data.
                    </p>
                    <p>
                            Personal data is retained for a period of 12 months. After this period, it will be deleted.
                    </p>
                    <p>
                            To exercise your rights, contact us at:
                    </p>
                    <p>📧 <a href="mailto:info.abcps@gmail.com">info.abcps@gmail.com</a></p>

                    <p>
                            We may share personal data with third parties only with your explicit consent provided in accordance with GDPR requirements. Once transferred, such parties become independent data controllers, and you should contact them directly regarding your data rights.
                    </p>

                    <strong>4. USE OF TECHNICAL DATA</strong>
                    <p>
                            When you visit abcps.eu, the following technical data is automatically recorded:
                            <br />• IP address;
                            <br />• Time of visit;
                            <br />• Browser settings;
                            <br />• Operating system and other parameters necessary for proper website display.
                    </p>
                    <p>
                            This data does not allow us to personally identify the visitor.
                    </p>

                    <strong>5. CHILDREN AND PERSONAL DATA</strong>
                    <p>
                            This website is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors without parental or legal guardian consent. If you believe your child has provided us with personal information, please contact us at:
                    </p>
                    <p>📧 <a href="mailto:info.abcps@gmail.com">info.abcps@gmail.com</a> — we will promptly delete such data.</p>

                    <strong>6. USE OF COOKIES</strong>
                    <p>
                            The website uses only those cookies that are strictly necessary for its operation. These cookies:
                            <br />• Ensure basic website functionality;
                            <br />• Save language and session settings;
                            <br />• Do not require user consent (in accordance with GDPR).
                    </p>
                    <p>
                            You can disable cookies in your browser settings, but this may affect the proper functioning of the site.
                    </p>

                    <strong>7. LINKS TO THIRD-PARTY RESOURCES</strong>
                    <p>
                            The website abcps.eu may contain links to third-party websites. We do not control and are not responsible for the content or privacy practices of those sites. We recommend reviewing the privacy policies of each external website you visit.
                    </p>

                    <strong>8. CHANGES TO THIS PRIVACY POLICY</strong>
                    <p>
                            We may update this Privacy Policy from time to time. All changes will be posted on this page. We monitor changes in EU data protection laws. If the changes are substantial and you have provided your contact information, we will attempt to notify you. However, if your contact information is incorrect or outdated, we may not be able to do so.
                    </p>

                    <strong>9. CONTACT INFORMATION</strong>
                    <p>
                            For any questions regarding the processing or protection of personal data, or to exercise your rights under the GDPR, you may contact us at:
                    </p>
                    <p>📧 <a href="mailto:info.abcps@gmail.com">info.abcps@gmail.com</a></p>

                    <p>
                            If you do not agree with the terms of this Privacy Policy, please refrain from using the site or providing any personal data.
                    </p>
            </div>
        );
};

export default PrivacyPolicy;
