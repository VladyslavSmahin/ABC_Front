import './style.scss'
import Divider from "../divider/index.jsx";
const GetInTouch = ({className = ''}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        await fetch('https://abc-back.onrender.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        alert('Message sent!');
    };


    return (
        <div className={`getInTouch ${className}`} id='getInTouch'>
            <Divider className='getInTouchDivider'/>
            <div className='getInTouchContent container'>
                <div className='getInTouchContent_leftColumn'>
                    <h3>Get in touch</h3>
                    <p>If you have any questions or would you like to submit an article for consideration, feel free for
                        reach out to us</p>
                    <form className='getInTouchForm'  onSubmit={handleSubmit}>
                        <div className='nameWrapper'>
                            <label htmlFor="firstName"></label>
                            <input id="firstName" type="text" placeholder="Name"/>

                            <label htmlFor="lastName"> </label>
                            <input id="lastName" type="text" placeholder="Last Name"/>
                        </div>

                        <label htmlFor="email"></label>
                        <input id="email" type="email" placeholder="E-mail"/>

                        <label htmlFor="message"></label>
                        <textarea id="message" placeholder="Your Message"/>


                        <button type='submit' className='getInTouchButton'>Send message</button>
                    </form>
                </div>
               {/* {isMobile && <Divider className='FollowUsDivider'/>}*/}
                <div className='getInTouchContent_rightColumn'>
                    <h3>Follow Us</h3>
                    <div className='socialsContainer'>
                        <div className='socials'>
                            <img src='/images/X-icon.svg' alt='socials'/>
                            <p className='socialText'> twitter | X</p>
                        </div>
                        <div className='socials'>
                            <img src='/images/threads-icon.svg' alt='socials'/>
                            <p className='socialText'>threads</p>
                        </div>
                        <div className='socials'>
                            <img src='/images/tg-icon.svg' alt='socials'/>
                            <p className='socialText'>telegram</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;