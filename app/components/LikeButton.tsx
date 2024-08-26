import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface LikeButtonProps {
  articleId: string;
  initialLikes: number;
}

export default function LikeButton({ articleId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const { data: session } = useSession();

  const handleLike = async () => {
    if (!session) {
      alert('You need to be logged in to like an article');
      return;
    }

    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      } else {
        // Handle non-200 responses
        let errorMessage = 'Something went wrong. Please try again.';
        try {
          // Check if response has a body to parse
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (err) {
          // If parsing fails, default to a generic error message
          console.error('Error parsing response:', err);
        }
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Error sending like request:', err);
      alert('Failed to send like request. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLike}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Like ({likes})
    </button>
  );
}
