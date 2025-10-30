
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import ProgressBar from '../components/ProgressBar';
import StudyBuddy from '../components/StudyBuddy';
import { CheckCircleIcon, CircleIcon } from '../components/icons/Icons';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, getEnrollment, enrollInCourse, toggleLessonComplete, getCourseProgress } = useData();
  const { currentUser } = useAuth();
  
  if (!courseId || !currentUser) return <Navigate to="/login" />;
  
  const course = getCourseById(courseId);
  const enrollment = getEnrollment(currentUser.id, courseId);
  const progress = getCourseProgress(currentUser.id, courseId);

  if (!course) {
    return <Navigate to="/404" />;
  }
  
  const handleEnroll = () => {
    enrollInCourse(currentUser.id, courseId);
  };

  const handleToggleLesson = (lessonId: string) => {
    toggleLessonComplete(currentUser.id, courseId, lessonId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-base rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={course.imageUrl} alt={course.title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">{course.category}</div>
            <h1 className="mt-1 text-4xl leading-tight font-extrabold text-gray-900">{course.title}</h1>
            <p className="mt-4 text-gray-600">{course.description}</p>
            {!enrollment && (
              <button onClick={handleEnroll} className="mt-6 bg-secondary hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
                Enroll Now
              </button>
            )}
          </div>
        </div>
        {enrollment && (
            <div className="p-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
                <div className="flex items-center gap-4">
                    <ProgressBar progress={progress} />
                    <span className="font-semibold text-gray-700">{Math.round(progress)}%</span>
                </div>
            </div>
        )}
      </div>

      {enrollment && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Lessons</h2>
          <div className="space-y-4">
            {course.lessons.map((lesson) => {
              const isCompleted = enrollment.completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="bg-base p-6 rounded-lg shadow-md flex items-start gap-4">
                  <button onClick={() => handleToggleLesson(lesson.id)}>
                    {isCompleted ? <CheckCircleIcon /> : <CircleIcon />}
                  </button>
                  <div className="flex-grow">
                    <h3 className={`text-xl font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>{lesson.title}</h3>
                    <p className="text-gray-600 mt-2">{lesson.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <StudyBuddy lessonContent={course.lessons.map(l => `${l.title}: ${l.content}`).join('\n\n')} lessonTitle={course.title} />
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
