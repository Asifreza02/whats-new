'use client';
import React, { useEffect, useState } from 'react';
import PostsList from '@/app/_components/PostsList';

export default function TrendingPage() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => setTrending(data.posts || []));
  }, []);

  const handleVote = async (id, type) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });
    setTrending(prev =>
      prev.map(p =>
        p._id === id
          ? { ...p, [type === 'like' ? 'likes' : 'dislikes']: p[type === 'like' ? 'likes' : 'dislikes'] + 1 }
          : p
      )
    );
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">🔥 Trending This Week</h1>
      <PostsList posts={trending} onVote={handleVote} />
    </main>
  );
}
