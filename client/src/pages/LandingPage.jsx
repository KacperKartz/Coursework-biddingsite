import React from 'react'
import BentoBox from '../components/BentoBox'
import Listing from '../components/listing/Listing'
import Listings from '../components/Listings'
import WelcomePage from '../components/welcome-page'
import BackToTopButton from '../components/BackToTopButton'

const LandingPage = () => {
  return (
    <div id='landingPage'>
        {/* <BentoBox></BentoBox> */}
        {/* <Listings></Listings> */}
        <WelcomePage />
        <BackToTopButton />
    </div>
  )
}

export default LandingPage