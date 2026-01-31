
// -------- src/pages/Dashboard.jsx --------
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, checkAuth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); // For modal

  const fetchMyPosts = async () => {
    try {
      const res = await api.get("/posts/me/myposts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch posts.");
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    await checkAuth();
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const closeModal = () => setSelectedPost(null);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-400 font-medium">
        Please login
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">

      {/* CREATE POST CARD */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div>
            <h2 className="text-lg font-semibold text-gray-100 mb-1">
              Create a New Post
            </h2>
            <p className="text-gray-400 text-sm">
              Share your thoughts, stories, or ideas with the world.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/create"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md transition"
            >
              + Create
            </Link>

            <button
              onClick={handleLogout}
              className="border border-gray-600 hover:border-red-500 text-gray-100 text-sm px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* POSTS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">My Posts</h2>

        {message && <p className="text-red-400 mb-6">{message}</p>}

        {posts.length === 0 ? (
          <p className="text-gray-400">You haven't created any posts yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <article
                key={post._id}
                className="group bg-white/5 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-indigo-500 transition"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>By {post.author?.username || 'You'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition text-sm"
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
              <span>By {selectedPost.author?.username || 'You'}</span>
              <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


