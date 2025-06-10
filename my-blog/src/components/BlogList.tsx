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
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => onEdit(post)}>✏️ ویرایش</button>
          <button onClick={() => onDelete(post.id)}>🗑️ حذف</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;