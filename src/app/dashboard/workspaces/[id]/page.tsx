'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Plus, 
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Share,
  Settings,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface ResearchSession {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'failed';
  profile: string;
}

interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export default function WorkspaceDetailPage() {
  const params = useParams();
  const workspaceId = (params as { id?: string })?.id ?? 'unknown';

  const [workspace, _setWorkspace] = useState({
    id: workspaceId,
    name: 'AI Research',
    description: 'Exploring the frontiers of artificial intelligence',
    createdAt: '2023-06-15',
    updatedAt: '2023-10-20',
    isPublic: false,
    researchCount: 12,
    membersCount: 3
  });

  const [researchSessions, _setResearchSessions] = useState<ResearchSession[]>([
    {
      id: '1',
      title: 'Large Language Models',
      description: 'Analysis of recent advancements in LLMs',
      createdAt: '2023-10-15',
      status: 'completed',
      profile: 'Academic'
    },
    {
      id: '2',
      title: 'AI in Healthcare',
      description: 'Applications of AI in medical diagnosis',
      createdAt: '2023-10-10',
      status: 'completed',
      profile: 'Analyst'
    },
    {
      id: '3',
      title: 'Ethics in AI',
      description: 'Exploring ethical considerations in AI development',
      createdAt: '2023-10-05',
      status: 'in-progress',
      profile: 'Academic'
    }
  ]);

  const [members, _setMembers] = useState<WorkspaceMember[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'owner',
      joinedAt: '2023-06-15'
    },
    {
      id: '2',
      name: 'Sam Smith',
      email: 'sam@example.com',
      role: 'admin',
      joinedAt: '2023-07-20'
    },
    {
      id: '3',
      name: 'Taylor Brown',
      email: 'taylor@example.com',
      role: 'member',
      joinedAt: '2023-08-10'
    }
  ]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/workspaces">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{workspace.name}</h1>
              <p className="text-gray-400">{workspace.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Link href="/dashboard/research">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Research
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Research Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workspace.researchCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workspace.membersCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{new Date(workspace.createdAt).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="research" className="data-[state=active]:bg-gray-700">
              Research
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-gray-700">
              Members
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="research" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search research sessions..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {researchSessions.map((session) => (
                <Card key={session.id} className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        <CardDescription>{session.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={
                          session.status === 'completed' ? 'border-green-500 text-green-400' :
                          session.status === 'in-progress' ? 'border-yellow-500 text-yellow-400' :
                          'border-red-500 text-red-400'
                        }>
                          {session.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {session.profile}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Workspace Members</CardTitle>
                <CardDescription>Manage who has access to this workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={
                          member.role === 'owner' ? 'border-blue-500 text-blue-400' :
                          member.role === 'admin' ? 'border-purple-500 text-purple-400' :
                          'border-gray-600 text-gray-300'
                        }>
                          {member.role}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          Joined {new Date(member.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="border-gray-700 text-gray-300 w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Research Activity</CardTitle>
                  <CardDescription>Research sessions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end space-x-2">
                    {[8, 12, 10, 14, 9, 11].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                          style={{ height: `${(value / 15) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-400 mt-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Research by Profile</CardTitle>
                  <CardDescription>Distribution of research profiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { profile: 'Academic', count: 7, percentage: 58 },
                      { profile: 'Analyst', count: 3, percentage: 25 },
                      { profile: 'Journalist', count: 2, percentage: 17 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="font-medium">{item.profile}</div>
                          <div className="text-gray-400">{item.count} sessions</div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Top Sources</CardTitle>
                <CardDescription>Most used data sources in this workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Academic Journals', count: 24, percentage: 40 },
                    { name: 'News Articles', count: 18, percentage: 30 },
                    { name: 'Web Sources', count: 12, percentage: 20 },
                    { name: 'Social Media', count: 6, percentage: 10 }
                  ].map((source, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="font-medium">{source.name}</div>
                      <div className="text-2xl font-bold mt-1">{source.count}</div>
                      <div className="text-sm text-gray-400">{source.percentage}% of total</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
