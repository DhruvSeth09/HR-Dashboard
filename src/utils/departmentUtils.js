export const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'];

export const getRandomDepartment = () => {
  return departments[Math.floor(Math.random() * departments.length)];
};

export const getDepartmentColor = (department) => {
  const colorMap = {
    HR: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Engineering: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Sales: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Finance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Operations: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  };
  
  return colorMap[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};