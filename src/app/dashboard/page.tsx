'use client';

import { useState, useRef } from 'react';
import { ResearchForm } from '@/components/dashboard/research-form';
import { ResultsDisplay } from '@/components/dashboard/results-display';
import { toast } from 'sonner';

interface ResearchOptions {
  profile: string;
  sources: string[];
  dateRange: { from: string; to: string };
  location: string;
}

interface TimelineItem {
  date: string;
  event: string;
  description: string;
}

interface Entity {
  name: string;
  type: string;
  relevance: number;
  connections: number;
}

interface ResearchData {
  title: string;
  content: string;
  source: string;
  url?: string;
  date?: string;
}

interface Source {
  id: string;
  title: string;
  type: string;
  reliability: number;
  url: string;
}

interface ResearchResult {
  query: string;
  options: ResearchOptions;
  data: ResearchData[];
  summary: string;
  sources: Source[];
  timeline: TimelineItem[];
  entities: Entity[];
}

interface ApiEntity {
  name: string;
  type: string;
  relevance: number;
}

interface ApiResponse {
  query: string;
  options: ResearchOptions;
  data: ResearchData[];
  summary: string;
  sources: Source[];
  timeline: TimelineItem[];
  entities: ApiEntity[];
}

type ResearchStatus = 'idle' | 'searching' | 'analyzing' | 'factChecking' | 'completed' | 'error';

export default function DashboardPage() {
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>('idle');
  const [researchResults, setResearchResults] = useState<ResearchResult | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleResearch = async (query: string, options: ResearchOptions) => {
    // Clear any existing timeouts and abort previous requests
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setResearchStatus('searching');
    setResearchResults(undefined); // Clear previous results
    toast.success(`Research started: "${query}"`);
    
    try {
      console.log("Sending research request...");
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, options }),
        signal: controller.signal,
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Research request failed with status: ${response.status}`);
      }
      
      // Set up progress updates
      timeoutRef.current.push(setTimeout(() => setResearchStatus('analyzing'), 1000));
      timeoutRef.current.push(setTimeout(() => setResearchStatus('factChecking'), 2000));
      
      const data: ApiResponse = await response.json();
      console.log("API response data:", data);
      
      // Add connection counts to entities
      const entitiesWithConnections = data.entities.map((entity: ApiEntity) => ({
        ...entity,
        connections: Math.floor(Math.random() * 15) + 1
      }));
      
      console.log("Setting research results...");
      const results = {
        ...data,
        entities: entitiesWithConnections
      };
      
      // Clear timeouts before completing
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
      abortControllerRef.current = null;
      
      setResearchResults(results);
      setResearchStatus('completed');
      console.log("Research results set:", results);
      
      toast.success('Research completed successfully!');
    } catch (error: unknown) {
      // Ignore abort errors (user cancelled)
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Research request aborted');
        return;
      }
      
      console.error('Research error:', error);
      
      // Clear timeouts on error
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
      abortControllerRef.current = null;
      
      setResearchStatus('error');
      toast.error('Failed to complete research. Please try again.');
    }
  };

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    timeoutRef.current.forEach(clearTimeout);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Research Dashboard</h1>
        <p className="text-gray-400">Start a new research query or view previous results</p>
      </div>
      
      <div className="p-6">
        <ResearchForm 
          onResearch={handleResearch}
        />
        <ResultsDisplay status={researchStatus} results={researchResults} />
      </div>
    </div>
  );
}