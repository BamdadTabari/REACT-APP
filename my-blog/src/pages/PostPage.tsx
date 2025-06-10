import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../types';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) {
      const posts: BlogPost[] = JSON.parse(saved);
      const found = posts.find((p) => p.id === Number(id));
      setPost(found || null);
    }
  }, [id]);

  if (!post) return <p>پست پیدا نشد</p>;

  return (
    <div className="container">
      <Link to="/">← بازگشت</Link>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostPage;
