'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Calendar, 
  Clock,
  Eye,
  Trash2,
  Search
} from 'lucide-react';
import { ResearchSession } from '@/lib/database';
import { getResearchSessions, deleteResearchSession } from '@/lib/database';
import { toast } from 'sonner';
import Link from 'next/link';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would get the workspace ID from context or URL
      const data = await getResearchSessions('default-workspace-id');
      setSessions(data);
    } catch (error) {
      console.error('Error loading research sessions:', error);
      toast.error('Failed to load research history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await deleteResearchSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      toast.success('Research session deleted');
    } catch (error) {
      console.error('Error deleting research session:', error);
      toast.error('Failed to delete research session');
    }
  };

  /**
   * Safely convert unknown values to a short string suitable for rendering.
   * Uses `unknown` instead of `any` to satisfy eslint/@typescript-eslint/no-explicit-any.
   */
  const safeToString = (v: unknown): string => {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string') return v;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) {
      return v.map(item => safeToString(item)).join(', ');
    }
    if (typeof v === 'object') {
      try {
        const json = JSON.stringify(v);
        if (json.length > 200) return json.slice(0, 197) + '...';
        return json;
      } catch {
        return String(v);
      }
    }
    return String(v);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions = sessions.filter(session => {
    const q = (session.query || '').toLowerCase();
    const matchesSearch = q.includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || session.options?.profile === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading research history...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="border-b border-gray-800 bg-gray-900 p-6">
          <h1 className="text-2xl font-bold">Research History</h1>
          <p className="text-gray-400">View your previous research sessions</p>
        </div>

        <div className="p-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No research sessions yet</h3>
              <p className="mt-2 text-gray-400">Start a new research to see it here</p>
              <Link href="/dashboard/research">
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Start New Research
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Research History</h1>
        <p className="text-gray-400">View and manage your previous research sessions</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search research sessions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              All
            </Button>
            <Button
              variant={filter === 'Academic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('Academic')}
              className={filter === 'Academic' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              Academic
            </Button>
            <Button
              variant={filter === 'Journalist' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('Journalist')}
              className={filter === 'Journalist' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              Journalist
            </Button>
            <Button
              variant={filter === 'Analyst' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('Analyst')}
              className={filter === 'Analyst' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              Analyst
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No research sessions match your search criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredSessions.map((session) => (
              <Card key={session.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{safeToString(session.query) || 'Untitled'}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.created_at ? new Date(session.created_at).toLocaleDateString() : '-'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.created_at ? new Date(session.created_at).toLocaleTimeString() : '-'}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/history/${session.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
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
                      {safeToString(session.options?.profile) || 'Unknown'} profile
                    </Badge>
                    {session.options?.sources?.map((source: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-gray-700">
                        {safeToString(source)}
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-3 text-gray-300 line-clamp-2">
                    {safeToString(session.results?.[0]?.summary) || 'No summary available'}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
