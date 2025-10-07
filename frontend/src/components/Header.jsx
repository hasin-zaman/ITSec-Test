import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authApi';
import { Button } from '@/components/ui/button';
import { User, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

/**
 * Reusable Header component for global navigation.
 * Implements a clean, responsive, Google-style aesthetic.
 */
export default function Header() {
  const user = useSelector(selectCurrentUser);

  const authLinks = user ? (
    <>
      {/* User Info */}
      <div className="flex items-center space-x-2 text-sm text-gray-700 p-2 rounded-full border border-transparent hover:bg-gray-50 transition-colors cursor-default">
        <User className="w-5 h-5 text-indigo-600" />
        <span className="hidden sm:inline font-medium truncate max-w-28 md:max-w-40">
          {user.username || user.email || 'User'}
        </span>
      </div>
      
      {/* Dashboard Button */}
      <Link to="/dashboard">
        <Button variant="ghost" className="rounded-full flex items-center space-x-2 p-2 px-4 hover:bg-indigo-50">
          <LayoutDashboard className="w-5 h-5 text-indigo-600" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      </Link>
    </>
  ) : (
    // Public Links
    <div className="flex space-x-2">
      <Link to="/login">
        <Button variant="ghost" className="rounded-full flex items-center space-x-2 p-2 px-4">
          <LogIn className="w-5 h-5 text-gray-500" />
          <span className="hidden sm:inline">Login</span>
        </Button>
      </Link>
      <Link to="/register">
        <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2 p-2 px-4 shadow-md hover:shadow-lg transition-shadow">
          <UserPlus className="w-5 h-5" />
          <span className="hidden sm:inline">Register</span>
        </Button>
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo/App Title - Clean, modern look */}
        <Link to="/">
            <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-indigo-600">Secure</span>
                <span className="text-gray-500">App</span>
            </h1>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-3">
          {authLinks}
        </nav>
      </div>
    </header>
  );
}