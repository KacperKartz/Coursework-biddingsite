import welcomeImage from '../assets/Landing Page.png';
import arrow from '../assets/Arrow.svg';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';

const targetDate = '2024-12-01T00:00:00';

const WelcomePage = () =>{
    return (
        <>
            <div className="welcome-page-container">
                <div className="welcome-page-info">
                    <div className="vertical-bar"></div>
                    <p>
                        Aucto bidding site<br/>2024
                    </p>
                    <br />
                    <h5>NEW DEALS</h5>
                    <div className="horizontal-bar bar-black"></div>
        
                    <h2>20% off in<br/>November</h2>
    
                    <Link className='shopNowButton' to='/shop'>
                        <p>Shop now</p>
                        <img src={ arrow } rel='arrow'/>
                    </Link>
                    <br /><br />
                    <h5 className="dealSub">DEAL ENDS IN</h5>
                    <div className="horizontal-bar bar-grey"></div>
                    <CountdownTimer targetDate={targetDate}/>
                </div>

                <img className="welcomeImage" src={welcomeImage} rel='Welcome Image' />
            </div>
        </>
    )
}

export default WelcomePage;