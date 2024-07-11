import React, { useState, useEffect } from 'react';
import Loader from './Loader/Loader'
import axios from './axiosConfig';


const ResultsComponent = ({ formInput, step }) => {
    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cleanString = (str) => {
        return str.replace(/\\"/g, '"').replace(/"\\/g, '"').replace(/\n/g, '');
    };

    // const convertStringToJsonFile = (inputString, outputFilePath) => {
    //     // Split the input string into separate JSON strings
    //     const jsonStrings = inputString.split('}\n\n{').map((str, index, array) => {
    //         // Add missing braces that were removed by split
    //         if (index !== 0) str = '{' + str;
    //         if (index !== array.length - 1) str += '}';
    //         return str;
    //     });

    //     // Parse each JSON string and combine into an array
    //     const jsonArray = jsonStrings.map(str => JSON.parse(str));

    //     // Write the array to a JSON file
    //     fs.writeFile(outputFilePath, JSON.stringify(jsonArray, null, 2), 'utf8', (err) => {
    //         if (err) {
    //             console.error('Error writing JSON to file:', err);
    //             return;
    //         }
    //         console.log('JSON file has been saved.');
    //     });
    // };

    // const cleanDiseasesData = (data) => {
    //     return data.map(disease => ({
    //         ...disease,
    //         Name: cleanString(disease.Name),
    //         Cause: cleanString(disease.Cause),
    //         Rarity: cleanString(disease.Rarity),
    //         RecommendedStep: cleanString(disease.RecommendedStep)
    //     }));
    // };

    useEffect(() => {
        if (step === 3) {
            const fetchDiagnosis = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.post('http://localhost:4000/diagnose', formInput);
                    console.log(response.data.output);
                    // const cleanedDiseases = cleanDiseasesData(response.data);
                    // console.log("Diseases : ", cleanedDiseases);
                    // setDiseases(cleanedDiseases);
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

    return (
        <div className="p-6 w-full mx-auto font-gs bg-white">
            <h2 className="text-3xl font-medium mb-6">Here are your results:</h2>

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
                                <div className="border text-sm p-2 min-h-[5rem]">{diseases[selectedDisease].Cause}</div>
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

            <div className="mt-6 text-right">
                <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                    Export
                </button>
            </div>
        </div>
    );
};

export default ResultsComponent;
