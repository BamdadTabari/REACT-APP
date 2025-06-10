import { useEffect, useState } from 'react';
import type { BlogPost } from '../types';

interface BlogFormProps {
  onSubmit: (post: { title: string; content: string , category?: string}) => void;
  initialData: BlogPost | null;
}

function BlogForm({ onSubmit, initialData }: BlogFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit({ title, content, category });
      setTitle('');
      setContent('');
      setCategory('')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="عنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="دسته‌بندی (اختیاری)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="محتوا"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        {initialData ? 'ویرایش پست' : 'افزودن پست'}
      </button>
    </form>
  );
}

export default BlogForm;