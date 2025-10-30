import React from 'react';
import { useData } from '../hooks/useData';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import { Course } from '../types';

const CoursesPage: React.FC = () => {
  const { courses } = useData();

  if (courses.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore Our Courses</h1>
        <p>No courses available at the moment. Please check back later!</p>
      </div>
    );
  }

  const featuredCourse = courses[0];
  const otherCourses = courses.slice(1);

  const coursesByCategory = otherCourses.reduce((acc, course) => {
    (acc[course.category] = acc[course.category] || []).push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <div>
      {/* Featured Course Section */}
      <div className="bg-base rounded-2xl shadow-xl overflow-hidden mb-12 p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Course</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <img src={featuredCourse.imageUrl} alt={featuredCourse.title} className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md" />
          <div>
            <span className="text-sm font-semibold text-primary uppercase">{featuredCourse.category}</span>
            <h3 className="text-4xl font-extrabold text-gray-900 my-2">{featuredCourse.title}</h3>
            <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
            <Link
              to={`/courses/${featuredCourse.id}`}
              className="inline-block bg-secondary hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>

      {/* Other Courses Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Our Catalog</h1>
      <p className="text-lg text-gray-600 mb-8">Find your next learning adventure from our curated selection of courses.</p>
      
      {Object.entries(coursesByCategory).map(([category, catCourses]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {catCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;