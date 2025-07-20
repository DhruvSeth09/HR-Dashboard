import React from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { useBookmarks } from '../context/BookmarkContext';

export default function Bookmarks() {
  const { bookmarkedUsers } = useBookmarks();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bookmarked Employees</h1>
        <div className="text-gray-600 dark:text-gray-300">
          {bookmarkedUsers.length} {bookmarkedUsers.length === 1 ? 'employee' : 'employees'}
        </div>
      </div>

      {bookmarkedUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedUsers.map(user => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No bookmarks yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Bookmark employees to see them listed here.
          </p>
        </div>
      )}
    </div>
  );
}