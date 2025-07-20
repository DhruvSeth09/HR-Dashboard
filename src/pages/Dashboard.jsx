import React, { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import useSearch from '../hooks/useSearch'; 

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const departments = ['All', 'HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'];

 
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    filteredData: filteredEmployees
  } = useSearch(employees);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        if (data && data.users) {
          const employeesWithData = data.users.map(user => ({
            ...user,
            department: departments[Math.floor(Math.random() * (departments.length - 1)) + 1],
            rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),  
            age: Math.floor(Math.random() * 30) + 22
          }));
          
          setEmployees(employeesWithData);
          setLoading(false);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterDropdown 
            options={departments.filter(d => d !== 'All')} 
            selected={departmentFilter} 
            onChange={setDepartmentFilter} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map(emp => <EmployeeCard key={emp.id} user={emp} />)
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No employees found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}