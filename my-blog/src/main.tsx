import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BlogProvider } from './context/BlogContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
