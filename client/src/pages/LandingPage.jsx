import React from 'react'
import BentoBox from '../components/BentoBox'
import Listing from '../components/listing/Listing'
import Listings from '../components/Listings'
import WelcomePage from '../components/welcome-page'
import ProductCategories from '../components/ProductCategories'
import DealsSection from '../components/DealsSection'
import ProductCollection from '../components/ProductCollection'

const LandingPage = () => {
  return (
    <div id='landingPage'>
        {/* <BentoBox></BentoBox> */}
        {/* <Listings></Listings> */}
        <WelcomePage />
        <ProductCategories />
        <DealsSection />
        <ProductCollection />
    </div>
  )
}

export default LandingPage