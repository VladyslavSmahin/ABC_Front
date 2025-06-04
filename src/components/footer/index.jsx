
import './style.scss'
import {Link} from "react-router-dom";
import Divider from "../divider/index.jsx";
import GetInTouch from "../getInTouch/index.jsx";

const Footer = () => {
    return (
        <div className='footer'>
            <GetInTouch/>
            <Divider className='footerDivider' />
            <div className='footerContent container'>
                <ul>
                    <li><Link to='/privacyPolicy' className='linkTo linkprivacyPolicy'>Privacy Policy</Link></li>
                    <li><Link to='/cookiePolicy' className='linkTo linkToCookiePolicy'>Cookie Policy</Link></li>
                    <li><Link to='/termsAndConditions' className='linkTo linkToTermsAndConditions'>Terms and Conditions of use</Link></li>
                </ul>
                <div className='footerRight'>
                    <a className='footerLogo' href=''>Logo</a>
                    <a className='number' href=''>2025</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;