
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-base rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 font-medium">{course.category}</p>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColor[course.difficulty]}`}>
                {course.difficulty}
            </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 h-14">{course.title}</h3>
        <p className="text-gray-600 flex-grow mb-4">{course.description}</p>
        <Link 
            to={`/courses/${course.id}`} 
            className="mt-auto text-center w-full bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
