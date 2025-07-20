import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import RatingStars from './RatingStars';
import { getDepartmentColor } from '../utils/departmentUtils';

export default function EmployeeCard({ user }) {
  const navigate = useNavigate();
  const { bookmarkedUsers, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarkedUsers.some((u) => u.id === user.id);

  return (
    <div className="border rounded-xl p-4 shadow bg-white dark:bg-gray-800 transition-all hover:shadow-lg hover:transform hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
            {user.image ? (
              <img 
                src={user.image} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-500 dark:text-gray-300">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold dark:text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.company?.title || 'Employee'}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(user);
              }}
              className={`p-1 rounded-full ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-1 text-xs rounded ${getDepartmentColor(user.department || user.company?.department)}`}>
                {user.department || user.company?.department || 'General'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {user.age} yrs
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                  {user.email}
                </span>
              </div>
              <RatingStars rating={user.rating} size="sm" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => navigate(`/employee/${user.id}`)}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert(`Promotion initiated for ${user.firstName}`);
          }}
          className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Promote
        </button>
      </div>
    </div>
  );
}