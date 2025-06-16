import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

describe('BlogForm', () => {
  it('calls onSubmit with form values', async () => {
    const handleSubmit = jest.fn();
    render(<BlogForm onSubmit={handleSubmit} initialData={null} />);

    await userEvent.type(screen.getByPlaceholderText('عنوان'), 'title');
    await userEvent.type(screen.getByPlaceholderText('محتوا'), 'content');
    await userEvent.type(screen.getByPlaceholderText('دسته‌بندی (اختیاری)'), 'cat');

    await userEvent.click(screen.getByRole('button', { name: /افزودن پست/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'title',
      content: 'content',
      category: 'cat',
      image: '',
    });
  });

  it('shows validation errors when required fields are missing', async () => {
    const handleSubmit = jest.fn();
    render(<BlogForm onSubmit={handleSubmit} initialData={null} />);

    await userEvent.click(screen.getByRole('button', { name: /افزودن پست/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('عنوان الزامی است')).toBeInTheDocument();
    expect(screen.getByText('محتوا الزامی است')).toBeInTheDocument();
  });
});
