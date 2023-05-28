import React from 'react'
import AboutContactForm from '../components/AboutContactForm'
import AboutMission from '../components/AboutMission'
import AboutUsBanner from '../components/AboutUsBanner'
import AboutUsParagraph from '../components/AboutUsParagraph'
import Facts from '../components/Facts'
import Header from '../components/Navbar'

function AboutUsPage() {
  return (
    <>
        <Header/>
        <AboutUsBanner/>
        <AboutUsParagraph/>
        <Facts/>
        <AboutMission/>  
        <AboutContactForm/>
    </>
  )
}

export default AboutUsPage