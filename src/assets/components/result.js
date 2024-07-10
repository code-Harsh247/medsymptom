import React, { useState } from 'react';

const ResultsComponent = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const diseases = ['Disease 1', 'Disease 2', 'Disease 3', 'Disease 4', 'Disease 5'];

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
                {disease}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <h3 className="text-xl text-slate-600 mb-2">Cause:</h3>
            <div className="border p-2 h-20"></div>
          </div>
          <div>
            <h3 className="text-xl text-slate-600 mb-2">Rarity:</h3>
            <div className="border p-2 h-12"></div>
          </div>
          <div>
            <h3 className="text-xl text-slate-600 mb-2">What to do now?</h3>
            <div className="border p-2 h-20"></div>
          </div>
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