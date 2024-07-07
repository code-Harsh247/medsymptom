import React from 'react'
import stepsImg from '../images/steps.svg'

const hero = () => {
  return (
    <section className="flex items-center justify-center md:justify-between h-screen bg-white">
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-gs font-medium mb-4 ml-5">
        Empower Your Health <br/>
        with Intelligent Symptom <br/>
        Checking</h1>
        <br/>
        <p className="text-2xl font-gs font-light ml-5 text-{}">
        Identify potential health issues <br/>
        and learn what to do next.
        </p>
        
      </div>
      <div className='hidden md:block'>
        <img src={stepsImg} className='w-full h-full' alt='steps'/>
      </div>
    </section>
  )
}

export default hero