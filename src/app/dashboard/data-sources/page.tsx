'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Plus, 
  Search, 
  Filter,
  Globe,
  BookOpen,
  FileText,
  Users,
  Settings,
  Check,
  X,
  MoreHorizontal
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'web' | 'academic' | 'news' | 'social';
  description: string;
  url: string;
  reliability: number;
  isActive: boolean;
  lastUpdated: string;
}

export default function DataSourcesPage() {
  const [sources, setSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Google Scholar',
      type: 'academic',
      description: 'Academic papers and citations',
      url: 'https://scholar.google.com',
      reliability: 95,
      isActive: true,
      lastUpdated: '2023-10-15'
    },
    {
      id: '2',
      name: 'Wikipedia',
      type: 'web',
      description: 'General knowledge base',
      url: 'https://wikipedia.org',
      reliability: 75,
      isActive: true,
      lastUpdated: '2023-10-10'
    },
    {
      id: '3',
      name: 'Reddit',
      type: 'social',
      description: 'Social discussions and opinions',
      url: 'https://reddit.com',
      reliability: 60,
      isActive: false,
      lastUpdated: '2023-10-05'
    },
    {
      id: '4',
      name: 'New York Times',
      type: 'news',
      description: 'News and current events',
      url: 'https://nytimes.com',
      reliability: 90,
      isActive: true,
      lastUpdated: '2023-10-12'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const toggleSourceStatus = (id: string) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, isActive: !source.isActive } : source
    ));
  };

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || source.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return <Globe className="h-4 w-4" />;
      case 'academic': return <BookOpen className="h-4 w-4" />;
      case 'news': return <FileText className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'web': return 'border-blue-500 text-blue-400';
      case 'academic': return 'border-purple-500 text-purple-400';
      case 'news': return 'border-green-500 text-green-400';
      case 'social': return 'border-yellow-500 text-yellow-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Data Sources</h1>
            <p className="text-gray-400">Manage and configure your research data sources</p>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="sources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="sources" className="data-[state=active]:bg-gray-700">
              Sources
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sources" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search data sources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                  className={filterType === 'all' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'web' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('web')}
                  className={filterType === 'web' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
                >
                  Web
                </Button>
                <Button
                  variant={filterType === 'academic' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('academic')}
                  className={filterType === 'academic' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
                >
                  Academic
                </Button>
                <Button
                  variant={filterType === 'news' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('news')}
                  className={filterType === 'news' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
                >
                  News
                </Button>
                <Button
                  variant={filterType === 'social' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('social')}
                  className={filterType === 'social' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
                >
                  Social
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredSources.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Database className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">No data sources found</h3>
                    <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
                  </CardContent>
                </Card>
              ) : (
                filteredSources.map((source) => (
                  <Card key={source.id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${source.isActive ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
                            {getTypeIcon(source.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {source.name}
                              <Badge variant="outline" className={`text-xs ${getTypeColor(source.type)}`}>
                                {source.type}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="mt-1">{source.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              {source.reliability}% reliable
                            </span>
                            <div className="w-16 bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  source.reliability > 80 ? 'bg-green-500' :
                                  source.reliability > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${source.reliability}%` }}
                              ></div>
                            </div>
                          </div>
                          <Switch
                            checked={source.isActive}
                            onCheckedChange={() => toggleSourceStatus(source.id)}
                          />
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          URL: <span className="text-blue-400">{source.url}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Last updated: {new Date(source.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Source Settings</CardTitle>
                <CardDescription>Configure global settings for data sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-discover new sources</div>
                    <div className="text-sm text-gray-400">Automatically add new relevant sources based on your research</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Source reliability threshold</div>
                    <div className="text-sm text-gray-400">Minimum reliability score for sources to be included</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      defaultValue="70"
                      min="0"
                      max="100"
                      className="w-20 bg-gray-700 border-gray-600 text-white"
                    />
                    <span className="text-gray-400">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Max sources per query</div>
                    <div className="text-sm text-gray-400">Maximum number of sources to include in each research query</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      defaultValue="10"
                      min="1"
                      max="50"
                      className="w-20 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Source diversity</div>
                    <div className="text-sm text-gray-400">Ensure a diverse mix of source types in research results</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}