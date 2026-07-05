'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { type Locale } from '@/lib/i18n/config';

interface CommentFormProps {
  lang: Locale;
}

export default function CommentForm({ lang }: CommentFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit comment');
        return;
      }

      setSuccess(true);
      setName('');
      setMessage('');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          Comment submitted successfully!
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your message here..."
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {message.length}/500 characters
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
