import { User, Course, Enrollment } from './types';

// In a real application, this data would come from a MongoDB database.
// This is a mock database for frontend development.

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', role: 'student' },
  { id: 'user-2', name: 'Bob Smith', email: 'bob@example.com', password: 'password123', role: 'student' },
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React, including components, state, props, and hooks.',
    category: 'Web Development',
    difficulty: 'Beginner',
    imageUrl: 'https://picsum.photos/seed/react/600/400',
    lessons: [
      { id: 'l1-1', title: 'What is React?', content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”. React has a few different kinds of components, but we’ll start with React.Component subclasses.' },
      { id: 'l1-2', title: 'Understanding JSX', content: 'JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML. It lets you write HTML-like structures in the same file as your JavaScript code.' },
      { id: 'l1-3', title: 'Components and Props', content: 'Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Props (short for "properties") are read-only and allow you to pass data from a parent component to a child component.' },
      { id: 'l1-4', title: 'State and Lifecycle', content: 'State is similar to props, but it is private and fully controlled by the component. It allows components to create and manage their own data. Lifecycle methods are special methods that run at particular times in a component\'s life.' },
      { id: 'l1-5', title: 'Handling Events', content: 'Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences: React events are named using camelCase, rather than lowercase. With JSX you pass a function as the event handler, rather than a string.' },
    ],
  },
  {
    id: 'course-2',
    title: 'Advanced Tailwind CSS',
    description: 'Master Tailwind CSS and build beautiful, responsive designs faster than ever.',
    category: 'Web Design',
    difficulty: 'Intermediate',
    imageUrl: 'https://picsum.photos/seed/tailwind/600/400',
    lessons: [
      { id: 'l2-1', title: 'Utility-First Fundamentals', content: 'The core concept of Tailwind CSS is its utility-first approach. Instead of writing custom CSS, you apply pre-existing classes directly in your HTML.' },
      { id: 'l2-2', title: 'Responsive Design', content: 'Tailwind uses a mobile-first breakpoint system. Use responsive utility variants like sm:, md:, lg: to build adaptive user interfaces.' },
      { id: 'l2-3', title: 'Customization', content: 'You can customize Tailwind\'s configuration to match your project\'s design system, including colors, fonts, spacing, and more.' },
    ],
  },
  {
    id: 'course-3',
    title: 'Node.js for Beginners',
    description: 'Build fast and scalable network applications with Node.js.',
    category: 'Backend Development',
    difficulty: 'Beginner',
    imageUrl: 'https://picsum.photos/seed/nodejs/600/400',
    lessons: [
      { id: 'l3-1', title: 'Introduction to Node.js', content: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.' },
      { id: 'l3-2', title: 'Modules and npm', content: 'Node.js has a simple module system, where each file is a module. You can use `require` to import modules. npm is the world\'s largest software registry and the default package manager for Node.js.' },
      { id: 'l3-3', title: 'Building a Simple Server', content: 'The http module in Node.js can be used to create an HTTP server that listens to server ports and gives a response back to the client.' },
    ],
  },
  {
    id: 'course-4',
    title: 'Data Structures & Algorithms',
    description: 'A deep dive into fundamental data structures and algorithms.',
    category: 'Computer Science',
    difficulty: 'Advanced',
    imageUrl: 'https://picsum.photos/seed/dsa/600/400',
    lessons: [
      { id: 'l4-1', title: 'Big O Notation', content: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.' },
      { id: 'l4-2', title: 'Arrays and Linked Lists', content: 'Arrays store elements in contiguous memory locations, while linked lists store elements with pointers to the next element.' },
      { id: 'l4-3', title: 'Trees and Graphs', content: 'Trees are hierarchical data structures, while graphs are a collection of nodes and edges.' },
    ],
  },
  {
    id: 'course-5',
    title: 'Mastering MongoDB',
    description: 'Learn to use MongoDB for scalable, high-performance data storage in your web applications.',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    imageUrl: 'https://picsum.photos/seed/mongodb/600/400',
    lessons: [
      { id: 'l5-1', title: 'Introduction to NoSQL', content: 'Understand the differences between SQL and NoSQL databases and the benefits of using a document-based database like MongoDB.' },
      { id: 'l5-2', title: 'CRUD Operations', content: 'Learn the fundamental Create, Read, Update, and Delete operations in MongoDB to manage your data effectively.' },
      { id: 'l5-3', title: 'Indexing and Aggregation', content: 'Optimize your queries with indexes and perform complex data analysis using the MongoDB aggregation framework.' },
    ],
  },
  {
    id: 'course-6',
    title: 'UI/UX Design Fundamentals',
    description: 'Discover the principles of great UI/UX design to create intuitive and beautiful user experiences.',
    category: 'Web Design',
    difficulty: 'Beginner',
    imageUrl: 'https://picsum.photos/seed/uiux/600/400',
    lessons: [
      { id: 'l6-1', title: 'What is UI/UX?', content: 'Learn the distinction between User Interface (UI) and User Experience (UX) and why both are crucial for product success.' },
      { id: 'l6-2', title: 'User Research and Personas', content: 'Discover how to conduct user research and create user personas to guide your design decisions.' },
      { id: 'l6-3', title: 'Wireframing and Prototyping', content: 'Learn to create low-fidelity wireframes and high-fidelity prototypes to visualize and test your designs.' },
    ],
  },
  {
    id: 'course-7',
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deep into closures, promises, async/await, and other advanced JavaScript features.',
    category: 'Web Development',
    difficulty: 'Advanced',
    imageUrl: 'https://picsum.photos/seed/advanced-js/600/400',
    lessons: [
      { id: 'l7-1', title: 'Closures and Scope', content: 'Understand how closures work and how lexical scope enables powerful patterns in JavaScript.' },
      { id: 'l7-2', title: 'Asynchronous JavaScript', content: 'Master asynchronous programming with Promises and the async/await syntax to handle operations like API calls.' },
      { id: 'l7-3', title: 'Prototypal Inheritance', content: 'Explore JavaScript\'s inheritance model and understand how objects inherit properties and methods from other objects.' },
    ],
  },
  {
    id: 'course-8',
    title: 'Introduction to Python',
    description: 'A beginner-friendly introduction to the Python programming language.',
    category: 'Programming',
    difficulty: 'Beginner',
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    lessons: [
      { id: 'l8-1', title: 'Variables and Data Types', content: 'Learn the basic building blocks of Python, including variables, strings, numbers, and booleans.' },
      { id: 'l8-2', title: 'Control Flow', content: 'Understand how to control the flow of your programs using conditionals (if/else) and loops (for/while).' },
      { id: 'l8-3', title: 'Functions and Modules', content: 'Learn how to write reusable blocks of code with functions and how to organize your code with modules.' },
    ],
  },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  { userId: 'user-1', courseId: 'course-1', completedLessons: ['l1-1', 'l1-2'] },
  { userId: 'user-1', courseId: 'course-2', completedLessons: ['l2-1'] },
  { userId: 'user-2', courseId: 'course-3', completedLessons: ['l3-1', 'l3-2', 'l3-3'] },
];