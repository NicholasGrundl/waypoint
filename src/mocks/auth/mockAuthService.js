// src/mocks/auth/mockAuthService.js
class MockAuthService {
    constructor() {
      this.currentUser = null;
      this.isAuthenticated = false;
    }
  
    setCurrentUser(user) {
      this.currentUser = user;
      this.isAuthenticated = !!user;
      if (user) {
        localStorage.setItem('mockAuthUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('mockAuthUser');
      }
    }
  
    getCurrentUser() {
      if (!this.currentUser) {
        const stored = localStorage.getItem('mockAuthUser');
        if (stored) {
          this.currentUser = JSON.parse(stored);
          this.isAuthenticated = true;
        }
      }
      return this.currentUser;
    }
  
    resetAuth() {
      this.setCurrentUser(null);
    }
  }
  
  export const mockAuth = new MockAuthService();
  