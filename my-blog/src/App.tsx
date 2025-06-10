import { useEffect, useState } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import type { BlogPost } from './types';

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddOrUpdate = (post: { title: string; content: string }) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === editingPost.id ? { ...editingPost, ...post } : p)));
      setEditingPost(null);
    } else {
      const newPost: BlogPost = {
        id: Date.now(),
        ...post,
      };
      setPosts([...posts, newPost]);
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    if (editingPost?.id === id) setEditingPost(null);
  };

  return (
    <div className="container">
      <h1>📝 وبلاگ من</h1>
      <BlogForm onSubmit={handleAddOrUpdate} initialData={editingPost} />
      <BlogList posts={posts} onDelete={deletePost} onEdit={setEditingPost} />
    </div>
  );
}

export default App;