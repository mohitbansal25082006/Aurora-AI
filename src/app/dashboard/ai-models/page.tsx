'use client';
import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Brain, 
  Settings, 
  Plus,
  Search,
  Star,
  Clock,
  Cpu,
  Layers
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  description: string;
  type: 'language' | 'vision' | 'multimodal';
  version: string;
  status: 'active' | 'inactive' | 'deprecated';
  capabilities: string[];
  performance: {
    accuracy: number;
    speed: number;
    efficiency: number;
  };
  lastUpdated: string;
  isDefault: boolean;
}

export default function AIModelsPage() {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'GPT-4 Turbo',
      description: 'Advanced language model for complex reasoning and content generation',
      type: 'language',
      version: '4.0',
      status: 'active',
      capabilities: ['Text Generation', 'Reasoning', 'Summarization', 'Translation'],
      performance: {
        accuracy: 94,
        speed: 85,
        efficiency: 78
      },
      lastUpdated: '2023-10-15',
      isDefault: true
    },
    {
      id: '2',
      name: 'Claude 2',
      description: 'AI assistant focused on helpful, honest, and harmless interactions',
      type: 'language',
      version: '2.1',
      status: 'active',
      capabilities: ['Text Generation', 'Reasoning', 'Analysis', 'Coding'],
      performance: {
        accuracy: 92,
        speed: 88,
        efficiency: 82
      },
      lastUpdated: '2023-10-10',
      isDefault: false
    },
    {
      id: '3',
      name: 'DALL-E 3',
      description: 'Image generation model from text descriptions',
      type: 'vision',
      version: '3.0',
      status: 'active',
      capabilities: ['Image Generation', 'Image Editing', 'Style Transfer'],
      performance: {
        accuracy: 89,
        speed: 76,
        efficiency: 70
      },
      lastUpdated: '2023-10-05',
      isDefault: false
    },
    {
      id: '4',
      name: 'GPT-3.5',
      description: 'Versatile language model for various text tasks',
      type: 'language',
      version: '3.5',
      status: 'active',
      capabilities: ['Text Generation', 'Classification', 'Summarization'],
      performance: {
        accuracy: 85,
        speed: 92,
        efficiency: 90
      },
      lastUpdated: '2023-09-20',
      isDefault: false
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const setDefaultModel = (id: string) => {
    setModels(prev => prev.map(model => ({
      ...model,
      isDefault: model.id === id
    })));
  };

  const filteredModels = models.filter(model => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      model.name.toLowerCase().includes(q) ||
      model.description.toLowerCase().includes(q);
    const matchesTypeFilter = filterType === 'all' || model.type === (filterType as AIModel['type']);
    const matchesStatusFilter = filterStatus === 'all' || model.status === (filterStatus as AIModel['status']);
    return matchesSearch && matchesTypeFilter && matchesStatusFilter;
  });

  const getTypeIcon = (type: AIModel['type']) => {
    switch (type) {
      case 'language': return <Brain className="h-4 w-4" />;
      case 'vision': return <Cpu className="h-4 w-4" />;
      case 'multimodal': return <Layers className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: AIModel['type']) => {
    switch (type) {
      case 'language': return 'border-blue-500 text-blue-400';
      case 'vision': return 'border-purple-500 text-purple-400';
      case 'multimodal': return 'border-green-500 text-green-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const getStatusColor = (status: AIModel['status']) => {
    switch (status) {
      case 'active': return 'border-green-500 text-green-400';
      case 'inactive': return 'border-yellow-500 text-yellow-400';
      case 'deprecated': return 'border-red-500 text-red-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">AI Models</h1>
            <p className="text-gray-400">Manage and configure AI models for research</p>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="models" className="data-[state=active]:bg-gray-700">
              Models
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search AI models..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
                  <Button
                    variant={filterType === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                    className={filterType === 'all' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    All Types
                  </Button>
                  <Button
                    variant={filterType === 'language' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterType('language')}
                    className={filterType === 'language' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    Language
                  </Button>
                  <Button
                    variant={filterType === 'vision' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterType('vision')}
                    className={filterType === 'vision' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    Vision
                  </Button>
                  <Button
                    variant={filterType === 'multimodal' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterType('multimodal')}
                    className={filterType === 'multimodal' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    Multimodal
                  </Button>
                </div>
                
                <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                    className={filterStatus === 'all' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    All Status
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterStatus('active')}
                    className={filterStatus === 'active' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === 'inactive' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterStatus('inactive')}
                    className={filterStatus === 'inactive' ? 'bg-blue-600' : 'text-gray-300'}
                  >
                    Inactive
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredModels.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Brain className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">No AI models found</h3>
                    <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
                  </CardContent>
                </Card>
              ) : (
                filteredModels.map((model) => (
                  <Card key={model.id} className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            model.status === 'active' ? 'bg-blue-500/20' : 'bg-gray-700'
                          }`}>
                            {getTypeIcon(model.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {model.name}
                              {model.isDefault && (
                                <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                              <Badge variant="outline" className={`text-xs ${getTypeColor(model.type)}`}>
                                {model.type}
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getStatusColor(model.status)}`}>
                                {model.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="mt-1">{model.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!model.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDefaultModel(model.id)}
                              className="border-gray-600 text-gray-300"
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700/50 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold">{model.performance.accuracy}%</div>
                            <div className="w-16 bg-gray-700 rounded-full h-2 flex-1">
                              <div 
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${model.performance.accuracy}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-700/50 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Speed</div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold">{model.performance.speed}%</div>
                            <div className="w-16 bg-gray-700 rounded-full h-2 flex-1">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${model.performance.speed}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-700/50 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Efficiency</div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold">{model.performance.efficiency}%</div>
                            <div className="w-16 bg-gray-700 rounded-full h-2 flex-1">
                              <div 
                                className="h-2 rounded-full bg-purple-500"
                                style={{ width: `${model.performance.efficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {model.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <div>Version: {model.version}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Last updated: {new Date(model.lastUpdated).toLocaleDateString()}
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
                <CardTitle>Model Settings</CardTitle>
                <CardDescription>Configure global settings for AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-select best model</div>
                    <div className="text-sm text-gray-400">Automatically choose the best model based on your query</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Off</span>
                    <div className="relative inline-block w-10 h-6">
                      <input type="checkbox" className="sr-only" id="auto-select" />
                      <div className="block w-10 h-6 rounded-full bg-gray-700"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform"></div>
                    </div>
                    <span className="text-sm text-gray-400">On</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Model fallback</div>
                    <div className="text-sm text-gray-400">Use alternative models if the primary one fails</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Off</span>
                    <div className="relative inline-block w-10 h-6">
                      <input type="checkbox" className="sr-only" id="fallback" defaultChecked />
                      <div className="block w-10 h-6 rounded-full bg-gray-700"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4 bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-400">On</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Model caching</div>
                    <div className="text-sm text-gray-400">Cache model responses to improve speed</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Off</span>
                    <div className="relative inline-block w-10 h-6">
                      <input type="checkbox" className="sr-only" id="caching" defaultChecked />
                      <div className="block w-10 h-6 rounded-full bg-gray-700"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4 bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-400">On</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Response temperature</div>
                    <div className="text-sm text-gray-400">Control randomness of model responses</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="w-32"
                    />
                    <span className="text-sm text-gray-400">0.7</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Max tokens</div>
                    <div className="text-sm text-gray-400">Maximum length of model responses</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="2048"
                      min="100"
                      max="8192"
                      className="w-24 bg-gray-700 border-gray-600 text-white rounded p-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
