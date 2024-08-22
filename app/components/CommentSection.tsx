'use client';

import { useState } from 'react';

interface CommentSectionProps {
  comments: { id: string; text: string; author: string }[];
  onCommentSubmit: (comment: string) => void;
}

export default function CommentSection({ comments, onCommentSubmit }: CommentSectionProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit(comment);
      setComment('');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Comments</h3>
      <ul className="mb-4">
        {comments.map((comment) => (
          <li key={comment.id} className="mb-2">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Comment
        </button>
      </form>
    </div>
  );
}
