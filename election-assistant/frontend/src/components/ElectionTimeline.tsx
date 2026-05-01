'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { id: 1, date: 'Oct 15, 2024', title: 'Voter Registration Deadline', description: 'Last day to register to vote for the general election.' },
  { id: 2, date: 'Oct 25, 2024', title: 'Early Voting Begins', description: 'Early voting locations open across the state.' },
  { id: 3, date: 'Nov 5, 2024', title: 'Election Day', description: 'Polls are open from 7:00 AM to 8:00 PM.' }
];

export default function ElectionTimeline() {
  return (
    <section className="py-8" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Election Timeline</h2>
      <div className="space-y-6">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            tabIndex={0}
            role="article"
            aria-label={`${event.title} on ${event.date}`}
          >
            <div className="sm:w-32 font-semibold text-blue-600 dark:text-blue-400">
              {event.date}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
