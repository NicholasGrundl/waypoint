// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, login, logout, isLoading, error } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              InSilico
            </Link>
          </div>

          {/* Right side - Links and Auth Button */}
          <div className="flex items-center">
            <Link to="/" className="text-gray-800 mr-4">
              Home
            </Link>
            <Link to="/about" className="text-gray-800 mr-4">
              About
            </Link>
            
            {isAuthenticated ? (
              <button
                onClick={logout}
                disabled={isLoading}
                className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                }`}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={login}
                disabled={isLoading}
                className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
