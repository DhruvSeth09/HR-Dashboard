import React, { useState } from 'react';

export default function FilterDropdown({ options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        Filter: {selected || 'All'}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => handleSelect('')}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}