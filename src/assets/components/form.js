import React, { useState, useEffect, useCallback } from 'react';
import TagInput from './TagInput';
import ResultsComponent from './result';
import backIcon from '../images/back.svg';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        medicalHistory: [],
        symptoms: []
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

        // useEffect(() => {
        //     if(step===3) console.log(formData);
        //   }, [step]);
        

    useEffect(() => {
        validateForm();
    }, [formData, step]);

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.age || formData.age < 1) {
                newErrors.age = 'Please enter a valid age';
                isValid = false;
            }
            if (!formData.gender) {
                newErrors.gender = 'Please select a gender';
                isValid = false;
            }
            if (formData.medicalHistory.length===0) {
                newErrors.medicalHistory = 'Please enter your medical history or Enter "None"';
                isValid = false;
            }
        } else if (step === 2) {
            if (formData.symptoms.length === 0) {
                newErrors.symptoms = 'Please enter at least one symptom';
                isValid = false;
            }
        }

        setErrors(newErrors);
        setIsFormValid(isValid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'age') {
            // Allow empty string or numbers
            const newValue = value === '' ? '' : Math.max(1, Number(value));
            setFormData(prevData => ({
                ...prevData,
                [name]: newValue
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleMedicalHistoryChange = useCallback((newMedicalHistory) => {
        setFormData(prevData => ({
            ...prevData,
            medicalHistory: newMedicalHistory
        }));
    }, []);
    
    const handleSymptomsChange = useCallback((newSymptoms) => {
        setFormData(prevData => ({
            ...prevData,
            symptoms: newSymptoms
        }));
    }, []);

    const nextStep = () => {
        if (isFormValid) {
            setStep(prevStep => prevStep + 1);
            setIsFormValid(false);
        }
    };

    const goBack = () => {
        setStep(prevStep => prevStep - 1);
    }

    const printTest = () => {
        console.log(formData);
    }

    return (
        <div className={`bg-white relative overflow-hidden shadow-lg
            ${step === 3 ? 'w-11/12 h-11/12 custom-scrollbar overflow-y-auto' : 'md:w-2/3 w-11/12 h-auto'} 
            transition-all duration-500 ease-in-out`}>
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
                        className={`w-11/12 md:w-1/2 p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
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
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
                <div className="px-6 py-4 flex flex-col lg:flex-row justify-around">
                    <div className='w-full lg:w-1/2'>
                        <label className="block mb-2 font-gs text-xl text-slate-600">Past medical history</label>
                        <TagInput
                            onTagsChange={handleMedicalHistoryChange}
                            placeholdertext="Type your medical history ..."
                        />
                        {errors.medicalHistory && <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>}
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <p className='text-sm py-4 lg:px-10'>Any relevant past medical history, including chronic conditions, surgeries, previous illnesses and allergies.</p>
                    </div>
                </div>
                <button
                    onClick={nextStep}
                    disabled={!isFormValid}
                    className={`float-right w-32 mr-8 mb-8 text-white px-4 py-2 font-gs rounded transition-colors duration-200 ease-in-out active:scale-95 ${isFormValid ? 'bg-[#1A1A1A] hover:bg-[#2A2A2A]' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${step === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                <div className='w-full h-auto px-6 py-4 flex justify-between'>
                    <h1 className='font-gs text-3xl font-medium'>Step 2: Tell us about your symptoms</h1>
                    <div className='w-12 h-10'>
                        <img src={backIcon} alt="GoBack" className='w-full h-full cursor-pointer' onClick={goBack} />
                    </div>
                </div>
                <div className="px-6 py-4">
                    <label htmlFor="age" className="block mb-2 font-gs text-xl text-slate-600">Describe in your words, or start typing and choose from the dropdown list</label>
                    <div className="flex flex-col items-start">
                        <div className='flex'>
                            <span className="text-sm font-gs mr-2">•</span>
                            <p className="text-sm font-gs">
                                Medical terms are the best but if you do not know them, just enter the symptoms in normal everyday language.
                            </p>
                        </div>
                        <div className='flex'>
                            <span className="text-sm font-gs mr-2">•</span>
                            <p className="text-sm font-gs">
                                Enter each symptom separately then press ENTER or put them all in a line separated by commas.
                            </p>
                        </div>
                    </div>
                    <br />
                    <TagInput
                        onTagsChange={handleSymptomsChange}
                        placeholdertext="Type a symptom ..."
                    />
                    {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>}
                </div>
                <button
                    onClick={nextStep}
                    disabled={!isFormValid}
                    className={`float-right w-32 mr-8 mb-8 text-white px-4 py-2 font-gs rounded transition-colors duration-200 ease-in-out active:scale-95 ${isFormValid ? 'bg-[#1A1A1A] hover:bg-[#2A2A2A]' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ease-in-out 
                ${step === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                <ResultsComponent formInput={formData} step={step} goBack={goBack}/>
            </div>
        </div>
    );
};

export default MultiStepForm;