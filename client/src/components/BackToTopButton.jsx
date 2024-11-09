import chevronUp from '../assets/ChevronUp.svg';

const BackToTopButton = () => {
    const scrollToTop = () => {
        const mainContainer = document.querySelector('main');

        mainContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className='backToTopButton' onClick={scrollToTop}>
            <img src={chevronUp} alt="Back to top" />
        </button>
    );
};

export default BackToTopButton;
