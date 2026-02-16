import { motion } from "framer-motion";
import { useState } from "react";
import blogPosts from "./BlogData/BlogData";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

  const filteredPosts = blogPosts.filter((post) => {
    return (
      (category === "All" || post.category === category) &&
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3E2723]">AG Traders Blog</h1>
          <p className="text-gray-600 mt-3">
            Kitchen tips, product guides & traditional cooking knowledge
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-1/3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-1/4"
          >
            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Blog Grid */}
        {!selectedPost ? (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h2 className="text-xl font-semibold mt-2 text-[#3E2723]">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-3 text-sm">{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Single Blog View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-6 text-[#3E2723] font-semibold"
            >
              ← Back to Blogs
            </button>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-xl"
            />

            <h2 className="text-3xl font-bold mt-6 text-[#3E2723]">
              {selectedPost.title}
            </h2>

            <p className="text-gray-500 mt-2">{selectedPost.date}</p>

            <p className="text-gray-700 mt-6 leading-relaxed">
              {selectedPost.content}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
