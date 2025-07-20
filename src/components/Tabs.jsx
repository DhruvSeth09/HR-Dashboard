import React, { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-500 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}