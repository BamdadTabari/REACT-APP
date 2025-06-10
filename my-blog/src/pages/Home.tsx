import { useEffect, useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import type { BlogPost } from '../types';
import { data } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm , setSearchTerm] = useState('')

 useEffect(() => {
  fetch("http://localhost:3001/posts")
  .then( res => res.json())
  .then(data => setPosts(data));
}, []);

 const addPostToServer = async (post : BlogPost) =>{
    const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify(post),
    })
    const newPost = await res.json();
    setPosts(prev => [...prev, newPost]);
 }

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
    await addPostToServer(newPost);
  }
};

    const deletePost = async (id: number) => {
    await fetch(`http://localhost:3001/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter(p => p.id !== id));
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
