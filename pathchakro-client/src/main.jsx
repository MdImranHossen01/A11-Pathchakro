import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router'; // Corrected import from 'react-router-dom'
import './index.css';
import router from './Routes/Router.jsx';

// Import the required providers
import AuthProvider from './providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create an instance of QueryClient for Tanstack Query
const queryClient = new QueryClient();

// The createRoot method is used to render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The providers must wrap the RouterProvider to make their context 
      available to all pages and components throughout the application.
    */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);