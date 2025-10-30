import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import ProgressBar from '../components/ProgressBar';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { enrollments, getCourseById, getCourseProgress } = useData();

  if (!currentUser) return null;

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {currentUser.name}!</h1>
      <p className="text-lg text-gray-600 mb-8">Continue your learning journey.</p>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>
        {userEnrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {userEnrollments.map(enrollment => {
              const course = getCourseById(enrollment.courseId);
              if (!course) return null;
              const progress = getCourseProgress(currentUser.id, course.id);
              const completedLessonsCount = enrollment.completedLessons.length;
              const totalLessonsCount = course.lessons.length;
              
              return (
                <div key={enrollment.courseId} className="bg-base rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 h-14">{course.title}</h3>
                    <div className="mt-auto">
                        <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{completedLessonsCount} / {totalLessonsCount} Lessons</span>
                            </div>
                            <ProgressBar progress={progress} />
                        </div>
                      <Link 
                        to={`/courses/${course.id}`} 
                        className="block text-center w-full bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mt-4">
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-base rounded-2xl shadow-xl">
            <p className="text-gray-600 text-xl mb-4">You haven't enrolled in any courses yet.</p>
            <p className="text-gray-500 mb-6">Start your journey by finding a course that interests you.</p>
            <Link to="/courses" className="bg-secondary hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 inline-block">
              Explore Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;