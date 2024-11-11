// src/mocks/auth/handlers.js
import { http, HttpResponse } from 'msw';
import { mockAuth } from './mockAuthService';
import { mockUsers } from './mockUsers';

export const handlers = [
  // Login endpoint - simulate SSO flow
  http.get('/auth/login', async () => {
    // In dev, always login as first test user
    const user = mockUsers[0];
    mockAuth.setCurrentUser(user);
    
    // Return success with user data
    return HttpResponse.json(user, {
      status: 200
    });
  }),

  // Logout endpoint
  http.post('/auth/logout', () => {
    mockAuth.resetAuth();
    return new HttpResponse("Mocked: Logged out users", { status: 200 });
  }),

  // Get current user endpoint
  http.get('/auth/principal', () => {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      return new HttpResponse("Mocked: No User logged in", { status: 401 });
    }
    
    return HttpResponse.json(user);
  })
];
