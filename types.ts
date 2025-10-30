
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be sent to frontend in a real app
  role: 'student' | 'admin';
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
  imageUrl: string;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  completedLessons: string[]; // Array of lesson IDs
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
