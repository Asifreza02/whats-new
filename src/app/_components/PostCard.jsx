'use client';
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PostCard({ post, onVote }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <p className="text-sm text-gray-500">{post.category}</p>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700">{post.summary}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onVote(post._id, "like")}>
            👍 {post.likes}
          </Button>
          <Button size="sm" onClick={() => onVote(post._id, "dislike")}>
            👎 {post.dislikes}
          </Button>
        </div>

        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Read →
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
