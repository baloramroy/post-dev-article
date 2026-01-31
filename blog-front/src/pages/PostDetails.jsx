import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">Loading post...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">
        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* Post Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
          <p>
            Author:{' '}
            <Link 
              to={`/author/${post.author._id}`} 
              className="text-blue-600 hover:underline"
            >
              {post.author.username}
            </Link>
          </p>
          <p>Category: <span className="font-medium">{post.category.name}</span></p>
          <p>Views: {post.views}</p>
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none text-gray-700 mb-8">
          {post.content}
        </div>

        {/* Back Button */}
        <Link 
          to="/dashboard" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
