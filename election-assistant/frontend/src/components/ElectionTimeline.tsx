'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { id: 1, date: 'Oct 5, 2026', title: 'Voter Registration Deadline', description: 'Last day to register to vote for the upcoming general election.' },
  { id: 2, date: 'Oct 20, 2026', title: 'Early Voting Begins', description: 'Early voting locations open for the 2026 midterms.' },
  { id: 3, date: 'Nov 3, 2026', title: 'Election Day', description: 'Polls are open from 7:00 AM to 8:00 PM for the 2026 general election.' }
];

export default function ElectionTimeline() {
  return (
    <section className="py-12" aria-labelledby="timeline-heading">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="glass-card p-8 rounded-3xl group relative overflow-hidden transition-all duration-300"
            tabIndex={0}
            role="article"
            aria-label={`${event.title} on ${event.date}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="text-6xl font-black text-blue-600 italic">0{index + 1}</div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30">
                {event.date}
              </div>
              <h3 className="font-black text-2xl text-gray-900 dark:text-white leading-tight">{event.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{event.description}</p>
            </div>
            
            <div className="mt-6 w-12 h-1 bg-blue-600/20 group-hover:w-full transition-all duration-500 rounded-full overflow-hidden">
              <div className="w-0 group-hover:w-full h-full bg-blue-600 transition-all duration-700"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
