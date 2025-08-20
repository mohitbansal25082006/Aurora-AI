'use client';
import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { KnowledgeGraph } from './knowledge-graph';
import { EnhancedTimeline } from './enhanced-timeline';
import { exportToPDF, exportToMarkdown } from '@/lib/export';
import { 
  FileText, 
  Network, 
  BarChart3, 
  Download,
  Share,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';

interface Source {
  title: string;
  url: string;
  reliability: number;
}

interface TimelineEvent {
  date: string;
  event: string;
  description?: string;
}

interface Entity {
  name: string;
  type: string;
  connections: number;
  relevance?: number;
}

interface ResearchResults {
  summary: string;
  sources: Source[];
  timeline: TimelineEvent[];
  entities: Entity[];
  query?: string;
}

// Define types that match what export functions expect
interface TimelineItem {
  date: string;
  event: string;
  description: string; // Required, not optional
}

interface ExportEntity {
  name: string;
  type: string;
  relevance: number; // Required, not optional
  connections: number;
}

interface ExportSource {
  id: string;
  title: string;
  type: string;
  reliability: number;
  url: string;
}

interface ResearchData {
  query: string;
  summary: string;
  sources: ExportSource[];
  timeline: TimelineItem[];
  entities: ExportEntity[];
}

const researchStatus = {
  idle: { icon: Clock, color: 'text-gray-400', text: 'Ready to research' },
  searching: { icon: RefreshCw, color: 'text-blue-400', text: 'Searching sources' },
  analyzing: { icon: BarChart3, color: 'text-purple-400', text: 'Analyzing data' },
  factChecking: { icon: CheckCircle, color: 'text-green-400', text: 'Fact-checking' },
  completed: { icon: CheckCircle, color: 'text-green-400', text: 'Research completed' },
  error: { icon: AlertCircle, color: 'text-red-400', text: 'Error occurred' }
};

export function ResultsDisplay({ status, results }: { status: keyof typeof researchStatus; results?: ResearchResults }) {
  const [progress, setProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const currentStatus = researchStatus[status];
  const StatusIcon = currentStatus.icon;
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Handle progress updates
  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (status !== 'idle' && status !== 'completed' && status !== 'error') {
      progressInterval.current = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 100));
      }, 500);
    } else if (status === 'completed') {
      setProgress(100);
    } else if (status === 'error') {
      setProgress(0);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [status]);

  const handleExportPDF = async () => {
    if (!results) return;
    setIsExporting(true);
    try {
      const success = await exportToPDF('research-results-container');
      if (success) {
        alert('PDF exported successfully!');
      } else {
        alert('Failed to export PDF');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportMarkdown = () => {
    if (!results) return;
    try {
      // Transform the data to match the expected types for exportToMarkdown
      const exportData: ResearchData = {
        query: results.query || 'Research Results',
        summary: results.summary,
        sources: results.sources.map((source, index) => ({
          id: `source-${index}`,
          title: source.title,
          type: 'web',
          reliability: source.reliability,
          url: source.url
        })),
        timeline: results.timeline.map(item => ({
          date: item.date,
          event: item.event,
          description: item.description || '' // Ensure description is always a string
        })),
        entities: results.entities.map(entity => ({
          name: entity.name,
          type: entity.type,
          relevance: entity.relevance || 0.5, // Ensure relevance is always a number
          connections: entity.connections
        }))
      };
      
      const success = exportToMarkdown(exportData);
      if (success) {
        alert('Markdown exported successfully!');
      } else {
        alert('Failed to export Markdown');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export Markdown');
    }
  };

  // Transform timeline data to match EnhancedTimeline expectations
  const transformedTimeline = results?.timeline?.map(item => ({
    date: item.date,
    event: item.event,
    description: item.description || '' // Ensure description is always a string
  })) || [];

  // Transform entities data to match KnowledgeGraph expectations
  const transformedEntities = results?.entities?.map(entity => ({
    name: entity.name,
    type: entity.type,
    connections: entity.connections,
    relevance: entity.relevance || 0.5 // Ensure relevance is always a number
  })) || [];

  return (
    <div id="research-results-container" className="mt-6 space-y-6">
      {/* Status Bar */}
      <Card className="bg-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon className={`h-5 w-5 ${currentStatus.color}`} />
              <span className="font-medium">{currentStatus.text}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-48" />
              <span className="text-sm text-gray-400">{progress}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Error State */}
      {status === 'error' && (
        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-400">Research failed</span>
            </div>
            <p className="mt-2 text-gray-300">An error occurred during research. Please try again.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 border-red-800 text-red-400"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Results Tabs */}
      {(status === 'completed' || results) && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="summary" className="data-[state=active]:bg-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-gray-700">
              <Network className="mr-2 h-4 w-4" />
              Sources
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-gray-700">
              <Clock className="mr-2 h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="graph" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="mr-2 h-4 w-4" />
              Graph
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-gray-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Research Summary</CardTitle>
                <CardDescription>AI-generated summary of your query</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{results?.summary || "No summary available"}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Information Sources</CardTitle>
                <CardDescription>Sources used in this research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results?.sources?.map((source: Source, index: number) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-gray-700 p-3">
                      <div>
                        <h4 className="font-medium">{source.title}</h4>
                        <p className="text-sm text-gray-400">{source.url}</p>
                      </div>
                      <Badge variant="outline" className="border-gray-700">
                        {Math.round(source.reliability * 100)}% reliable
                      </Badge>
                    </div>
                  )) || <p className="text-gray-400">No sources available</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <EnhancedTimeline timeline={transformedTimeline} />
          </TabsContent>
          
          <TabsContent value="graph" className="space-y-4">
            <KnowledgeGraph entities={transformedEntities} />
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Export Research Results</CardTitle>
                <CardDescription>Download your research in different formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-700 p-4">
                    <h3 className="font-medium mb-2">PDF Document</h3>
                    <p className="text-sm text-gray-400 mb-4">Export as a formatted PDF document</p>
                    <Button 
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    >
                      {isExporting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Export PDF
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="rounded-lg border border-gray-700 p-4">
                    <h3 className="font-medium mb-2">Markdown File</h3>
                    <p className="text-sm text-gray-400 mb-4">Export as a Markdown file for easy editing</p>
                    <Button 
                      onClick={handleExportMarkdown}
                      disabled={isExporting}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700"
                    >
                      {isExporting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Export Markdown
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-700 p-4">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <p className="text-sm text-gray-400 mb-4">Preview how your research will look when exported</p>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}