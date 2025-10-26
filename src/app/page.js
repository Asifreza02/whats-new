'use client';
import { useEffect, useState } from "react";
import PostCard from "./_components/PostCard";
import { SkeletonCard } from "./_components/SkeletonCard";

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => {
        setNews(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleVote = async (id, type) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });

    setNews(prev =>
      prev.map(n =>
        n._id === id
          ? { ...n, [type === "like" ? "likes" : "dislikes"]: n[type === "like" ? "likes" : "dislikes"] + 1 }
          : n
      )
    );
  };

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">What's NEW</h1>
        <h4 className="text-lg text-gray-600 mb-4">
          Stay updated with the latest news from around the globe
        </h4>
        <div className="text-sm text-gray-500 mb-1">
          Don't you wanna know what happened in the last 10 minutes?
        </div>
        <div className="text-gray-700 text-md flex flex-col md:flex-row justify-center items-center gap-1 md:gap-3 animate-pulse">
          <span>🔄 Don't worry, we'll keep you updated!</span>
          <span>By searching the web for you 🤩</span>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          : news.map(post => <PostCard key={post._id} post={post} onVote={handleVote} />)
        }
      </div>
    </main>
  );
}
