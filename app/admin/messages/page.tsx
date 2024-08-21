'use client';

import { useEffect, useState } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-lightCream">
      <h1 className="text-3xl font-extrabold text-darkRed mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded shadow">
              <h2 className="text-lg font-bold text-darkRed">{message.name}</h2>
              <p className="text-sm text-burntOrange">{message.email}</p>
              <p className="mt-2 text-darkRed">{message.message}</p>
              <p className="mt-2 text-xs text-gray-500">Received on: {new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-darkRed">No messages found.</p>
        )}
      </div>
    </div>
  );
}
