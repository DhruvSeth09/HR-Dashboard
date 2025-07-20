import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentChart = ({ users }) => {
    // Process data to get average ratings per department
    const departmentStats = users.reduce((acc, user) => {
        const { department, performanceRating } = user;
        if (!acc[department]) {
            acc[department] = { totalRating: 0, count: 0 };
        }
        acc[department].totalRating += performanceRating;
        acc[department].count += 1;
        return acc;
    }, {});

    const departments = Object.keys(departmentStats).sort();
    const averageRatings = departments.map(dept => 
        parseFloat((departmentStats[dept].totalRating / departmentStats[dept].count).toFixed(1))
    );

    // Find highest and lowest performing departments
    const highestDept = departments.reduce((a, b) => 
        departmentStats[a].totalRating / departmentStats[a].count > 
        departmentStats[b].totalRating / departmentStats[b].count ? a : b
    );
    
    const lowestDept = departments.reduce((a, b) => 
        departmentStats[a].totalRating / departmentStats[a].count < 
        departmentStats[b].totalRating / departmentStats[b].count ? a : b
    );

    const chartData = {
        labels: departments,
        datasets: [{
            label: 'Average Performance Rating',
            data: averageRatings,
            backgroundColor: departments.map(dept => 
                dept === highestDept ? 'rgba(74, 222, 128, 0.7)' : 
                dept === lowestDept ? 'rgba(248, 113, 113, 0.7)' : 
                'rgba(59, 130, 246, 0.7)'
            ),
            borderColor: departments.map(dept => 
                dept === highestDept ? 'rgba(74, 222, 128, 1)' : 
                dept === lowestDept ? 'rgba(248, 113, 113, 1)' : 
                'rgba(59, 130, 246, 1)'
            ),
            borderWidth: 1,
            borderRadius: 4
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dept = context.label;
                        const count = departmentStats[dept].count;
                        return [
                            `Avg Rating: ${context.raw}`,
                            `Employees: ${count}`
                        ];
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 0.5,
                    color: '#6B7280'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: '#6B7280'
                },
                grid: {
                    display: false
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="h-[400px]">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Department Performance Overview
            </h2>
            <Bar options={options} data={chartData} />
        </div>
    );
};

export default DepartmentChart;