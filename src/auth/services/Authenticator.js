// AuthError class for specific error handling
class AuthError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'AuthError';
      this.status = status;
    }
  }
  
  class Authenticator {
    constructor(rootPath) {
      this.rootPath = rootPath;
      this.loginPath = '/auth/login/google';
    }
  
    async login() {
      try {
        const response = await fetch(this.loginPath);
        if (!response.ok) {
          throw new AuthError('Login failed', response.status);
        }
        
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to homepage after successful login
        window.location.replace(this.rootPath);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  
    async logout() {
      try {
        // First try to contact the server
        const response = await fetch('/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new AuthError('Server logout failed', response.status);
        }
        
        // Only clear local storage after successful server logout
        localStorage.removeItem('user');
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        // If it's a network error, we should still clear local state
        if (!window.navigator.onLine) {
          localStorage.removeItem('user');
          return true;
        }
        throw error;
      }
    }
  
    async checkAuth() {
      try {
        const response = await fetch('/auth/principal');
        if (!response.ok) {
          throw new AuthError('Auth check failed', response.status);
        }
        
        const data = await response.json();
        
        if (Object.keys(data).length === 0) {
          localStorage.removeItem('user');
          return false;
        }
        
        localStorage.setItem('user', JSON.stringify(data));
        return true;
      } catch (error) {
        if (error instanceof AuthError) {
          throw error;
        }
        // Handle network errors specifically
        if (!window.navigator.onLine) {
          throw new AuthError('Network connection lost', 0);
        }
        throw new AuthError('Authentication check failed', 500);
      }
    }
  
    hasIdentity() {
      const data = localStorage.getItem('user');
      return data !== null && data !== undefined;
    }
  
    async getIdentity() {
      try {
        const data = localStorage.getItem('user');
        if (data) {
          return JSON.parse(data);
        }
        
        const hasLogin = await this.checkAuth();
        if (!hasLogin) {
          throw new AuthError('No user is currently logged in', 401);
        }
        
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new AuthError('User data not found', 404);
        }
        
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error getting identity:', error);
        throw error;
      }
    }
  }
  
  export {
    Authenticator,
    AuthError
  };
