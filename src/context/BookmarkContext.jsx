import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }) {
  const [bookmarkedUsers, setBookmarkedUsers] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkedUsers));
  }, [bookmarkedUsers]);

  const toggleBookmark = (user) => {
    setBookmarkedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedUsers, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}