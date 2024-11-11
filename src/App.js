import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;