import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Shield, Search, AlertTriangle, CheckCircle, DollarSign, Users, Star } from 'lucide-react'
import AuthModal from './components/AuthModal.jsx'
import UserMenu from './components/UserMenu.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

function App() {
  // Existing scan state
  const [url, setUrl] = useState('')
  const [maxPages, setMaxPages] = useState(50)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStatus, setScanStatus] = useState('')
  const [scanResults, setScanResults] = useState(null)
  const [error, setError] = useState('')

  // Authentication state
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        setAuthToken(token)
        setUser(JSON.parse(userData))
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      }
    }
  }, [])

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL')
      return
    }

    setIsScanning(true)
    setError('')
    setScanProgress(0)
    setScanStatus('Initializing scan...')
    setScanResults(null)

    try {
      // Simulate progress updates
      const progressSteps = [
        'Analyzing website structure...',
        'Crawling pages...',
        'Checking accessibility violations...',
        'Calculating lawsuit risk...',
        'Generating report...'
      ]

      let stepIndex = 0
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          setScanStatus(progressSteps[stepIndex])
          setScanProgress((stepIndex + 1) * 20)
          stepIndex++
        }
      }, 2000)

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'https://web-production-51f3.up.railway.app'}/api/scan/premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          max_pages: maxPages
        })
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      setScanProgress(100)
      setScanStatus('Scan complete!')
      setScanResults(data)
      
      // Auto-scroll to results section
      setTimeout(() => {
        const resultsElement = document.getElementById('scan-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 500)
    } catch (err) {
      setError(`Scan failed: ${err.message}`)
      setScanProgress(0)
      setScanStatus('')
    } finally {
      setIsScanning(false)
    }
  }

  // Authentication handlers
  const handleAuthSuccess = (userData, token) => {
    setUser(userData)
    setAuthToken(token)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    setAuthToken(null)
    setShowDashboard(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
  }

  const handleOpenDashboard = () => {
    setShowDashboard(true)
  }

  // If dashboard is open, show dashboard component
  if (showDashboard && user) {
    return (
      <Dashboard 
        user={user} 
        onClose={() => setShowDashboard(false)} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SentryPrime</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Features
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Pricing
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Reviews
              </Badge>
              
              {user ? (
                <UserMenu 
                  user={user} 
                  onLogout={handleLogout}
                  onOpenDashboard={handleOpenDashboard}
                />
              ) : (
                <>
                  <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                  <Button onClick={() => setShowAuthModal(true)}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            🚀 Enhanced Multi-Page Scanning Now Available
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stop Expensive Accessibility Lawsuits{' '}
            <span className="text-blue-600">Before They Start</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive WCAG compliance scanning that protects your business from costly legal action. 
            Get detailed reports and fix issues before they become $75,000+ lawsuits.
          </p>

          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" onClick={() => document.getElementById('scan-tool').scrollIntoView()}>
              <Search className="mr-2 h-5 w-5" />
              Start Free Scan
            </Button>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              WCAG 2.1 Compliant
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              SOC 2 Certified
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              Trusted by 1000+ businesses
            </div>
          </div>
        </div>
      </section>

      {/* Scan Tool */}
      <section id="scan-tool" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                <Search className="mr-3 h-8 w-8 text-blue-600" />
                Enhanced Website Accessibility Scan
              </CardTitle>
              <CardDescription className="text-lg">
                Comprehensive multi-page accessibility analysis with detailed violation reporting
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Pages to Scan
                  </label>
                  <select
                    value={maxPages}
                    onChange={(e) => setMaxPages(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10 pages (Quick scan)</option>
                    <option value={25}>25 pages (Standard)</option>
                    <option value={50}>50 pages (Comprehensive)</option>
                    <option value={100}>100 pages (Deep analysis)</option>
                  </select>
                </div>
              </div>

              {/* Enhanced Features */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Enhanced Scanning Features
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Multi-page crawling
                  </div>
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sitemap discovery
                  </div>
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    WCAG 2.1 compliance
                  </div>
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Detailed violation reports
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isScanning && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{scanStatus}</span>
                    <span className="text-sm text-gray-500">{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="w-full" />
                </div>
              )}

              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                {isScanning ? 'Scanning...' : 'Start Enhanced Scan'}
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-1" />
                  <span>No signup required</span>
                </div>
                <div className="flex flex-col items-center">
                  <Search className="h-6 w-6 text-blue-500 mb-1" />
                  <span>Comprehensive analysis</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-6 w-6 text-purple-500 mb-1" />
                  <span>Detailed reports</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scan Results */}
      {scanResults && (
        <section id="scan-results" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Scan Results for {scanResults.url}
                </CardTitle>
                <CardDescription className="text-center">
                  Scanned {scanResults.pages_scanned} pages in {scanResults.scan_duration} seconds
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Clean Website Alert */}
                {scanResults.lawsuit_risk?.clean_website && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="font-semibold text-lg mb-2">
                        {scanResults.lawsuit_risk.messaging.headline}
                      </div>
                      <div className="mb-2">
                        {scanResults.lawsuit_risk.messaging.subheadline}
                      </div>
                      <div className="text-sm">
                        {scanResults.lawsuit_risk.messaging.call_to_action}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Ongoing Monitoring Signup for Clean Websites */}
                {scanResults.lawsuit_risk?.clean_website && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-blue-900 mb-2">
                          Stay Protected with Ongoing Monitoring
                        </h3>
                        <p className="text-blue-700 mb-4">
                          Want to get notified if you ever become non-compliant? Get automated monthly scans and instant alerts for only $59/month.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Start Monitoring - $59/month
                        </Button>
                        <p className="text-xs text-blue-600 mt-2">
                          Cancel anytime • 30-day money-back guarantee
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Lawsuit Risk Alert */}
                {scanResults.lawsuit_risk && !scanResults.lawsuit_risk.clean_website && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="font-semibold text-lg mb-2">
                        {scanResults.lawsuit_risk.messaging.headline}
                      </div>
                      <div className="mb-2">
                        {scanResults.lawsuit_risk.messaging.subheadline}
                      </div>
                      <div className="text-sm">
                        Lawsuit Probability: {scanResults.lawsuit_risk.lawsuit_probability.percentage}% 
                        ({scanResults.lawsuit_risk.lawsuit_probability.risk_level})
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Main Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Violations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">
                        {scanResults.summary?.total_violations || 0}
                      </div>
                      <p className="text-sm text-gray-500">Issues found</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Compliance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {scanResults.summary?.compliance_score || 0}%
                      </div>
                      <p className="text-sm text-gray-500">WCAG 2.1 AA</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Lawsuit Exposure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">
                        ${scanResults.lawsuit_risk?.total_exposure?.toLocaleString() || '0'}
                      </div>
                      <p className="text-sm text-gray-500">Potential cost</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Pages Scanned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {scanResults.pages_scanned || 0}
                      </div>
                      <p className="text-sm text-gray-500">Total analyzed</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Violation Breakdown */}
                {scanResults.summary && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Violation Breakdown</CardTitle>
                      <CardDescription>Issues categorized by severity level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {scanResults.summary.critical_violations || 0}
                          </div>
                          <div className="text-sm text-red-700">Critical</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {scanResults.summary.serious_violations || 0}
                          </div>
                          <div className="text-sm text-orange-700">Serious</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {scanResults.summary.moderate_violations || 0}
                          </div>
                          <div className="text-sm text-yellow-700">Moderate</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {scanResults.summary.minor_violations || 0}
                          </div>
                          <div className="text-sm text-blue-700">Minor</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Business Impact */}
                {scanResults.business_impact && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Impact Analysis</CardTitle>
                      <CardDescription>Financial and operational implications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-bold text-gray-900">
                            ${scanResults.business_impact.settlement_cost?.toLocaleString() || '0'}
                          </div>
                          <div className="text-sm text-gray-600">Avg. Settlement</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-bold text-gray-900">
                            ${scanResults.business_impact.legal_fees?.toLocaleString() || '0'}
                          </div>
                          <div className="text-sm text-gray-600">Legal Fees</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl font-bold text-gray-900">
                            ${scanResults.business_impact.remediation_cost?.toLocaleString() || '0'}
                          </div>
                          <div className="text-sm text-gray-600">Remediation</div>
                        </div>
                      </div>
                      
                      {scanResults.business_impact.recommendations && (
                        <div>
                          <h4 className="font-semibold mb-2">Recommendations:</h4>
                          <ul className="space-y-1 text-sm">
                            {scanResults.business_impact.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Call to Action */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-blue-900 mb-2">
                        Get Professional Remediation Help
                      </h3>
                      <p className="text-blue-700 mb-4">
                        Our accessibility experts can help you fix these issues and prevent future lawsuits.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Get Expert Help - $149/month
                        </Button>
                        <Button variant="outline" className="border-blue-300 text-blue-700">
                          Download Full Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

export default App
