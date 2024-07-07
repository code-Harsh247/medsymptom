import React from 'react'
import './App.css'
import Navbar from './assets/components/navbar'
import Hero from './assets/components/hero'
import FormSection from './assets/components/formSection.js'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FormSection/>
    </div>
  )
}

export default App