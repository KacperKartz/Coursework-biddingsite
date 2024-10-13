import React from 'react'
import BentoBox from '../components/BentoBox'
import Listing from '../components/listing/Listing'
import Listings from '../components/Listings'
import WelcomePage from '../components/welcome-page'

const LandingPage = () => {
  return (
    <div className='landingPage'>
        {/* <BentoBox></BentoBox> */}
        {/* <Listings></Listings> */}
        <WelcomePage />
    </div>
  )
}

export default LandingPage