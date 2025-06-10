import { useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import type { BlogPost } from '../types';
import { useBlog } from '../context/BlogContext';

function Home() {
  const { posts, setPosts, fetchPosts } = useBlog();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrUpdate = async (data: { title: string; content: string; category?: string }) => {
    if (editingPost) {
      const updated = { ...editingPost, ...data };
      await fetch(`http://localhost:3001/posts/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      setPosts(posts.map(p => (p.id === editingPost.id ? updated : p)));
      setEditingPost(null);
    } else {
      const newPost: BlogPost = { id: Date.now(), ...data };
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const result = await res.json();
      setPosts([...posts, result]);
    }
  };

  const deletePost = async (id: number) => {
    await fetch(`http://localhost:3001/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter(p => p.id !== id));
    if (editingPost?.id === id) setEditingPost(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📝 وبلاگ من</h1>
      <input
        type="text"
        placeholder="جستجو در پست‌ها..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <p>تعداد پست‌ها: {filteredPosts.length}</p>
      <BlogForm onSubmit={handleAddOrUpdate} initialData={editingPost} />
      <BlogList posts={filteredPosts} onDelete={deletePost} onEdit={setEditingPost} />
    </div>
  );
}

export default Home;