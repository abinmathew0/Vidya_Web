'use client';

import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    setLikes(likes + 1);
    // Add code here to persist the like count to the server
  };

  return (
    <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
      Like ({likes})
    </button>
  );
}
