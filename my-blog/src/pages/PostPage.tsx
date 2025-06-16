import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../types';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("پست پیدا نشد");
        }
        return res.json();
      })
      .then(data => setPost(data))
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>در حال بارگذاری...</p>;

  return (
    <div className="container">
      <Link to="/">← بازگشت</Link>
      <h2>{post.title}</h2>
      {post.image?.startsWith("data:image") && (
        <img
          src={post.image}
          alt={post.title}
          style={{ maxWidth: '100%', marginBottom: '1rem' }}
        />
      )}

      <p>{post.content}</p>
      {post.category && <p><em>دسته‌بندی: {post.category}</em></p>}
    </div>
  );
}

export default PostPage;
