import './style.scss'
import {Link} from "react-router-dom";
import Divider from "../divider/index.jsx";
import GetInTouch from "../getInTouch/index.jsx";
import Logo from "../article/logo/index.jsx";

const Footer = () => {
    return (
        <div className='footer'>
            <GetInTouch/>
            <Divider className='footerDivider'/>
            <div className='footerContent container'>
                <ul>
                    <li><Link to='/privacyPolicy' className='linkTo linkprivacyPolicy'>Privacy Policy</Link></li>
                    <li><Link to='/cookiePolicy' className='linkTo linkToCookiePolicy'>Cookie Policy</Link></li>
                    <li><Link to='/termsAndConditions' className='linkTo linkToTermsAndConditions'>Terms and Conditions</Link></li>
                </ul>
                <div className='footerRight'>
                    <a className='number' href=''>©  2025.ABCPS. All rights reserved.</a>
                    <Logo className='footerLogo'/>
                </div>
            </div>
        </div>
    );
};

export default Footer;