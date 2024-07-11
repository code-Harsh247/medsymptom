import React from 'react'
import stepsImg from '../images/steps.svg'
import Scroll from './Scroll/scroll'
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center md:justify-between h-screen bg-white">
      <div className="flex items-center justify-center md:justify-between w-full flex-grow">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-gs font-medium mb-4 md:ml-5">
            Empower Your Health <br/>
            with Intelligent Symptom <br/>
            Checking
          </h1>
          <br/>
          <p className="text-2xl font-gs font-light md:ml-5">
            Identify potential health issues <br/>
            and learn what to do next.
          </p>
        </div>
        <div className='hidden md:block'>
          <img src={stepsImg} className='w-full h-full' alt='steps'/>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Scroll />
      </div>
    </section>
  )
}

export default Hero