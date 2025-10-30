
import React, { createContext, useState, ReactNode } from 'react';
import { Course, Enrollment, Lesson, User } from '../types';
import { MOCK_COURSES, MOCK_ENROLLMENTS, MOCK_USERS } from '../constants';

interface DataContextType {
  courses: Course[];
  enrollments: Enrollment[];
  users: User[];
  getCourseById: (id: string) => Course | undefined;
  getEnrollment: (userId: string, courseId: string) => Enrollment | undefined;
  enrollInCourse: (userId: string, courseId: string) => void;
  toggleLessonComplete: (userId: string, courseId: string, lessonId: string) => void;
  getCourseProgress: (userId: string, courseId: string) => number;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(MOCK_ENROLLMENTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  
  const getCourseById = (id: string) => courses.find(c => c.id === id);
  
  const getEnrollment = (userId: string, courseId: string) => 
    enrollments.find(e => e.userId === userId && e.courseId === courseId);

  const enrollInCourse = (userId: string, courseId: string) => {
    if (!getEnrollment(userId, courseId)) {
      const newEnrollment: Enrollment = { userId, courseId, completedLessons: [] };
      setEnrollments(prev => [...prev, newEnrollment]);
    }
  };
  
  const toggleLessonComplete = (userId: string, courseId: string, lessonId: string) => {
    setEnrollments(prev => prev.map(enrollment => {
      if (enrollment.userId === userId && enrollment.courseId === courseId) {
        const completed = enrollment.completedLessons.includes(lessonId);
        return {
          ...enrollment,
          completedLessons: completed
            ? enrollment.completedLessons.filter(id => id !== lessonId)
            : [...enrollment.completedLessons, lessonId]
        };
      }
      return enrollment;
    }));
  };

  const getCourseProgress = (userId: string, courseId: string): number => {
    const enrollment = getEnrollment(userId, courseId);
    const course = getCourseById(courseId);
    if (!enrollment || !course || course.lessons.length === 0) return 0;
    return (enrollment.completedLessons.length / course.lessons.length) * 100;
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
        ...courseData,
        id: `course-${Date.now()}`
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };
  
  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    // Also remove related enrollments
    setEnrollments(prev => prev.filter(e => e.courseId !== courseId));
  };

  return (
    <DataContext.Provider value={{
      courses,
      enrollments,
      users,
      getCourseById,
      getEnrollment,
      enrollInCourse,
      toggleLessonComplete,
      getCourseProgress,
      addCourse,
      updateCourse,
      deleteCourse
    }}>
      {children}
    </DataContext.Provider>
  );
};
