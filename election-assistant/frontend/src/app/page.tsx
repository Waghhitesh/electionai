import React from 'react';
import ElectionTimeline from '@/components/ElectionTimeline';
import ChatAssistant from '@/components/ChatAssistant';

export const metadata = {
  title: 'Election Process Education Assistant',
  description: 'An enterprise-grade Election Process Education Assistant with integrated RAG pipeline.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Election Assistant
          </h1>
          <nav aria-label="Main Navigation">
            <ul className="flex space-x-6">
              <li><a href="#timeline" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Timeline</a></li>
              <li><a href="#assistant" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Assistant</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Your Guide to the <span className="text-blue-600 dark:text-blue-400">Election Process</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get factual, verified information about election dates, polling locations, and voting requirements.
          </p>
        </section>

        <div id="timeline">
          <ElectionTimeline />
        </div>

        <div id="assistant">
          <ChatAssistant />
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Election Education Assistant. Built for informational purposes.
        </div>
      </footer>
    </div>
  );
}
