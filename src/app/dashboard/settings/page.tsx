'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Key,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Download,
  Trash2,
  Save,
  Clock
} from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Research enthusiast and AI explorer'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    researchUpdates: true,
    newsletter: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-8',
    defaultProfile: 'Academic'
  });

  const handleSave = () => {
    // In a real app, you would save the settings to your backend
    // Replace alert with your toast/writer if you prefer
    alert('Settings saved successfully!');
  };

  const toggleEmailNotifications = () => {
    setNotifications((prev) => ({ ...prev, email: !prev.email }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gray-700">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-gray-700">
              Account
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-gray-700">
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-400">
                      Receive email updates about your research
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-300">
                      {notifications.email ? 'Enabled' : 'Disabled'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300"
                      onClick={toggleEmailNotifications}
                    >
                      Manage
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Data Export</div>
                    <div className="text-sm text-gray-400">Download all your research data</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-gray-400">Permanently delete your account and all data</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-900/20">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Theme</label>
                    <div className="relative">
                      <Palette className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                        className="w-full pl-10 bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Language</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full pl-10 bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Timezone</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        className="w-full pl-10 bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Default Research Profile</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        value={preferences.defaultProfile}
                        onChange={(e) => setPreferences({ ...preferences, defaultProfile: e.target.value })}
                        className="w-full pl-10 bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                      >
                        <option value="Academic">Academic</option>
                        <option value="Journalist">Journalist</option>
                        <option value="Analyst">Analyst</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Password</div>
                    <div className="text-sm text-gray-400">Last changed 3 months ago</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    <Key className="mr-2 h-4 w-4" />
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-400">Add an extra layer of security</div>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Disabled
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Active Sessions</div>
                    <div className="text-sm text-gray-400">3 active sessions</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">Login History</div>
                    <div className="text-sm text-gray-400">View your recent login activity</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
