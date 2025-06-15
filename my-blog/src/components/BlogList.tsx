import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onDelete: (id: number) => void;
}

function BlogList({ posts, onDelete }: BlogListProps) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <Link to={`/post/${post.id}`}><h2>{post.title}</h2></Link>
          <p>{post.content}</p>
          {post.category && <small style={{ color: '#999' }}>دسته‌بندی: {post.category}</small>}
          {post.image && (
            <img src={post.image} alt={post.title} style={{ maxWidth: '100%', marginBottom: '0.5rem' }} />
          )}
          <Link to={`/edit/${post.id}`}><h2>✏️ ویرایش</h2></Link>
          <button onClick={() => onDelete(post.id)}>🗑️ حذف</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
