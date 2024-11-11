// src/pages/HomePage.jsx
import { useAuth } from '../auth/hooks/useAuth';
import Navbar from '../components/Navbar';
import PublicView from '../components/public/PublicView';

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isAuthenticated ? (
        <div>Private view will go here</div>
      ) : (
        <PublicView />
      )}
    </div>
  );
};

export default HomePage;