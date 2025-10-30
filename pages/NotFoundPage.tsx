
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div className="bg-accent px-2 text-sm rounded rotate-12 absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-12deg)'}}>
        Page Not Found
      </div>
      <p className="text-2xl font-bold text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-gray-500 mt-2">You might have mistyped the address or the page may have moved.</p>
      <Link to="/" className="mt-8 inline-block bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
