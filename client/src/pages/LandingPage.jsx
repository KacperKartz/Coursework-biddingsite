import React from 'react'
import BentoBox from '../components/BentoBox'
import Listing from '../components/listing/Listing'
import Listings from '../components/Listings'

const LandingPage = () => {
  return (
    <div className='landingPage'>
        <BentoBox></BentoBox>
        <Listings></Listings>
    </div>
  )
}

export default LandingPage