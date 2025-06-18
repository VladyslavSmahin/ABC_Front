import './style.scss'
import ArticleHeader from "../../components/article/articleHeader/index.jsx";

const TermsAndConditions = ({ className = '' }) => {
        return (
            <div className={`termsAndConditions container ${className}`}>
                    <ArticleHeader category='TERMS AND CONDITIONS OF USE FOR ABCPS.EU' />

                    <strong>1. ACCEPTANCE OF TERMS</strong>
                    <p>
                            By accessing or using the website abcps.eu, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the website.
                    </p>

                    <strong>2. USE OF THE WEBSITE</strong>
                    <p>
                            You may use this website for lawful purposes only. You must not use the site in any way that breaches any applicable local, national, or international law or regulation, or that is unlawful or fraudulent.
                    </p>

                    <strong>3. INTELLECTUAL PROPERTY</strong>
                    <p>
                            All content on this site, including but not limited to text, graphics, logos, and articles, is the property of abcps.eu or its content suppliers and is protected by applicable intellectual property laws. No part of the site may be reproduced or distributed without our prior written permission.
                    </p>

                    <strong>4. DISCLAIMER OF LIABILITY</strong>
                    <p>
                            The content provided on abcps.eu is for informational purposes only and does not constitute professional or legal advice. We make no warranties regarding the accuracy, completeness, or reliability of the information on the site. Your use of the site is at your own risk.
                    </p>

                    <strong>5. EXTERNAL LINKS</strong>
                    <p>
                            The website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external websites. We encourage you to read their terms and privacy policies.
                    </p>

                    <strong>6. MODIFICATION OF TERMS</strong>
                    <p>
                            We reserve the right to amend these Terms and Conditions at any time. Updated versions will be posted on this page. Your continued use of the website after such changes constitutes your acceptance of the new terms.
                    </p>

                    <strong>7. GOVERNING LAW</strong>
                    <p>
                            These Terms and Conditions are governed by the laws of the EU. Any disputes arising from the use of the site shall be subject to the exclusive jurisdiction of the courts in EU.
                    </p>

                    <strong>8. CONTACT INFORMATION</strong>
                    <p>
                            If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <p>📧 <a href="mailto:info.abcps@gmail.com">info.abcps@gmail.com</a></p>
            </div>
        );
};

export default TermsAndConditions;
