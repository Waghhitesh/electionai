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

      if (!res.ok) throw new Error('Failed to fetch response');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setResponse(prev => prev + chunk);
      }
    } catch (err) {
      setError('An error occurred while fetching the response. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="assistant-heading" className="glass-card rounded-2xl p-8 max-w-3xl mx-auto mt-12 transition-all duration-300">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 id="assistant-heading" className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">AI Election Assistant</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Google Gemini 2.0</p>
          </div>
        </div>
        {(response || query || address) && (
          <button 
            onClick={() => { setQuery(''); setAddress(''); setResponse(''); setError(''); }}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            aria-label="Clear all inputs and responses"
          >
            Clear Thread
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div role="group" aria-labelledby="location-label" className="relative group">
          <label id="location-label" htmlFor="address" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Verification Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 1600 Pennsylvania Ave NW, Washington, DC"
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
            required
            aria-required="true"
          />
        </div>
        
        <div role="group" aria-labelledby="query-label" className="relative group">
          <label id="query-label" htmlFor="query" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Your Question</label>
          <div className="relative flex items-center">
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How do I register to vote in this area?"
              className="w-full p-4 pr-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all group-hover:border-gray-300 dark:group-hover:border-gray-600"
              required
              aria-required="true"
            />
            <button 
              type="submit" 
              disabled={loading}
              aria-label={loading ? "Processing..." : "Send Question"}
              className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-500/40 disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      <div aria-live="assertive" className="mt-4">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="alert" 
            className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 font-medium text-sm"
          >
            {error}
          </motion.div>
        )}
      </div>

      <article aria-live="polite" className="mt-8">
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Official Guidance</h3>
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-lg font-medium mb-6">
              {response}
            </div>
            
            {/* Direct Google Maps Integration */}
            <div className="flex pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
              <a 
                href={`https://www.google.com/maps/search/polling+locations+near+${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/maps_48dp.png" alt="Google Maps" className="w-4 h-4" />
                <span>View Polling Sites on Google Maps</span>
              </a>
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="p-8 flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-2">
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-3 h-3 bg-blue-600 rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }} 
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                className="w-3 h-3 bg-blue-600 rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }} 
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                className="w-3 h-3 bg-blue-600 rounded-full" 
              />
            </div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Consulting Civic Data...</span>
          </div>
        )}
      </article>
    </section>
  );
}
