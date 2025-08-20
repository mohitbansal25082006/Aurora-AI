'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Search, 
  FileText,
  Clock,
  Target,
  Zap,
  Calendar,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalResearch: 42,
      completedResearch: 38,
      avgTime: '2m 34s',
      successRate: 90.5
    },
    researchTrend: [
      { date: 'Jan', count: 12 },
      { date: 'Feb', count: 18 },
      { date: 'Mar', count: 15 },
      { date: 'Apr', count: 22 },
      { date: 'May', count: 19 },
      { date: 'Jun', count: 25 }
    ],
    topQueries: [
      { query: 'AI advancements', count: 8, growth: 12 },
      { query: 'Market trends', count: 6, growth: 8 },
      { query: 'Climate change', count: 5, growth: 15 },
      { query: 'Tech startups', count: 4, growth: 22 },
      { query: 'Healthcare AI', count: 3, growth: 5 }
    ],
    sources: [
      { name: 'Web', count: 156, percentage: 65 },
      { name: 'Academic', count: 48, percentage: 20 },
      { name: 'News', count: 24, percentage: 10 },
      { name: 'Social Media', count: 12, percentage: 5 }
    ],
    performance: {
      accuracy: 94.2,
      speed: 1.8,
      sources: 8.4,
      satisfaction: 4.7
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-gray-400">Track your research performance and insights</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
              className={timeRange === '7d' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
              className={timeRange === '30d' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('90d')}
              className={timeRange === '90d' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
            >
              90 Days
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-gray-700">
              Research
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-gray-700">
              Sources
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-700">
              Performance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.totalResearch}</div>
                  <div className="flex items-center text-green-400 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>12% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.completedResearch}</div>
                  <div className="flex items-center text-green-400 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>8% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Avg. Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.avgTime}</div>
                  <div className="flex items-center text-red-400 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                    <span>5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.successRate}%</div>
                  <div className="flex items-center text-green-400 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>3% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Research Trend</CardTitle>
                <CardDescription>Number of research queries over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end space-x-2">
                  {analyticsData.researchTrend.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                        style={{ height: `${(item.count / 30) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-400 mt-2">{item.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="research" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Top Research Queries</CardTitle>
                <CardDescription>Most frequently researched topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{query.query}</div>
                          <div className="text-sm text-gray-400">{query.count} queries</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {query.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Breakdown of sources used in research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.sources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="font-medium">{source.name}</div>
                        <div className="text-gray-400">{source.count} sources</div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-400" />
                      <span>Accuracy</span>
                    </div>
                    <div className="font-bold">{analyticsData.performance.accuracy}%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span>Speed</span>
                    </div>
                    <div className="font-bold">{analyticsData.performance.speed}s</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-green-400" />
                      <span>Sources</span>
                    </div>
                    <div className="font-bold">{analyticsData.performance.sources}/query</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      <span>Satisfaction</span>
                    </div>
                    <div className="font-bold">{analyticsData.performance.satisfaction}/5</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest research sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'AI in Healthcare', time: '2 hours ago', status: 'Completed' },
                      { title: 'Market Trends 2023', time: '5 hours ago', status: 'Completed' },
                      { title: 'Climate Change Research', time: '1 day ago', status: 'Completed' },
                      { title: 'Tech Startup Analysis', time: '2 days ago', status: 'Completed' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}