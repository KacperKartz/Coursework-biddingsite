import { Link } from "react-router-dom";


const DealsSection = () => {

    return (
        <>
            <div className="deals-section-container">
                <div className="office-deal">
                    <div>
                        <div>
                            <p>20% off order</p>
                            <h4>Office</h4>
                            <Link className="shop-now-button" to="/shop">Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className="kitchen-deal">
                    <div>
                        <div>
                            <p>20% off order</p>
                            <h4>Kitchen</h4>
                            <Link className="shop-now-button" to="/shop">Shop now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DealsSection;