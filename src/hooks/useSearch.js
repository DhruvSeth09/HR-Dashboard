import { useState, useEffect } from 'react';

export default function useSearch(initialData = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    let results = initialData;
    
    // search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.firstName.toLowerCase().includes(term) || 
        item.lastName.toLowerCase().includes(term) || 
        item.email.toLowerCase().includes(term) ||
        (item.department && item.department.toLowerCase().includes(term))
      );
    }
    
    // department filter
    if (departmentFilter) {
      results = results.filter(item => item.department === departmentFilter);
    }
    
    setFilteredData(results);
  }, [searchTerm, departmentFilter, initialData]);

  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    filteredData
  };
}