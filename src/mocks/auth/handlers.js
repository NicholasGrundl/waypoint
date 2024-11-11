// src/mocks/auth/handlers.js
import { http, HttpResponse } from 'msw';
import { mockAuth } from './mockAuthService';
import { mockUsers } from './mockUsers';


export const handlers = [
  // Login endpoint
  http.post('/auth/login', async () => {
    // In dev, always login as first test user
    const user = mockUsers[0];
    mockAuth.setCurrentUser(user);
    
    return HttpResponse.json(user);
  }),

  // Logout endpoint
  http.post('/auth/logout', () => {
    mockAuth.resetAuth();
    return new HttpResponse(null, { status: 200 });
  }),

  // Get current user endpoint
  http.get('/auth/principal', () => {
    const user = mockAuth.getCurrentUser();
    
    if (!user) {
      return new HttpResponse(null, { status: 401 });
    }
    
    return HttpResponse.json(user);
  })
];
