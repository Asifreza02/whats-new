'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PostCard from '@/app/_components/PostCard';
import { SkeletonCard } from '@/app/_components/SkeletonCard';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const ALL_CATEGORIES = [
  'Technology', 'Sports', 'Finance', 'Politics', 'Health', 'Science',
  'Entertainment', 'Business', 'World', 'Education', 'Environment', 'Travel',
  'Lifestyle', 'Food', 'Culture', 'History',
];

const MAIN_CATEGORIES = [
  'Technology', 'Sports', 'Finance', 'Politics', 'Health', 'Science',
];

const POSTS_PER_PAGE = 20;

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = ALL_CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mainCategories = filteredCategories.filter(cat =>
    MAIN_CATEGORIES.includes(cat)
  );

  const moreCategories = filteredCategories.filter(
    cat => !MAIN_CATEGORIES.includes(cat)
  );

  const fetchCategoryNews = async (category) => {
    setLoading(true);
    try {
      const url = category === 'All Categories' ? '/api/news' : `/api/news?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setNews(data.posts || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(`❌ Failed to fetch ${category} news:`, err);
      setNews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryNews(selectedCategory);
  }, [selectedCategory]);

  const handleVote = async (id, type) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });

    setNews(prev =>
      prev.map(n =>
        n._id === id
          ? { ...n, [type === 'like' ? 'likes' : 'dislikes']: n[type === 'like' ? 'likes' : 'dislikes'] + 1 }
          : n
      )
    );
  };

  const totalPages = Math.ceil(news.length / POSTS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Explore News</h1>
        <p className="text-lg text-gray-600 mb-4">
          Select a category to see the latest news
        </p>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-center">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-56 text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {/* All Categories button */}
        <Button
          key="All Categories"
          variant={selectedCategory === 'All Categories' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('All Categories')}
        >
          All Categories
        </Button>

        {/* Main categories */}
        {mainCategories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}

        {/* More dropdown */}
        {moreCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">More...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {moreCategories.map(cat => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : paginatedNews.map(post => (
              <PostCard key={post._id} post={post} onVote={handleVote} />
            ))
        }
      </div>

      {/* Pagination */}
      {!loading && news.length > POSTS_PER_PAGE && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center gap-1 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}
