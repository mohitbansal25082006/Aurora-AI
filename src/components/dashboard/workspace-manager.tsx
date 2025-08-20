'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Folder,
  MoreHorizontal,
  Edit,
  Trash2,
  Share,
  Calendar,
} from 'lucide-react';
import {
  Workspace,
  getWorkspaces,
  deleteWorkspace,
  createWorkspace,
} from '@/lib/database';
import { toast } from 'sonner';

interface WorkspaceManagerProps {
  onWorkspaceSelect: (workspace: Workspace) => void;
  selectedWorkspaceId?: string;
}

/**
 * Safely normalize raw workspace-like objects to the Workspace type.
 * This avoids using `any` while providing defaults for missing fields.
 */
function normalizeWorkspace(raw: unknown): Workspace {
  const obj = (raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {});
  const id =
    typeof obj.id === 'string'
      ? obj.id
      : obj.id != null
      ? String(obj.id)
      : `ws_${Math.random().toString(36).slice(2, 9)}`;
  const name = typeof obj.name === 'string' ? obj.name : 'Untitled';
  const description = typeof obj.description === 'string' ? obj.description : '';
  const created_at =
    typeof obj.created_at === 'string' ? obj.created_at : new Date().toISOString();
  const updated_at =
    typeof obj.updated_at === 'string' ? obj.updated_at : created_at;

  // Return only the fields our app expects on Workspace
  return {
    id,
    name,
    description,
    created_at,
    updated_at,
  } as Workspace;
}

export function WorkspaceManager({
  onWorkspaceSelect,
  selectedWorkspaceId,
}: WorkspaceManagerProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      const raw = await getWorkspaces();
      // raw might already be typed, but treat it as unknown[] to be safe
      const arr = Array.isArray(raw) ? (raw as unknown[]) : [];
      const normalized = arr.map(normalizeWorkspace);
      setWorkspaces(normalized);
    } catch (error) {
      console.error('Error loading workspaces:', error);
      toast.error('Failed to load workspaces');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) {
      toast.error('Workspace name is required');
      return;
    }

    try {
      const created = await createWorkspace(newWorkspaceName, newWorkspaceDescription);
      // Normalize returned object in case the API returns additional/untyped fields
      const workspace = normalizeWorkspace(created);
      setWorkspaces((prev) => [workspace, ...prev]);
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setIsCreateDialogOpen(false);
      toast.success('Workspace created successfully');
    } catch (error) {
      console.error('Error creating workspace:', error);
      toast.error('Failed to create workspace');
    }
  };

  const handleDeleteWorkspace = async (id: string) => {
    try {
      await deleteWorkspace(id);
      setWorkspaces((prev) => prev.filter((w) => w.id !== id));
      toast.success('Workspace deleted');
    } catch (error) {
      console.error('Error deleting workspace:', error);
      toast.error('Failed to delete workspace');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading workspaces...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Workspaces</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
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
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name"
                  className="bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (Optional)</label>
                <Input
                  value={newWorkspaceDescription}
                  onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                  placeholder="Enter workspace description"
                  className="bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWorkspace}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workspaces.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <Folder className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No workspaces yet</h3>
            <p className="mt-2 text-gray-400">Create your first workspace to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className={`bg-gray-800 border-gray-700 cursor-pointer transition-all hover:border-blue-500 ${
                selectedWorkspaceId === workspace.id ? 'border-blue-500' : ''
              }`}
              onClick={() => onWorkspaceSelect(workspace)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // future actions menu
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                {workspace.description && (
                  <CardDescription className="text-gray-400">
                    {workspace.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(workspace.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast('Edit not implemented yet');
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkspace(workspace.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-green-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share
                        try {
                          navigator.clipboard
                            .writeText(`${location.origin}/workspace/${workspace.id}`)
                            .then(() => toast.success('Share link copied to clipboard!'))
                            .catch(() => toast.error('Failed to copy link'));
                        } catch {
                          toast.error('Sharing not supported in this environment');
                        }
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
