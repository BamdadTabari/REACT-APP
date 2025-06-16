import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogForm, { type BlogPostInput } from "../components/BlogForm";
import type { BlogPost } from "../types";


export default function EditPost(){
    const {id} =useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
          .then(res => res.json())
          .then(data => setPost(data));
      }, [id]);

      const handleUpdate = (updatedPost: BlogPostInput) => {
        fetch(`http://localhost:3001/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }).then(() => navigate("/"));
      };

      return post ? <BlogForm onSubmit={handleUpdate} initialData={post} /> : <p>در حال بارگذاری...</p>;
}