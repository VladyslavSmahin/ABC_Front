import { useState } from 'react';
import './style.scss';
import Divider from "../divider/index.jsx";

const GetInTouch = ({ className = '' }) => {

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Message sent!");
                setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Очистить форму
            } else {
                alert("Failed to send message");
                const errorText = await res.text();
                console.error("Server error:", errorText);
            }
        } catch (err) {
            alert("Error sending message");
            console.error("Network error:", err);
        }
    };

    return (
        <div className={`getInTouch ${className}`} id='getInTouch'>
            <Divider className='getInTouchDivider' />
            <div className='getInTouchContent container'>
                <div className='getInTouchContent_leftColumn'>
                    <h3>Get in touch</h3>
                    <p>If you have any questions or would you like to submit an article for consideration, feel free to reach out to us</p>
                    <form className='getInTouchForm' onSubmit={handleSubmit}>
                        <div className='nameWrapper'>
                            <label htmlFor="firstName"></label>
                            <input id="firstName" type="text" placeholder="Name" value={formData.firstName} onChange={handleChange} />

                            <label htmlFor="lastName"> </label>
                            <input id="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        </div>

                        <label htmlFor="email"></label>
                        <input id="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />

                        <label htmlFor="message"></label>
                        <textarea id="message" placeholder="Your Message" value={formData.message} onChange={handleChange} />

                        <button type='submit' className='getInTouchButton'>Send message</button>
                    </form>
                </div>

                <div className='getInTouchContent_rightColumn'>
                    <h3>Follow Us</h3>
                    <div className='socialsContainer'>
                        <div className='socials'>
                            <img src='/images/X-icon.svg' alt='socials' />
                            <p className='socialText'> twitter | X</p>
                        </div>
                        <div className='socials'>
                            <img src='/images/threads-icon.svg' alt='socials' />
                            <p className='socialText'>threads</p>
                        </div>
                        <div className='socials'>
                            <img src='/images/tg-icon.svg' alt='socials' />
                            <p className='socialText'>telegram</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;
