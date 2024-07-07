import React from 'react'
import bgImg from '../images/FormBG.png'
import Form from './form'


const FormSection = () => {
  return (
    <section className="h-screen flex justify-center items-center"
    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    id="formSection">
    <Form/>
    </section>
  )
}

export default FormSection