import Listings from "./Listings";

const ProductCollection = () => {

    return (
        <>
            <div className="product-collection-container">
                <div className="product-collection-menu">
                    <h2>Bids Ending Soon</h2>
                    <div className="horizontal-bar bar-orange"></div>
                    <div class="product-collection-filter">
                        <ul>
                            <li><a className="filter-active" href="#">LATEST UPLOAD</a></li>
                            <li><a href="#">TOP RATED</a></li>
                            <li><a href="#">PRICE LOW TO HIGH</a></li>
                            <li><a href="#">PRICE HIGH TO LOW</a></li>
                        </ul>
                    </div>
                </div>
                <Listings />
            </div>
        </>
    )
}

export default ProductCollection;