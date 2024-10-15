import chevronUp from '../assets/ChevronUp.svg'

const BackToTopButton = () => {
    return (
        <>
            <a href='#landingPage'>
                <img className='backToTopButton' src={ chevronUp }/>
            </a>
        </>
    )
};

export default BackToTopButton;