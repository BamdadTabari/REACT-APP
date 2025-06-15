import { useState } from 'react';
import BlogForm, { type BlogPostInput } from '../components/BlogForm';
import BlogList from '../components/BlogList';
import type { BlogPost } from '../types';
import { useBlog } from '../context/BlogContext';

function Home() {
  const { posts, setPosts } = useBlog();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrUpdate = async (data: BlogPostInput) => {
    if (editingPost) {
      const updated: BlogPost = {
        ...editingPost,
        title: data.title,
        content: data.content,
        category: data.category || '',
        image: data.image || '',
      };

      await fetch(`http://localhost:3001/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      setPosts(posts.map(p => (p.id === editingPost.id ? updated : p)));
      setEditingPost(null);
    } else {
      const newPost: Omit<BlogPost, 'id'> = {
        title: data.title,
        content: data.content,
        category: data.category || '',
        image: data.image || '',
      };
      
      const res = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      
      const saved = await res.json(); // ✅ اینجا id واقعی از سرور گرفته می‌شه
      setPosts([...posts, saved]);
    }
  };

  const deletePost = async (id: number) => {
    const res = await fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPosts(posts.filter(p => p.id !== id));
      if (editingPost?.id === id) setEditingPost(null);
    } else {
      console.error('خطا در حذف پست');
    }
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

      <BlogList
        posts={filteredPosts}
        onDelete={deletePost}
        onEdit={setEditingPost}
      />
    </div>
  );
}

export default Home;
