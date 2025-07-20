import { useContext } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';

export function useBookmarks() {
  return useContext(BookmarkContext);
}