import React from 'react';

const PerformanceStats = ({ users }) => {
    // Calculate overall statistics
    const totalEmployees = users.length;
    const totalDepartments = [...new Set(users.map(user => user.department))].length;
    
    const avgRating = parseFloat((
        users.reduce((sum, user) => sum + user.performanceRating, 0) / users.length
    ).toFixed(1));
    
    const totalProjects = users.reduce((sum, user) => sum + user.projectsCompleted, 0);

    // Find top performing department
    const departmentStats = users.reduce((acc, user) => {
        if (!acc[user.department]) {
            acc[user.department] = { totalRating: 0, count: 0 };
        }
        acc[user.department].totalRating += user.performanceRating;
        acc[user.department].count += 1;
        return acc;
    }, {});

    const topDept = Object.entries(departmentStats).reduce((a, b) => 
        a[1].totalRating / a[1].count > b[1].totalRating / b[1].count ? a : b
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalEmployees}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Rating</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgRating}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalProjects}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Department</h3>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                    {topDept[0]} ({parseFloat((topDept[1].totalRating / topDept[1].count)).toFixed(1)})
                </p>
            </div>
        </div>
    )
}

export default PerformanceStats;