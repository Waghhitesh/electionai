import React from 'react';
import ElectionTimeline from '@/components/ElectionTimeline';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Election Process Education Assistant',
  description: 'An enterprise-grade Election Process Education Assistant with integrated RAG pipeline.',
};

export default function Home() {
  return (
    <div className="min-h-screen transition-colors">
      <header className="glass-card sticky top-0 z-50 py-4 px-6 border-b border-white/20 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-lg">E</div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
              ELECTION<span className="text-blue-600">AI</span>
            </h1>
          </div>
          <nav aria-label="Main Navigation">
            <ul className="flex space-x-8">
              <li><a href="#timeline" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-all uppercase tracking-widest">Timeline</a></li>
              <li><a href="#assistant" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-all uppercase tracking-widest">Assistant</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest animate-float">
            Next-Gen Civic Intelligence
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
            Empowering Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Democratic Voice</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Instant, verified information about your local election process. Powered by real-time civic data and advanced AI.
          </p>
          <div className="pt-8">
            <a href="#assistant" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 inline-block">
              Start Your Consultation
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="timeline" className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Key Milestones</h3>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Election Roadmap</h2>
          </div>
          <ElectionTimeline />
        </section>

        <section id="assistant" className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Interactive Assistant</h3>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Ask Anything</h2>
          </div>
          <ChatAssistant />
        </section>
      </main>
      
      <footer className="glass-card mt-32 py-16 px-6 border-t border-white/20 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex items-center space-x-2 opacity-50">
            <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center font-black text-white text-xs">E</div>
            <h1 className="text-lg font-black text-gray-500 tracking-tighter">
              ELECTION<span className="text-gray-400">AI</span>
            </h1>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} AI Election Education. Verified Civic Data Source.
          </div>
        </div>
      </footer>
    </div>
  );
}
