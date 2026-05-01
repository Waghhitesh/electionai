'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

export default function ChatAssistant() {
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !address) return;
    
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://electionai-307568988123.us-central1.run.app';
      const res = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query, address: address })
      });

      if (res.status === 429) {
        setError('Too many requests. Please try again later.');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('An error occurred while fetching the response. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="assistant-heading" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl mx-auto mt-8">
      <header className="flex justify-between items-center mb-6">
        <h2 id="assistant-heading" className="text-2xl font-bold text-gray-800 dark:text-white">Ask the Election Assistant</h2>
        {(response || query || address) && (
          <button 
            onClick={() => { setQuery(''); setAddress(''); setResponse(''); setError(''); }}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Clear all inputs and responses"
          >
            Clear All
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div role="group" aria-labelledby="location-label">
          <label id="location-label" htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Address (for local voting info)</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, State"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
            aria-required="true"
          />
        </div>
        <div role="group" aria-labelledby="query-label">
          <label id="query-label" htmlFor="query" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Question</label>
          <div className="relative">
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Where do I vote?"
              className="w-full p-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
              aria-required="true"
            />
            <button 
              type="submit" 
              disabled={loading}
              aria-label={loading ? "Sending question..." : "Send question"}
              className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      <div aria-live="assertive" className="mt-4">
        {error && (
          <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
      </div>

      <article aria-live="polite" className="mt-6">
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
          >
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Assistant Response</h3>
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 flex space-x-2 items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <span className="text-sm text-gray-500">Assistant is thinking...</span>
          </div>
        )}
      </article>
    </section>
  );
}
