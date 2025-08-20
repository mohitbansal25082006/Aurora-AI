'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface TimelineItem {
  date: string;
  event: string;
  description: string;
}

interface EnhancedTimelineProps {
  timeline: TimelineItem[];
}

export function EnhancedTimeline({ timeline }: EnhancedTimelineProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (date: string) => {
    setExpandedItem(expandedItem === date ? null : date);
  };

  // Sort timeline by date
  const sortedTimeline = [...timeline].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>
      <div className="space-y-4">
        {sortedTimeline.map((item, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < sortedTimeline.length - 1 && (
              <div className="absolute left-4 top-8 h-full w-0.5 bg-gray-700"></div>
            )}
            
            {/* Timeline dot */}
            <div className="flex items-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white z-10">
                {index + 1}
              </div>
              
              <div className="ml-4 flex-1">
                <div 
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-800 p-3 hover:bg-gray-700"
                  onClick={() => toggleExpand(item.date)}
                >
                  <div>
                    <p className="font-medium">{format(new Date(item.date), 'MMM dd, yyyy')}</p>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                  <div className="text-gray-400">
                    {expandedItem === item.date ? '▲' : '▼'}
                  </div>
                </div>
                
                {expandedItem === item.date && (
                  <div className="mt-2 rounded-lg bg-gray-800 p-3">
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}