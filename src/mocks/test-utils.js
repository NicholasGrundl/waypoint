// src/mocks/test-utils.js
import { mockAuth } from './auth/mockAuthService';
import { mockUsers } from './auth/mockUsers';

export const mockAuthUtils = {
  // Login as a specific user
  loginAs: (email) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error(`No mock user with email: ${email}`);
    mockAuth.setCurrentUser(user);
    return user;
  },

  // Login as default test user
  login: () => {
    return mockAuthUtils.loginAs('test@example.com');
  },

  // Login as admin
  loginAsAdmin: () => {
    return mockAuthUtils.loginAs('admin@example.com');
  },

  // Logout
  logout: () => {
    mockAuth.resetAuth();
  },

  // Get current auth state
  getCurrentUser: () => {
    return mockAuth.getCurrentUser();
  },

  // Get all mock users (useful for testing)
  getAllUsers: () => {
    return [...mockUsers];
  }

};

// Example test usage:
/*
import { mockAuthUtils } from '../mocks/test-utils';

describe('Protected Component', () => {
  beforeEach(() => {
    mockAuthUtils.logout(); // Start each test logged out
  });

  test('shows content when logged in', () => {
    mockAuthUtils.login();
    // ... test component
  });

  test('redirects when logged out', () => {
    // ... test component
  });
});
*/