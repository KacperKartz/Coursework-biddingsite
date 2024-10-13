import welcomeImage from '../assets/Landing Page.png';

const WelcomePage = () =>{
    return (
        <>
            <div className="welcome-page-container">
                <img src={welcomeImage} rel='Welcome Image' />
            </div>
        </>
    )
}

export default WelcomePage;