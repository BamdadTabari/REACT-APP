import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onDelete: (id: number) => void;
  onEdit: (post: BlogPost) => void;
}

function BlogList({ posts, onDelete, onEdit }: BlogListProps) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <Link to={`/post/${post.id}`}><h2>{post.title}</h2></Link>
          <p>{post.content}</p>
          {post.category && <small style={{ color: '#999' }}>دسته‌بندی: {post.category}</small>}
          <button onClick={() => onEdit(post)}>✏️ ویرایش</button>
          <button onClick={() => onDelete(post.id)}>🗑️ حذف</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
