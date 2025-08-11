import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [websites, setWebsites] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setWebsites([
        {
          id: 1,
          name: 'Main Website',
          url: 'https://example.com',
          lastScan: '2025-08-11',
          complianceScore: 85,
          violations: 12,
          status: 'good'
        },
        {
          id: 2,
          name: 'E-commerce Site',
          url: 'https://shop.example.com',
          lastScan: '2025-08-10',
          complianceScore: 62,
          violations: 28,
          status: 'warning'
        }
      ]);

      setScanHistory([
        {
          id: 1,
          website: 'Main Website',
          date: '2025-08-11',
          score: 85,
          violations: 12,
          pages: 45
        },
        {
          id: 2,
          website: 'E-commerce Site',
          date: '2025-08-10',
          score: 62,
          violations: 28,
          pages: 32
        },
        {
          id: 3,
          website: 'Main Website',
          date: '2025-08-05',
          score: 78,
          violations: 18,
          pages: 45
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.first_name}!</h2>
        <p className="opacity-90">Here's your accessibility compliance overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{websites.length}</div>
          <div className="text-gray-600">Websites Monitored</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {websites.length > 0 ? Math.round(websites.reduce((acc, w) => acc + w.complianceScore, 0) / websites.length) : 0}%
          </div>
          <div className="text-gray-600">Avg Compliance</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-2xl font-bold text-orange-600">
            {websites.reduce((acc, w) => acc + w.violations, 0)}
          </div>
          <div className="text-gray-600">Total Violations</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">{scanHistory.length}</div>
          <div className="text-gray-600">Scans Completed</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Recent Scan Activity</h3>
        <div className="space-y-3">
          {scanHistory.slice(0, 3).map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">{scan.website}</div>
                <div className="text-sm text-gray-600">{scan.date} • {scan.pages} pages scanned</div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${getComplianceColor(scan.score)}`}>
                  {scan.score}% compliant
                </div>
                <div className="text-sm text-gray-600">{scan.violations} violations</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Compliance Trend</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <div>Interactive charts coming soon</div>
            <div className="text-sm">Compliance trends and analytics</div>
          </div>
        </div>
      </div>
    </div>
  );

  const WebsitesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monitored Websites</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Add Website
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((website) => (
          <div key={website.id} className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{website.name}</h3>
                <p className="text-gray-600 text-sm">{website.url}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(website.status)}`}>
                {website.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Compliance Score</span>
                <span className={`font-semibold ${getComplianceColor(website.complianceScore)}`}>
                  {website.complianceScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Violations</span>
                <span className="font-semibold">{website.violations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Scan</span>
                <span className="font-semibold">{website.lastScan}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                Scan Now
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                View Report
              </button>
            </div>
          </div>
        ))}

        {/* Add Website Card */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="text-4xl mb-2">🌐</div>
            <h3 className="font-semibold text-gray-700 mb-2">Add New Website</h3>
            <p className="text-gray-500 text-sm">Monitor another website for accessibility compliance</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ScansTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scan History</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Run New Scan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scanHistory.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{scan.website}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {scan.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${getComplianceColor(scan.score)}`}>
                      {scan.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {scan.violations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {scan.pages}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports & Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">📊 Compliance Dashboard</h3>
          <p className="text-gray-600 mb-4">Interactive dashboard with real-time compliance metrics</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            View Dashboard
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">📄 PDF Reports</h3>
          <p className="text-gray-600 mb-4">Download detailed compliance reports for stakeholders</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Generate PDF
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">📈 Trend Analysis</h3>
          <p className="text-gray-600 mb-4">Track compliance improvements over time</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            View Trends
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">🎯 Executive Summary</h3>
          <p className="text-gray-600 mb-4">High-level overview for decision makers</p>
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
            Create Summary
          </button>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                value={user.first_name} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                value={user.last_name} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={user.email} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        {/* Subscription Settings */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Subscription</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800">Free Trial</div>
              <div className="text-blue-600">14 days remaining</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Websites</span>
                <span>2 / 3</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Scans</span>
                <span>5 / 10</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email alerts for new violations</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly compliance reports</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Scan completion notifications</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">API Access</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <div className="flex">
                <input 
                  type="password" 
                  value="sk-1234567890abcdef" 
                  className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
                <button className="bg-gray-600 text-white px-4 py-2 rounded-r hover:bg-gray-700 transition-colors">
                  Copy
                </button>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
              Regenerate Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'websites', label: 'Websites', icon: '🌐' },
    { id: 'scans', label: 'Scans', icon: '🔍' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.first_name?.[0]}{user.last_name?.[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-gray-600">{user.first_name} {user.last_name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-gray-600">Loading dashboard...</div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'websites' && <WebsitesTab />}
              {activeTab === 'scans' && <ScansTab />}
              {activeTab === 'reports' && <ReportsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

