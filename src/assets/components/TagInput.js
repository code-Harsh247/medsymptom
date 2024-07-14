import React, { useState, useEffect } from 'react';

const TagInput = ({ onTagsChange, placeholdertext }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    onTagsChange(tags);
  }, [tags]);

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onTagsChange(newTags);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.includes(',')) {
      const newTags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      onTagsChange(updatedTags);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input) {
        addTag(input);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input === '') {
      e.preventDefault();
      const newTags = tags.slice(0, tags.length - 1);
      setTags(newTags);
      onTagsChange(newTags);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      addTag(input);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center border border-gray-300 rounded p-2">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded m-1 text-sm flex items-center">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-600 font-bold">
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow outline-none p-1"
            placeholder={placeholdertext}
          />
        </div>
      </form>
    </div>
  );
};

export default TagInput;