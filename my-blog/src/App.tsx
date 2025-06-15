import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import ThemeToggle from './components/ThemeToggle';
import EditPost from './pages/EditPost';
import LoginPage from './pages/Login';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={(
            <RequireAuth>
              <Home />
            </RequireAuth>
          )}
        />
        <Route
          path="/post/:id"
          element={(
            <RequireAuth>
              <PostPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/edit/:id"
          element={(
            <RequireAuth>
              <EditPost />
            </RequireAuth>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

