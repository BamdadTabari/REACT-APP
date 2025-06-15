import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { BlogPost } from '../types';

interface BlogFormProps {
  onSubmit: (post: BlogPostInput) => void;
  initialData: BlogPost | null;
}

export interface BlogPostInput {
  title: string;
  content: string;
  category: string; // 🔹 حالا اختیاری نیست، ولی مقدار پیش‌فرض می‌دیم
  image: string;
}

function BlogForm({ onSubmit, initialData }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BlogPostInput>({
    defaultValues: {
      title: '',
      content: '',
      category: '',
      image: '',
    }
  });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("category", initialData.category || '');
      setValue("image", initialData.image || '');
    }
  }, [initialData, setValue]);

  const image = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("image", base64 || '');
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: "عنوان الزامی است" })}
        placeholder="عنوان"
      />
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

      <textarea
        {...register("content", { required: "محتوا الزامی است" })}
        placeholder="محتوا"
      />
      {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}

      <input
        {...register("category")}
        placeholder="دسته‌بندی (اختیاری)"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && image.startsWith('data:image') && (
        <div style={{ marginTop: '1rem' }}>
          <img src={image} alt="preview" style={{ maxWidth: '200px', borderRadius: '6px' }} />
        </div>
      )}

      <button type="submit">
        {initialData ? 'ویرایش پست' : 'افزودن پست'}
      </button>
    </form>
  );
}

export default BlogForm;
