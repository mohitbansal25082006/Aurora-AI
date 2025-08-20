'use client';
import { useState, useRef } from 'react';
import { ResearchForm } from '@/components/dashboard/research-form';
import { ResultsDisplay } from '@/components/dashboard/results-display';
import { WorkspaceManager } from '@/components/dashboard/workspace-manager';
import { ResearchHistory } from '@/components/dashboard/research-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Workspace,
  ResearchSession,
  ResearchOptions as DbResearchOptions,
} from '@/lib/database';
import { createResearchSession } from '@/lib/database';

// Local ResearchOptions extends the DB type so it remains compatible
export type ResearchOptions = DbResearchOptions & {
  profile: string;
  sources: string[];
  dateRange: { from: string; to: string };
  location: string;
};

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

// Used only when saving to DB
interface DatabaseResearchResults {
  query: string;
  options: Record<string, unknown>;
  results: ResearchResult;
  [key: string]: unknown;
}

type ResearchStatus =
  | 'idle'
  | 'searching'
  | 'analyzing'
  | 'factChecking'
  | 'completed'
  | 'error';

export default function DashboardPage() {
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>('idle');
  const [researchResults, setResearchResults] = useState<ResearchResult>();
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();
  const [activeTab, setActiveTab] = useState('research');
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setActiveTab('research');
  };

  const handleSessionSelect = (session: ResearchSession) => {
    const dbResult = session.results as unknown as DatabaseResearchResults;
    setResearchResults(dbResult.results);
    setResearchStatus('completed');
    setActiveTab('research');
  };

  /**
   * Keep the handler synchronous (returns void) to match ResearchForm's onResearch prop.
   * Use `unknown` for the incoming options to avoid `any` and then validate before casting.
   */
  const handleResearch = (query: string, options: unknown): void => {
    (async () => {
      if (!selectedWorkspace) {
        toast.error('Please select a workspace first');
        return;
      }
      // Basic runtime validation: ensure options is an object
      if (typeof options !== 'object' || options === null) {
        toast.error('Invalid research options provided');
        return;
      }
      // Safe cast after runtime check
      const opts = options as ResearchOptions;
      // Clear existing timeouts and abort any ongoing request
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setResearchStatus('searching');
      setResearchResults(undefined);
      toast.success(`Research started: "${query}"`);
      try {
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, options: opts }),
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Research request failed with status: ${response.status}`);
        }
        // Simulated status progression
        timeoutRef.current.push(setTimeout(() => setResearchStatus('analyzing'), 1000));
        timeoutRef.current.push(
          setTimeout(() => setResearchStatus('factChecking'), 2000)
        );
        const data: ApiResponse = await response.json();
        const entitiesWithConnections = data.entities.map((entity: ApiEntity) => ({
          ...entity,
          connections: Math.floor(Math.random() * 15) + 1,
        }));
        const results: ResearchResult = {
          ...data,
          entities: entitiesWithConnections,
        };
        // Clear timeouts before finishing
        timeoutRef.current.forEach(clearTimeout);
        timeoutRef.current = [];
        abortControllerRef.current = null;
        setResearchResults(results);
        setResearchStatus('completed');
        // Save to DB
        const dbResult: DatabaseResearchResults = {
          query,
          // cast through unknown to satisfy TS strictness
          options: opts as unknown as Record<string, unknown>,
          results,
        };
        // createResearchSession expects DbResearchOptions for the options param
        await createResearchSession(
          selectedWorkspace.id,
          query,
          opts as unknown as DbResearchOptions,
          dbResult as unknown as Parameters<typeof createResearchSession>[3]
        );
        toast.success('Research completed and saved!');
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Research request aborted');
          return;
        }
        console.error('Research error:', error);
        timeoutRef.current.forEach(clearTimeout);
        timeoutRef.current = [];
        abortControllerRef.current = null;
        setResearchStatus('error');
        toast.error('Failed to complete research. Please try again.');
      }
    })();
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Research Dashboard</h1>
        <p className="text-gray-400">
          {selectedWorkspace
            ? `Workspace: ${selectedWorkspace.name}`
            : 'Select a workspace to get started'}
        </p>
      </div>
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="research" className="data-[state=active]:bg-gray-700">
              Research
            </TabsTrigger>
            <TabsTrigger value="workspaces" className="data-[state=active]:bg-gray-700">
              Workspaces
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gray-700">
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="research" className="space-y-6">
            {selectedWorkspace ? (
              <>
                <ResearchForm onResearch={handleResearch} />
                <ResultsDisplay status={researchStatus} results={researchResults} />
              </>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No Workspace Selected</h3>
                  <p className="text-gray-400 mb-4">
                    Please select a workspace to start researching
                  </p>
                  <Button onClick={() => setActiveTab('workspaces')}>Go to Workspaces</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="workspaces">
            <WorkspaceManager
              onWorkspaceSelect={handleWorkspaceSelect}
              selectedWorkspaceId={selectedWorkspace?.id}
            />
          </TabsContent>
          <TabsContent value="history">
            {selectedWorkspace ? (
              <ResearchHistory
                workspaceId={selectedWorkspace.id}
                onSessionSelect={handleSessionSelect}
              />
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No Workspace Selected</h3>
                  <p className="text-gray-400 mb-4">
                    Please select a workspace to view research history
                  </p>
                  <Button onClick={() => setActiveTab('workspaces')}>Go to Workspaces</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}