import React from "react";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function CategoryPosts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get(`/posts/category/${id}`).then(res => setPosts(res.data));
  }, [id]);

  return (
    <div>
      <h1>Category Posts</h1>
      {posts.map(p => (
        <div key={p._id}>
          <Link to={`/post/${p._id}`}>
            <h3>{p.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}