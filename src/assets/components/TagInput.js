import React, { useState, useEffect, useRef } from 'react';

const symptoms = [
  'headache', 'headaches', 'lightheadedness', 'lightheaded', 'headache frontal',
  'migraine headaches', 'severe headache', 'fever', 'chest pain'
  // ... add more symptoms as needed
];

const TagInput = ({onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);

  useEffect(() => {
    if (input.length > 0) {
      const filteredSuggestions = symptoms.filter(
        symptom => symptom.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  useEffect(() => {
    onTagsChange(tags);
}, [tags]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.includes(',')) {
      const newTags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      newTags.forEach(addTag);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        addTag(suggestions[selectedIndex]);
      } else if (input) {
        addTag(input);
      }
      setInput('');
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === 'Backspace' && input === '') {
      e.preventDefault();
      setTags(prevTags => prevTags.slice(0, prevTags.length - 1));
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none p-1"
          placeholder="Type a symptom..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="mt-1 border border-gray-200 rounded shadow-lg bg-white max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              ref={el => suggestionRefs.current[index] = el}
              onClick={() => {
                addTag(suggestion);
                setInput('');
                setSuggestions([]);
              }}
              className={`px-4 py-2 cursor-pointer ${
                index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
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