'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Search, 
  BarChart3, 
  Settings, 
  FileText, 
  Star,
  ChevronDown,
  ChevronRight,
  Plus,
  Users
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'New Research',
    href: '/dashboard/research',
    icon: Plus,
  },
  {
    title: 'History',
    href: '/dashboard/history',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

const workspaces = [
  { name: 'AI Research', href: '/dashboard/workspaces/ai-research' },
  { name: 'Market Analysis', href: '/dashboard/workspaces/market-analysis' },
  { name: 'Academic Papers', href: '/dashboard/workspaces/academic-papers' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [workspacesOpen, setWorkspacesOpen] = useState(true);

  return (
    <div className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900 md:flex">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <span className="text-xl font-bold">Aurora AI</span>
        </Link>
      </div>
      
      <div className="flex-1 space-y-4 p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800',
                  isActive ? 'bg-gray-800 text-blue-400' : 'text-gray-400'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
        
        <div className="pt-4">
          <button
            onClick={() => setWorkspacesOpen(!workspacesOpen)}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>Workspaces</span>
            </div>
            {workspacesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {workspacesOpen && (
            <div className="ml-6 mt-2 space-y-1">
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.href}
                  href={workspace.href}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-800"
                >
                  {workspace.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-800 p-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-teal-600"></div>
          <div>
            <p className="text-sm font-medium">Guest User</p>
            <p className="text-xs text-gray-400">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}