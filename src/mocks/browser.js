// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './auth/handlers';

export const worker = setupWorker(...handlers);
