import './style.scss'
import Divider from "../divider/index.jsx";

const GetInTouch = ({className = ''}) => {
    return (
        <div className={`getInTouch ${className}`} id='getInTouch'>
            <Divider className='getInTouchDivider'/>
            <div className='getInTouchContent container'>
                <div className='getInTouchContent_leftColumn'>
                    <form className='getInTouchForm'>
                        <label htmlFor='getInTouchInrut'></label>
                        <input id='getInTouchInrut' type='text'></input>
                        <button type='submit' className='getInTouchButton' >Отправить</button>
                    </form>
                </div>
                <div className='getInTouchContent_rightColumn'>
                   <h3>Follow Us</h3>
                    <div className='socialsContainer'>
                        <div className='socials'>
                            <img src='#' alt='socials'/>
                            <p className='socialText'> twitter | X</p>
                        </div>
                        <div className='socials'>
                            <img src='#' alt='socials'/>
                            <p className='socialText'>threads</p>
                        </div>
                        <div className='socials'>
                            <img src='#' alt='socials'/>
                            <p className='socialText'>telegram</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;