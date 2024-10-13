import welcomeImage from '../assets/Landing Page.png';
import arrow from '../assets/Arrow.svg';

const WelcomePage = () =>{
    return (
        <>
            <div className="welcome-page-container">
                <div>
                    <p>
                        Aucto bidding site<br/>2024
                    </p>
                    <h5>NEW DEALS</h5>
                    <h2>10% off in<br/>November</h2>
                    <a className='shopNowButton' href='#'>
                        <p>Shop now</p>
                        <img src={ arrow } rel='arrow'/>
                    </a>
                    <h5>DEAL ENDS IN</h5>
                </div>

                <img className="welcomeImage" src={welcomeImage} rel='Welcome Image' />
            </div>
        </>
    )
}

export default WelcomePage;