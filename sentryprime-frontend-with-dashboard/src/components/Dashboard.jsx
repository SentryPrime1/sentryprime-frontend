import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Shield, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Plus,
  BarChart3,
  Calendar,
  Settings,
  Download,
  Eye,
  Trash2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = ({ user, authToken, onClose }) => {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://web-production-51f3.up.railway.app'

  // Fetch user's websites and scan data
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${backendUrl}/api/auth/websites`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch websites')
      }

      const data = await response.json()
      setWebsites(data.websites || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for charts (replace with real data)
  const complianceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 92 },
    { month: 'Jun', score: 88 }
  ]

  const violationData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'Serious', value: 28, color: '#f97316' },
    { name: 'Moderate', value: 45, color: '#eab308' },
    { name: 'Minor', value: 15, color: '#22c55e' }
  ]

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSubscriptionLimits = () => {
    const plan = user.subscription?.plan || 'free'
    const limits = {
      free: { websites: 1, scans: 1 },
      starter: { websites: 1, scans: 30 },
      pro: { websites: 3, scans: 120 },
      agency: { websites: 10, scans: 365 }
    }
    return limits[plan] || limits.free
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-full max-h-[90vh] overflow-hidden">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.first_name || 'User'}!</h1>
              <p className="text-blue-100">Monitor your websites and stay compliant</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white text-blue-600">
                {user.subscription?.plan?.toUpperCase() || 'FREE'} Plan
              </Badge>
              <Button variant="ghost" onClick={onClose} className="text-white hover:bg-blue-500">
                ✕ Close
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="websites">Websites</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Websites</p>
                        <p className="text-2xl font-bold">{websites.length}</p>
                      </div>
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg. Compliance</p>
                        <p className="text-2xl font-bold">85%</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Issues</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Scan</p>
                        <p className="text-2xl font-bold">2d ago</p>
                      </div>
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Compliance Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Trend</CardTitle>
                    <CardDescription>Your compliance score over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={complianceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Violation Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Violation Breakdown</CardTitle>
                    <CardDescription>Current violations by severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={violationData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {violationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Latest accessibility scans across your websites</CardDescription>
                </CardHeader>
                <CardContent>
                  {websites.length === 0 ? (
                    <div className="text-center py-8">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No websites added yet</p>
                      <Button onClick={() => setActiveTab('websites')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Website
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {websites.slice(0, 3).map((website) => (
                        <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{website.name}</p>
                              <p className="text-sm text-gray-600">{website.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={getComplianceColor(85)}>
                              85% Compliant
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Websites Tab */}
            <TabsContent value="websites" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Your Websites</h2>
                  <p className="text-gray-600">
                    {websites.length} of {getSubscriptionLimits().websites} websites used
                  </p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Website
                </Button>
              </div>

              {websites.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No websites yet</h3>
                    <p className="text-gray-600 mb-6">
                      Add your first website to start monitoring accessibility compliance
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Website
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {websites.map((website) => (
                    <Card key={website.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{website.name}</CardTitle>
                            <CardDescription>{website.url}</CardDescription>
                          </div>
                          <Badge className={getComplianceColor(85)}>
                            85%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Compliance Score</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span>Last Scan:</span>
                            <span>{website.last_scan_at ? new Date(website.last_scan_at).toLocaleDateString() : 'Never'}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span>Frequency:</span>
                            <span className="capitalize">{website.scan_frequency}</span>
                          </div>

                          <div className="flex space-x-2 pt-4">
                            <Button variant="outline" size="sm" className="flex-1">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Scan Now
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Scan Reports</h2>
                  <p className="text-gray-600">View and download detailed accessibility reports</p>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>

              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
                  <p className="text-gray-600 mb-6">
                    Run your first scan to generate detailed accessibility reports
                  </p>
                  <Button onClick={() => setActiveTab('websites')}>
                    View Websites
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Account Settings</h2>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-gray-600">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your plan and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Current Plan</label>
                      <p className="text-gray-600 capitalize">
                        {user.subscription?.plan || 'Free Trial'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <p className="text-gray-600">
                        {user.subscription?.status || 'Active'}
                      </p>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

