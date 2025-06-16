import { createContext, useContext, useEffect, useState } from 'react';
import type { BlogPost } from '../types';

interface BlogContextProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  fetchPosts: () => void;
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const fetchPosts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within BlogProvider");
  }
  return context;
};