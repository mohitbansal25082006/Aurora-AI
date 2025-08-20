'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  Clock,
  Eye,
  Trash2
} from 'lucide-react';
import { ResearchSession, getResearchSessions, deleteResearchSession, ResearchOptions } from '@/lib/database';
import { toast } from 'sonner';

interface ResearchHistoryProps {
  workspaceId: string;
  onSessionSelect: (session: ResearchSession) => void;
}

export function ResearchHistory({ workspaceId, onSessionSelect }: ResearchHistoryProps) {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getResearchSessions(workspaceId);
      setSessions(data as ResearchSession[]);
    } catch (error) {
      console.error('Error loading research sessions:', error);
      toast.error('Failed to load research history');
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleDeleteSession = async (id: string) => {
    try {
      await deleteResearchSession(id);
      setSessions(sessions.filter(s => s.id !== id));
      toast.success('Research session deleted');
    } catch (error) {
      console.error('Error deleting research session:', error);
      toast.error('Failed to delete research session');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading research history...</div>;
  }

  if (sessions.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No research sessions yet</h3>
          <p className="mt-2 text-gray-400">Start a new research to see it here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Research History</h2>
      <div className="space-y-3">
        {sessions.map((session) => {
          // Safely access options properties with type guards
          const options = session.options as ResearchOptions;
          const sources = Array.isArray(options?.sources) ? options.sources : [];
          const profile = typeof options?.profile === 'string' ? options.profile : 'default';

          return (
            <Card key={session.id} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{session.query}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(session.created_at).toLocaleTimeString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSessionSelect(session)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-gray-700">
                    {profile} profile
                  </Badge>
                  {sources.map((source: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-gray-700">
                      {source}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}