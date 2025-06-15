import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import EditPost from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
