
import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { Course } from '../types';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '../components/icons/Icons';

// Re-defining component here to avoid re-rendering issues from defining inside parent.
const CourseFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course | Omit<Course, 'id'>) => void;
  course: Course | null;
}> = ({ isOpen, onClose, onSave, course }) => {
  const [formData, setFormData] = useState<Omit<Course, 'id' | 'lessons' | 'imageUrl'> & { lessons: string }>({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || '',
    difficulty: course?.difficulty || 'Beginner',
    lessons: course?.lessons.map(l => `${l.title} | ${l.content}`).join('\n') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lessons = formData.lessons.split('\n').filter(line => line.includes('|')).map((line, index) => {
      const [title, content] = line.split('|');
      return { id: `l-${Date.now()}-${index}`, title: title.trim(), content: content.trim() };
    });
    
    const courseData = {
      ...formData,
      lessons,
      imageUrl: `https://picsum.photos/seed/${formData.title.replace(/\s+/g, '-')}/600/400`,
    };

    if (course) {
        onSave({ ...course, ...courseData });
    } else {
        onSave(courseData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{course ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full p-2 border rounded" />
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <textarea name="lessons" value={formData.lessons} onChange={handleChange} placeholder="Lessons (format: Title | Content, one per line)" rows={5} required className="w-full p-2 border rounded font-mono text-sm" />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Save Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboardPage: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddClick = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };
  
  const handleSaveCourse = (courseData: Course | Omit<Course, 'id'>) => {
      if ('id' in courseData) {
          updateCourse(courseData as Course);
      } else {
          addCourse(courseData as Omit<Course, 'id'>);
      }
      setIsModalOpen(false);
      setEditingCourse(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleAddClick} className="bg-secondary hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
            <PlusCircleIcon /> Add Course
        </button>
      </div>

      <div className="bg-base p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Courses</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lessons.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => handleEditClick(course)} className="p-2 hover:bg-gray-100 rounded-full"><PencilIcon /></button>
                                <button onClick={() => deleteCourse(course.id)} className="p-2 hover:bg-gray-100 rounded-full ml-2"><TrashIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
        course={editingCourse}
      />
    </div>
  );
};

export default AdminDashboardPage;
