import { useAuth } from '../auth/hooks/useAuth';
import Navbar from '../components/Navbar';

const AboutPage = () => {
    const { isAuthenticated, isLoading, user } = useAuth();
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }
  
    if (isAuthenticated) {
      return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <h1>About Me</h1>
          <p>My name is Nick Grundl and I am on a journey to build a web app for myself!</p>
          <div>You are authenticated</div>
          <p>User Email: {user.email}</p>
          <p>User Name: {user.name}</p>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <h1>About Me</h1>
          <p>My name is Nick Grundl and I am on a journey to build a web app for myself!</p>
          <div>You are not authenticated</div>
        </div>
      );
    }
  };
  
  export default AboutPage;