// Generate a random rating between min and max (default 1 to 5)
export const generateRandomRating = (min = 1, max = 5) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

// Get rating color based on value
export const getRatingColor = (rating) => {
  if (rating >= 4) return 'text-green-500';
  if (rating >= 3) return 'text-yellow-500';
  return 'text-red-500';
};

// Get rating badge class based on value
export const getRatingBadgeClass = (rating) => {
  if (rating >= 4) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (rating >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};