import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookOpenIcon, LoginIcon, LogoutIcon, UserAddIcon, ChevronDownIcon, CogIcon, QuestionMarkCircleIcon, UserCircleIcon, ViewGridIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLinkStyle = {
    color: '#F59E0B',
    textDecoration: 'none',
  };
  
  const activeDropdownLinkStyle = {
    backgroundColor: '#1E40AF',
    color: '#FFFFFF',
  }

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpenIcon />
          <span>SmartLearn</span>
        </NavLink>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/courses" className="text-gray-200 hover:text-accent transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Courses</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className="text-gray-200 hover:text-accent transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink>
              {isAdmin && <NavLink to="/admin" className="text-gray-200 hover:text-accent transition duration-300" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Admin</NavLink>}
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-white font-semibold rounded-lg px-3 py-2 hover:bg-blue-800 transition duration-300"
              >
                {currentUser?.name}
                <ChevronDownIcon className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-base rounded-md shadow-lg py-1 z-50 animate-fade-in-down">
                  <NavLink to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" style={({ isActive }) => isActive ? activeDropdownLinkStyle : {}} onClick={() => setIsDropdownOpen(false)}>
                    <UserCircleIcon /> My Profile
                  </NavLink>
                  <NavLink to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" style={({ isActive }) => isActive ? activeDropdownLinkStyle : {}} onClick={() => setIsDropdownOpen(false)}>
                    <CogIcon /> Settings
                  </NavLink>
                  <NavLink to="/help" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" style={({ isActive }) => isActive ? activeDropdownLinkStyle : {}} onClick={() => setIsDropdownOpen(false)}>
                    <QuestionMarkCircleIcon /> Help Center
                  </NavLink>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <LogoutIcon /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="bg-secondary hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center gap-2">
                <LoginIcon />
                Login
              </NavLink>
              <NavLink to="/register" className="hidden sm:flex bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 items-center gap-2">
                 <UserAddIcon />
                 Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;