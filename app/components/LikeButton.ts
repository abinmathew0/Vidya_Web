import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLikes(likes + 1);
    // You can also send this data to the server to persist it
  };

  return (
    <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
      Like ({likes})
    </button>
  );
}
