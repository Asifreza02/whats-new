'use client';
import React, { useState } from 'react';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';

export default function PostsList({ posts, onVote }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No posts available right now.
      </p>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <PostCard key={post._id} post={post} onVote={onVote} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="outline"
          >
            ← Previous
          </Button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}
