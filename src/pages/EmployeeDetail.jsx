import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs';
import RatingStars from '../components/RatingStars';
import { useBookmarks } from '../context/BookmarkContext';
import { getDepartmentColor } from '../utils/departmentUtils';

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 3,
    comment: '',
    reviewer: ''
  });
  const { bookmarkedUsers, toggleBookmark } = useBookmarks();
  
  const isBookmarked = bookmarkedUsers.some(u => u.id === parseInt(id));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        
        if (data && data.id) {
          setUser({
            ...data,
            performanceHistory: Array.from({ length: 12 }, () => (Math.random() * 4 + 1).toFixed(1)),
            projects: [
              { id: 1, name: 'Onboarding Portal', status: 'Completed', role: data.company.title },
              { id: 2, name: 'Payroll System', status: 'In Progress', role: 'Frontend Developer' },
              { id: 3, name: 'Performance Review', status: 'Planning', role: 'UX Designer' }
            ],
            feedback: [],
            rating: parseFloat((Math.random() * 4 + 1).toFixed(1))
          });
          setLoading(false);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError('Failed to load employee details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.comment || !feedbackForm.reviewer) return;
    
    const newFeedback = {
      id: Date.now(),
      reviewer: feedbackForm.reviewer,
      rating: feedbackForm.rating,
      comment: feedbackForm.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setUser(prev => ({
      ...prev,
      feedback: [...prev.feedback, newFeedback]
    }));
    
    setFeedbackForm({
      rating: 3,
      comment: '',
      reviewer: ''
    });
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
          <button 
            onClick={() => navigate('/')}
            className="mt-2 bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const tabs = [
    {
      label: 'Profile',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Personal Details</h4>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Full Name:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName} {user.maidenName && `(${user.maidenName})`}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Birth Date:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatDate(user.birthDate)}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Gender:</span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {user.gender}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Physical Attributes</h4>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Height/Weight:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.height} cm / {user.weight} kg
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Blood Group:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.bloodGroup}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Eye Color:</span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {user.eyeColor}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Hair:</span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {user.hair?.color} {user.hair?.type}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Email:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.email}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Phone:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.phone}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Address:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.address?.address}, {user.address?.city}, {user.address?.state}, {user.address?.postalCode}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Education & Work</h4>
                <div className="space-y-2">
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">University:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.university}
                    </span>
                  </p>
                  <p className="flex">
                    <span className="w-32 text-gray-600 dark:text-gray-300">Company:</span>
                    <span className="text-gray-900 dark:text-white">
                      {user.company?.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Financial Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-900 dark:text-white">Card: **** **** **** {user.bank?.cardNumber?.slice(-4)}</p>
                <p className="text-gray-900 dark:text-white">Expires: {user.bank?.cardExpire}</p>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">IBAN: {user.bank?.iban}</p>
                <p className="text-gray-900 dark:text-white">Currency: {user.bank?.currency}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Projects',
      content: (
        <div className="space-y-4">
          {user.projects.map(project => (
            <div key={project.id} className="border rounded-lg p-4 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : project.status === 'In Progress' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Role: {project.role}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Performance',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Performance History</h4>
            <div className="flex flex-wrap gap-2">
              {user.performanceHistory.map((rating, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-2 rounded-lg text-center ${
                    rating >= 4 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    rating >= 3 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  <div className="text-xs">Q{index + 1}</div>
                  <div className="font-bold">{rating}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Feedback</h4>
            <div className="space-y-4">
              {user.feedback.map(item => (
                <div key={item.id} className="border rounded-lg p-4 dark:border-gray-700">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.reviewer}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <RatingStars rating={parseFloat(item.rating)} />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {item.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Give Feedback',
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={feedbackForm.reviewer}
                  onChange={(e) => setFeedbackForm({...feedbackForm, reviewer: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating
                </label>
                <div className="flex items-center">
                  <RatingStars 
                    rating={feedbackForm.rating} 
                    interactive 
                    onRatingChange={(rating) => setFeedbackForm({...feedbackForm, rating})}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {feedbackForm.rating}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Comments
                </label>
                <textarea
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                  rows="4"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="flex items-center justify-center bg-gray-200 rounded-xl w-full h-64 md:h-80 overflow-hidden">
              {user.image && (
                <img 
                  src={user.image} 
                  alt={`${user.firstName} ${user.lastName}`} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{user.company?.title}</p>
              
              <div className="flex items-center mt-3">
                <RatingStars rating={user.rating} />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {user.rating} Performance Rating
                </span>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleBookmark(user)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                    isBookmarked
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                  }`}
                >
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => alert(`Promotion initiated for ${user.firstName}`)}
                  className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                >
                  Promote
                </button>
              </div>
              
              <div className="mt-6 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h3>
                  <p className="text-gray-900 dark:text-white">{user.phone}</p>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</h3>
                  <span className={`px-2 py-1 rounded text-sm ${getDepartmentColor(user.company?.department)}`}>
                    {user.company?.department}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Technical</h3>
                  <p className="text-gray-900 dark:text-white text-sm truncate">
                    {user.userAgent}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}