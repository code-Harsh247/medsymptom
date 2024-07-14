import React, { useState, useEffect } from 'react';
import Loader from './Loader/Loader'
import axios from './axiosConfig';
import backIcon from '../images/back.svg';


const ResultsComponent = ({ formInput, step, goBack }) => {
    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (step === 3) {
            const fetchDiagnosis = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.post("https://medsymptomapi.azurewebsites.net/diagnose", formInput);
                    console.log(response.data.output);

                    const diseasesArray = response.data.output.split('}\n\n{').map((str, index, array) => {
                        if (index !== 0) str = '{' + str;
                        if (index !== array.length - 1) str += '}';
                        return JSON.parse(str);
                    });
                    console.log("Diseases : ", diseasesArray);
                    setDiseases(diseasesArray);
                    setLoading(false);
                } catch (err) {
                    setError('An error occurred while fetching the diagnosis.');
                    setLoading(false);
                }
            };

            if (formInput) {
                fetchDiagnosis();
            }
        }
    }, [step]);

    if (loading) return (
        <div className="w-full h-full mx-auto  flex justify-center items-center">
            <Loader />
        </div>
    );
    if (error) return <div className="w-full h-full mx-auto  flex justify-center items-center text-red-500">{error}</div>;

    const exportTopdf = () => {

    }

    return (
        <div className="p-6 w-full h-auto mx-auto font-gs bg-white">
            <div className='w-full h-auto flex justify-between items-center mb-6'>
                <h2 className="text-3xl font-medium">Here are your results:</h2>
                <div className='w-12 h-10'>
                    <img src={backIcon} alt="GoBack" className='w-full h-full cursor-pointer' onClick={goBack} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl text-slate-600 mb-2">Probable Diseases</h3>
                    <ul className="space-y-2">
                        {diseases.map((disease, index) => (
                            <li
                                key={index}
                                className={`p-2 border rounded flex justify-between items-center cursor-pointer
                            ${selectedDisease === index ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'}`}
                                onClick={() => setSelectedDisease(index)}
                            >
                                {disease.Name}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    {selectedDisease !== null && (
                        <>
                            <div>
                                <h3 className="text-xl text-slate-600 mb-2">Cause:</h3>
                                <div className="border text-sm p-2 min-h-[3rem]">{diseases[selectedDisease].Cause}</div>
                            </div>
                            <div>
                                <h3 className="text-xl text-slate-600 mb-2">Rarity:</h3>
                                <div className="border text-sm  p-2 min-h-[3rem]">{diseases[selectedDisease].Rarity}</div>
                            </div>
                            <div>
                                <h3 className="text-xl text-slate-600 mb-2">What to do now?</h3>
                                <div className="border text-sm p-2 min-h-[5rem]">{diseases[selectedDisease].RecommendedStep}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* <div className="mt-6 text-right">
                <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={exportTopdf}>
                    Export
                </button>
            </div> */}
        </div>
    );
};

export default ResultsComponent;