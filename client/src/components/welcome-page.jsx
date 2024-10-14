import welcomeImage from '../assets/Landing Page.png';
import arrow from '../assets/Arrow.svg';
import CountdownTimer from './CountdownTimer';

const targetDate = '2024-11-1:59:59';

const WelcomePage = () =>{
    return (
        <>
            <div className="welcome-page-container">
                <div className="welcome-page-info">
                    <p>
                        Aucto bidding site<br/>2024
                    </p>
                    <br /><br />
                    <h5>NEW DEALS</h5>
                    <h2>10% off in<br/>November</h2>
                    <br />
                    <a className='shopNowButton' href='#'>
                        <p>Shop now</p>
                        <img src={ arrow } rel='arrow'/>
                    </a>
                    <br /><br /><br /><br />
                    <h5 className="dealSub">DEAL ENDS IN</h5>
                    <br />
                    <CountdownTimer targetDate={targetDate}/>
                </div>

                <img className="welcomeImage" src={welcomeImage} rel='Welcome Image' />
            </div>
        </>
    )
}

export default WelcomePage;