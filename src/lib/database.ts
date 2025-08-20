export interface Workspace {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ResearchOptions {
  searchEngines?: string[];
  maxResults?: number;
  includeSources?: boolean;
  timeRange?: string;
  profile?: string;
  sources?: string[];
  [key: string]: unknown;
}

export interface ResearchResult {
  title: string;
  url: string;
  snippet?: string;
  source?: string;
  timestamp?: string;
  relevance?: number;
  [key: string]: unknown;
}

export interface ResearchSession {
  id: string;
  workspace_id: string;
  query: string;
  options: ResearchOptions;
  results: ResearchResult[];
  created_at: string;
}

// Workspace functions
export async function createWorkspace(name: string, description?: string) {
  const response = await fetch('/api/workspaces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create workspace');
  }
  
  return response.json();
}

export async function getWorkspaces() {
  const response = await fetch('/api/workspaces');
  
  if (!response.ok) {
    throw new Error('Failed to fetch workspaces');
  }
  
  return response.json();
}

export async function getWorkspace(id: string) {
  const response = await fetch(`/api/workspaces/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch workspace');
  }
  
  return response.json();
}

export async function updateWorkspace(id: string, updates: Partial<Workspace>) {
  const response = await fetch(`/api/workspaces/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update workspace');
  }
  
  return response.json();
}

export async function deleteWorkspace(id: string) {
  const response = await fetch(`/api/workspaces/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete workspace');
  }
}

// Research session functions
export async function createResearchSession(
  workspaceId: string,
  query: string,
  options: ResearchOptions,
  results: ResearchResult[]
) {
  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspaceId, query, options, results }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create research session');
  }
  
  return response.json();
}

export async function getResearchSessions(workspaceId: string) {
  const response = await fetch(`/api/sessions?workspaceId=${workspaceId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch research sessions');
  }
  
  return response.json();
}

export async function getResearchSession(id: string) {
  const response = await fetch(`/api/sessions/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch research session');
  }
  
  return response.json();
}

export async function deleteResearchSession(id: string) {
  const response = await fetch(`/api/sessions/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete research session');
  }
}

// Initialize database
export async function initializeDatabase() {
  const response = await fetch('/api/init-db');
  
  if (!response.ok) {
    throw new Error('Failed to initialize database');
  }
  
  return response.json();
}