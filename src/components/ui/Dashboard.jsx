import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  User, 
  Globe, 
  FileText, 
  Settings, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Plus,
  Search,
  Eye,
  X
} from 'lucide-react'

const Dashboard = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  const mockStats = {
    totalWebsites: 3,
    averageCompliance: 78,
    totalViolations: 42,
    scansThisMonth: 15
  }

  const mockWebsites = [
    {
      id: 1,
      url: 'https://example.com',
      name: 'Main Website',
      compliance: 85,
      status: 'good',
      lastScan: '2 hours ago',
      violations: { critical: 0, serious: 2, moderate: 5, minor: 8 }
    },
    {
      id: 2,
      url: 'https://shop.example.com',
      name: 'E-commerce Store',
      compliance: 72,
      status: 'warning',
      lastScan: '1 day ago',
      violations: { critical: 1, serious: 4, moderate: 8, minor: 12 }
    },
    {
      id: 3,
      url: 'https://blog.example.com',
      name: 'Company Blog',
      compliance: 91,
      status: 'good',
      lastScan: '3 hours ago',
      violations: { critical: 0, serious: 1, moderate: 2, minor: 3 }
    }
  ]

  const mockScans = [
    {
      id: 1,
      website: 'https://example.com',
      date: '2025-08-11',
      time: '14:30',
      compliance: 85,
      violations: 15,
      status: 'completed'
    },
    {
      id: 2,
      website: 'https://shop.example.com',
      date: '2025-08-10',
      time: '09:15',
      compliance: 72,
      violations: 25,
      status: 'completed'
    },
    {
      id: 3,
      website: 'https://blog.example.com',
      date: '2025-08-11',
      time: '11:45',
      compliance: 91,
      violations: 6,
      status: 'completed'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SP</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">SentryPrime Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user?.firstName || 'User'}!
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Back to Scan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="websites" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Websites</span>
            </TabsTrigger>
            <TabsTrigger value="scans" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Scans</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalWebsites}</div>
                  <p className="text-xs text-muted-foreground">Active monitoring</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getComplianceColor(mockStats.averageCompliance)}`}>
                    {mockStats.averageCompliance}%
                  </div>
                  <p className="text-xs text-muted-foreground">Across all sites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{mockStats.totalViolations}</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scans This Month</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.scansThisMonth}</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Scan Activity</CardTitle>
                  <CardDescription>Latest accessibility scans across your websites</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockScans.slice(0, 3).map((scan) => (
                      <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{scan.website}</p>
                          <p className="text-xs text-gray-500">{scan.date} at {scan.time}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium text-sm ${getComplianceColor(scan.compliance)}`}>
                            {scan.compliance}% compliant
                          </p>
                          <p className="text-xs text-gray-500">{scan.violations} violations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trends</CardTitle>
                  <CardDescription>Track your accessibility improvements over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Compliance trend chart</p>
                      <p className="text-sm">Coming soon with data visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Websites</h2>
                <p className="text-gray-600">Manage and monitor your website accessibility</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Website
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWebsites.map((website) => (
                <Card key={website.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{website.name}</CardTitle>
                      <Badge className={getStatusColor(website.status)}>
                        {website.status}
                      </Badge>
                    </div>
                    <CardDescription>{website.url}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Compliance Score</span>
                        <span className={`text-sm font-bold ${getComplianceColor(website.compliance)}`}>
                          {website.compliance}%
                        </span>
                      </div>
                      <Progress value={website.compliance} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Critical</p>
                        <p className="font-medium text-red-600">{website.violations.critical}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Serious</p>
                        <p className="font-medium text-orange-600">{website.violations.serious}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Moderate</p>
                        <p className="font-medium text-yellow-600">{website.violations.moderate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Minor</p>
                        <p className="font-medium text-blue-600">{website.violations.minor}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Search className="h-4 w-4 mr-1" />
                        Scan Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500">Last scan: {website.lastScan}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scans Tab */}
          <TabsContent value="scans" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Scan History</h2>
                <p className="text-gray-600">View all your accessibility scan results</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Run New Scan
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Website
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Compliance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Violations
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockScans.map((scan) => (
                        <tr key={scan.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {scan.website}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.date} {scan.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getComplianceColor(scan.compliance)}`}>
                              {scan.compliance}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {scan.violations}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">
                              {scan.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Report
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600">Generate detailed accessibility reports</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>High-level compliance overview for stakeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Executive Report
                  </Button>
                  <p className="text-sm text-gray-500">
                    Includes compliance scores, risk assessment, and recommendations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Report</CardTitle>
                  <CardDescription>Detailed violation breakdown for developers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Technical Report
                  </Button>
                  <p className="text-sm text-gray-500">
                    Includes code examples, WCAG references, and fix instructions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>Track compliance improvements over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Trends
                  </Button>
                  <p className="text-sm text-gray-500">
                    Monthly compliance trends and violation patterns
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Reports</CardTitle>
                  <CardDescription>Create reports tailored to your needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Custom Report
                  </Button>
                  <p className="text-sm text-gray-500">
                    Choose specific websites, date ranges, and violation types
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.firstName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.lastName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Manage your SentryPrime plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Pro Plan</h4>
                    <p className="text-sm text-blue-700">$149/month</p>
                    <p className="text-xs text-blue-600 mt-1">
                      5 websites, weekly scans, AI reports
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      Billing History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure your alert preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Email notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Scan completion alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weekly compliance reports</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Critical violation alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Integrate SentryPrime with your tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      API Key
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        value="sk-1234567890abcdef"
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Generate New Key
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Dashboard
