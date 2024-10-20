// import watch from '../assets/'
import product from '../assets/Product.svg'
import Listing from './listing/Listing';
import mixer from '../assets/Mixer.png'
import watch from '../assets/Watch.png'
import shelf from '../assets/Shelf.png'


const ProductCategories = () => {

    return (
        <>
            <div className="productCategories-container">
                <div className="productCategories-info">
                    <h2>Shop<br />by Categories</h2>
                    <div className="horizontal-bar bar-orange"></div>
                    <br /><br />
                    <div>
                        <img src={ product } rel='product' />
                        <p>200+<br />Unique deals</p>
                    </div>
                    <br /><br />
                    <a href="#" style={{ textDecoration: 'none' }}>
                        <h5>ALL CATEGORIES</h5>
                    </a>
                    <div className="horizontal-bar bar-black"></div>
                </div>
                <div className="productCategories-category">
                    <div>
                        <img src={ mixer } rel='category-image' />
                        <h5>Household applicances</h5>
                    </div>
                </div>
                <div className="productCategories-category">
                    <div>
                        <img src={ watch } rel='category-image' />
                        <h5>Accessories</h5>
                    </div>
                </div>
                <div className="productCategories-category">
                    <div>
                        <img src={ shelf } rel='category-image' />
                        <h5>Office furniture</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCategories;