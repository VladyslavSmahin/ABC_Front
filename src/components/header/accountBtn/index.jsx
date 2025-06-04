import './style.scss'

const AccountBtn = ({className = ''}) => {

    return (
        <div className={`buttonAccountWrapper ${className}`}>
            <button type='submit' className='buttonAccount'><img src='/images/accountIcon.svg'
                                                                 alt='accountIcon'/></button>
        </div>
    );
};

export default AccountBtn;