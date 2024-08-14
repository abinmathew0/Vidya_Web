'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send to an API or email service)
    console.log('Message sent:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-lightCream">
      <main className="flex-grow flex flex-col justify-center items-center text-center p-8 pt-24">
        <h1 className="text-5xl font-extrabold text-darkRed mb-6">Contact Me</h1>
        <p className="text-lg text-burntOrange max-w-3xl mb-6">
          I'd love to hear from you! Whether you have a question, a project in mind, or just want to connect, feel free to reach out using the form below.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-darkRed text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-darkRed text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-darkRed text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange">
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}
