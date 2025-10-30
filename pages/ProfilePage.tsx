
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { enrollments, getCourseById } = useData();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update user details.
    // Here, we'll just show a success message.
    console.log('Updating user:', { ...currentUser, name, email });
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-base p-6 rounded-2xl shadow-xl text-center">
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-4xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{currentUser.name}</h2>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-base p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && <p className="text-green-600 bg-green-100 p-3 rounded-md">{message}</p>}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-base p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Enrolled Courses</h2>
        {userEnrollments.length > 0 ? (
          <ul className="space-y-3">
            {userEnrollments.map(enrollment => {
              const course = getCourseById(enrollment.courseId);
              return course ? (
                <li key={course.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{course.title}</span>
                  <Link to={`/courses/${course.id}`} className="text-sm text-primary hover:underline">View Course</Link>
                </li>
              ) : null;
            })}
          </ul>
        ) : (
          <p className="text-gray-500">You are not enrolled in any courses.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
