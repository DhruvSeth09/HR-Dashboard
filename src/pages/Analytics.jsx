import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentChart from '../components/DepartmentChart';
import PerformanceStats from '../components/PerformanceStats';


const Analytics = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('https://dummyjson.com/users?limit=100');
                const enhancedUsers = addMockData(res.data.users);
                setUsers(enhancedUsers);
            } catch (err) {
                setError('Failed to load user data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    const addMockData = (users) => {
        const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design', 'Finance', 'Operations'];
        return users.map(user => ({
            ...user,
            department: departments[Math.floor(Math.random() * departments.length)],
            performanceRating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // Ratings between 1.0 and 5.0
            projectsCompleted: Math.floor(Math.random() * 10) + 1
        }));
    };

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
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Performance Analytics</h1>
            
            <PerformanceStats users={users} />
            
            <div className={`mt-6 p-6 rounded-xl shadow bg-white}`}>
                <DepartmentChart users={users} />
            </div>
        </div>
    );
};

export default Analytics;