'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Mic, 
  FileText, 
  Image, 
  Users,
  MapPin,
  Filter
} from 'lucide-react';
import { trackResearch } from '@/lib/analytics';

interface ResearchOptions {
  profile: string;
  sources: string[];
  dateRange: { from: string; to: string };
  location: string;
}

interface ResearchFormProps {
  onResearch: (query: string, options: ResearchOptions) => void;
}

const researchProfiles = [
  { id: 'academic', name: 'Academic', description: 'Formal, citation-focused research' },
  { id: 'journalist', name: 'Journalist', description: 'Investigative, source-verified reporting' },
  { id: 'analyst', name: 'Analyst', description: 'Data-driven, trend-focused analysis' },
];

const dataSources = [
  { id: 'web', name: 'Web', icon: Search },
  { id: 'academic', name: 'Academic Papers', icon: FileText },
  { id: 'news', name: 'News Articles', icon: FileText },
  { id: 'images', name: 'Images', icon: Image },
  { id: 'social', name: 'Social Media', icon: Users },
];

export function ResearchForm({ onResearch }: ResearchFormProps) {
  const [query, setQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('academic');
  const [selectedSources, setSelectedSources] = useState<string[]>(['web']);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [location, setLocation] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const researchOptions = {
      profile: selectedProfile,
      sources: selectedSources,
      dateRange,
      location
    };
    
    trackResearch(query, researchOptions);
    
    onResearch(query, researchOptions);
  };

  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="What do you want to research?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <Button type="submit" size="icon" className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600">
            <Search className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="outline" className="h-12 w-12 border-gray-700 text-gray-300">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {researchProfiles.map(profile => (
            <Badge
              key={profile.id}
              variant={selectedProfile === profile.id ? "default" : "outline"}
              className={`cursor-pointer ${selectedProfile === profile.id ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}`}
              onClick={() => setSelectedProfile(profile.id)}
            >
              {profile.name}
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className="cursor-pointer border-gray-700 text-gray-300"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter className="mr-1 h-3 w-3" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </Badge>
        </div>
        
        {showAdvanced && (
          <>
            <Separator className="my-4 bg-gray-700" />
            
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-400">Data Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {dataSources.map(source => {
                    const Icon = source.icon;
                    const isSelected = selectedSources.includes(source.id);
                    return (
                      <div
                        key={source.id}
                        className={`flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-sm ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                            : 'border-gray-700 text-gray-400'
                        }`}
                        onClick={() => toggleSource(source.id)}
                      >
                        <Icon className="h-4 w-4" />
                        {source.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-400">Date Range</h3>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                      className="bg-gray-700 text-white"
                    />
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                      className="bg-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-400">Location</h3>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Filter by location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-gray-700 pl-10 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}