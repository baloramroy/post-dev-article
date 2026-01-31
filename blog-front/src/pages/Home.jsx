import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState(null); // For modal

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts/latest');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setMessage('Failed to load posts');
      }
    };
    fetchPosts();
  }, []);

  const closeModal = () => setSelectedPost(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to <span className="text-indigo-400">Post Dev Article</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
            Read, write, and share meaningful stories with a modern blogging platform.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/create"
              className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Create Post
            </a>

            <a
              href="/categories"
              className="border border-gray-700 hover:border-indigo-500 transition px-8 py-3 rounded-xl font-semibold"
            >
              Browse Categories
            </a>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <a
            href="/posts"
            className="text-indigo-400 hover:text-indigo-300 transition text-sm"
          >
            View all →
          </a>
        </div>

        {message && <p className="text-red-400 mb-6">{message}</p>}

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <article
                key={post._id}
                className="group bg-white/5 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-indigo-500 transition"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-400 transition">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>By {post.author?.username || 'Unknown'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition"
                >
                  Read more →
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">{selectedPost.title}</h2>
            <p className="text-gray-300 whitespace-pre-line mb-4">{selectedPost.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>By {selectedPost.author?.username || 'Unknown'}</span>
              <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Post Dev Article — Built with MERN & Tailwind
      </footer>
    </div>
  );
}
