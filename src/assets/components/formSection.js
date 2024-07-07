import React from 'react'
import bgImg from '../images/FormBG.png'


const FormSection = () => {
  return (
    <section className="h-screen flex justify-center items-center"
    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    id="formSection">
        
    </section>
  )
}

export default FormSection