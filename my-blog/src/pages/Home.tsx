import { useEffect, useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import type { BlogPost } from '../types';

function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm , setSearchTerm] = useState('')

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

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )


  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  }

  return (
    <div className="container">
      <h1>📝 وبلاگ من</h1>
      <button onClick={toggleDarkMode} style={{ marginBottom: '1rem' }}>
        🌙 تغییر تم
     </button>
      <input
        type="text"
        placeholder="جستجو در عنوان یا محتوا..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        />

      <BlogForm onSubmit={handleAddOrUpdate} initialData={editingPost} />
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        تعداد پست‌ها: {filteredPosts.length}
     </p>
      <BlogList posts={filteredPosts} onDelete={deletePost} onEdit={setEditingPost} />
    </div>
  );
}

export default Home;
