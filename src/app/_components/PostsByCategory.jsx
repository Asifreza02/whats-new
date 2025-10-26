'use client';
import React, { useEffect, useState } from 'react';
import PostsList from './PostsList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PostsByCategory() {
  const [categories, setCategories] = useState([
    'Technology',
    'Sports',
    'Politics',
    'Finance',
    'Health',
    'Entertainment',
    'Science',
    'Education',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const [customCategory, setCustomCategory] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (category) => {
    try {
      const res = await fetch(`/api/news?category=${category}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching category posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  const handleVote = async (id, type) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, [type === 'like' ? 'likes' : 'dislikes']: p[type === 'like' ? 'likes' : 'dislikes'] + 1 }
          : p
      )
    );
  };

  const addCustomCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setSelectedCategory(customCategory);
      setCustomCategory('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🗂 Explore by Category</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <Input
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="Search or add category..."
          className="max-w-sm"
        />
        <Button onClick={addCustomCategory}>Add</Button>
      </div>

      <PostsList posts={posts} onVote={handleVote} />
    </div>
  );
}
