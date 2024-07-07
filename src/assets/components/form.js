import React, { useState } from 'react';
import TagInput from './TagInput'; // Ensure this component is available

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        medicalHistory: 'None',
        symptoms: 'None'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = Math.max(1, Number(value)); // Ensure value is not below 1
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleMedicalHistoryChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    return (
        <div className='bg-white h-auto md:w-2/3 lg:w-2/3 w-11/12 relative overflow-hidden shadow-lg'>
            <div className={`transition-all duration-300 ease-in-out ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                <div className='w-full h-auto px-6 py-4'>
                    <h1 className='font-gs text-3xl font-medium'>Step 1: Tell us about yourself</h1>
                </div>
                <div className="px-6 py-4 border-b-2">
                    <label htmlFor="age" className="block mb-2 font-gs text-xl text-slate-600">How old are you?</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-11/12 md:w-1/2 p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>
                <div className="px-6 py-4 border-b-2">
                    <label className="block mb-2 font-gs text-xl text-slate-600">What is your Gender?</label>
                    <div className="flex space-x-4">
                        {['Male', 'Female'].map((gender) => (
                            <button
                                key={gender}
                                onClick={() => setFormData(prev => ({ ...prev, gender }))}
                                className={`px-4 py-2 border transition-colors duration-100 ${formData.gender === gender
                                    ? 'bg-[#1A1A1A] text-white'
                                    : 'bg-white text-black hover:bg-gray-100'
                                    }`}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-4 flex flex-col lg:flex-row justify-around">
                    <div className='w-full lg:w-1/2'>
                        <label className="block mb-2 font-gs text-xl text-slate-600">Past medical history</label>
                        <input
                            type="text"
                            id="medicalHistory"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleMedicalHistoryChange}
                            className="w-11/12 md:w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <p className='text-sm py-4 lg:px-10'>Any relevant past medical history, including chronic conditions, surgeries, previous illnesses and allergies.</p>
                    </div>
                </div>
                <button onClick={nextStep} className="float-right w-32 bg-[#1A1A1A] mr-8 mb-8 text-white px-4 py-2 font-gs rounded hover:bg-[#2A2A2A] transition-colors duration-200 ease-in-out active:scale-95">Next</button>
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${step === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                <div className='w-full h-auto px-6 py-4'>
                    <h1 className='font-gs text-3xl font-medium'>Step 2: Tell us about your symptoms</h1>
                    <TagInput 
                        value={formData.symptoms}
                        onChange={value => setFormData(prev => ({ ...prev, symptoms: value }))}
                    />
                    <button onClick={nextStep} className="float-right w-32 bg-[#1A1A1A] mr-8 mb-8 text-white px-4 py-2 font-gs rounded hover:bg-[#2A2A2A] transition-colors duration-200 ease-in-out active:scale-95">Next</button>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
