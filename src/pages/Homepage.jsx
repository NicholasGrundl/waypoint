// src/pages/HomePage.jsx
import { useAuth } from '../auth/hooks/useAuth';
import Navbar from '../components/Navbar';
import PublicView from '../components/public/PublicView';
import PrivateView from '../components/private/PrivateView';

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
      {isAuthenticated ? <PrivateView /> : <PublicView />}
    </div>
  );
};

export default HomePage;