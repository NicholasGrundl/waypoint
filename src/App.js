import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;