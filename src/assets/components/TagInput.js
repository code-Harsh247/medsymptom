import React, { useState, useEffect, useRef } from 'react';

const symptoms = [
  'headache', 'headaches', 'lightheadedness', 'lightheaded', 'headache frontal',
  'migraine headaches', 'severe headache', 'fever', 'chest pain'
  // ... add more symptoms as needed
];

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input.length > 0) {
      const filteredSuggestions = symptoms.filter(
        symptom => symptom.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInput('');
      setSuggestions([]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center border border-gray-300 rounded p-2">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded m-1 text-sm flex items-center">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-1 text-blue-600 font-bold">
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow outline-none p-1"
          placeholder="Type a symptom..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="mt-1 border border-gray-200 rounded shadow-lg bg-white max-h-60 overflow-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion}
              onClick={() => addTag(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;