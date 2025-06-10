import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BlogProvider } from './context/BlogContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlogProvider>
      <App />
    </BlogProvider>
  </React.StrictMode>
);