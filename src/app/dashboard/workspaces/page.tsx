'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Folder, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Share,
  Calendar,
  FileText,
  Search,
  Users,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  researchCount: number;
  members: number;
  isPublic: boolean;
}

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'AI Research',
      description: 'Exploring the frontiers of artificial intelligence',
      createdAt: '2023-06-15',
      updatedAt: '2023-10-20',
      researchCount: 12,
      members: 3,
      isPublic: false
    },
    {
      id: '2',
      name: 'Market Analysis',
      description: 'Trends and insights in global markets',
      createdAt: '2023-07-22',
      updatedAt: '2023-10-18',
      researchCount: 8,
      members: 2,
      isPublic: true
    },
    {
      id: '3',
      name: 'Academic Papers',
      description: 'Collection of academic research papers',
      createdAt: '2023-08-05',
      updatedAt: '2023-10-15',
      researchCount: 15,
      members: 1,
      isPublic: false
    }
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    isPublic: false
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateWorkspace = () => {
    if (!newWorkspace.name.trim()) return;
    
    const workspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspace.name,
      description: newWorkspace.description,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      researchCount: 0,
      members: 1,
      isPublic: newWorkspace.isPublic
    };
    
    setWorkspaces([workspace, ...workspaces]);
    setNewWorkspace({ name: '', description: '', isPublic: false });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteWorkspace = (id: string) => {
    setWorkspaces(workspaces.filter(w => w.id !== id));
  };

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Workspaces</h1>
            <p className="text-gray-400">Organize your research projects</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search workspaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Workspace
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Workspace</DialogTitle>
                  <DialogDescription>
                    Create a new workspace to organize your research projects.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={newWorkspace.name}
                      onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                      placeholder="Enter workspace name"
                      className="bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={newWorkspace.description}
                      onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                      placeholder="Enter workspace description"
                      className="bg-gray-700 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newWorkspace.isPublic}
                      onChange={(e) => setNewWorkspace({...newWorkspace, isPublic: e.target.checked})}
                      className="rounded bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="isPublic" className="text-sm">
                      Make this workspace public
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateWorkspace}>
                      Create
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredWorkspaces.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <Folder className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No workspaces found</h3>
              <p className="mt-2 text-gray-400">Create your first workspace to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <Card key={workspace.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-400" />
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      {workspace.isPublic && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          <Users className="h-3 w-3 mr-1" />
                          Public
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    {workspace.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{workspace.researchCount} research</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{workspace.members} members</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Updated {new Date(workspace.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/workspaces/${workspace.id}`}>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          Open
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                        onClick={() => handleDeleteWorkspace(workspace.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}