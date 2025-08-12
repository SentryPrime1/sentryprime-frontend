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
import Dashboard from './components/ui/Dashboard.jsx'
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
                        Lawsuit Probability: {scanResults.lawsuit_risk.lawsuit_probability}% ({scanResults.lawsuit_risk.risk_level})
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {scanResults.violations?.serious || 0}
                      </div>
                      <div className="text-sm text-gray-600">Serious Violations</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {scanResults.violations?.moderate || 0}
                      </div>
                      <div className="text-sm text-gray-600">Moderate Violations</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {scanResults.compliance_score || 0}%
                      </div>
                      <div className="text-sm text-gray-600">Compliance Score</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {scanResults.pages_scanned || 0}
                      </div>
                      <div className="text-sm text-gray-600">Pages Scanned</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lawsuit Risk Calculation */}
                {scanResults.lawsuit_risk && !scanResults.lawsuit_risk.clean_website && (
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Lawsuit Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Financial Exposure</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Settlement Amount:</span>
                              <span className="font-semibold">${scanResults.lawsuit_risk.settlement_amount?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Legal Fees:</span>
                              <span className="font-semibold">${scanResults.lawsuit_risk.legal_fees?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Remediation Costs:</span>
                              <span className="font-semibold">${scanResults.lawsuit_risk.remediation_cost?.toLocaleString()}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-lg font-bold text-red-600">
                              <span>Total Exposure:</span>
                              <span>${scanResults.lawsuit_risk.total_cost?.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Risk Factors</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Lawsuit Probability:</span>
                              <Badge variant={scanResults.lawsuit_risk.lawsuit_probability > 70 ? 'destructive' : 'secondary'}>
                                {scanResults.lawsuit_risk.lawsuit_probability}%
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Level:</span>
                              <Badge variant={scanResults.lawsuit_risk.risk_level === 'EXTREME' ? 'destructive' : 'secondary'}>
                                {scanResults.lawsuit_risk.risk_level}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Compliance Score:</span>
                              <Badge variant={scanResults.compliance_score < 50 ? 'destructive' : 'secondary'}>
                                {scanResults.compliance_score}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Violation Details */}
                {scanResults.violations && (scanResults.violations.serious > 0 || scanResults.violations.moderate > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                        Accessibility Violations Found
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {scanResults.violations.serious > 0 && (
                          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-red-800">Serious Violations</h4>
                              <Badge variant="destructive">{scanResults.violations.serious}</Badge>
                            </div>
                            <p className="text-sm text-red-700">
                              These violations significantly impact accessibility and pose high lawsuit risk. 
                              Immediate remediation recommended.
                            </p>
                          </div>
                        )}
                        
                        {scanResults.violations.moderate > 0 && (
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-orange-800">Moderate Violations</h4>
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                {scanResults.violations.moderate}
                              </Badge>
                            </div>
                            <p className="text-sm text-orange-700">
                              These violations affect user experience and should be addressed to improve compliance.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Call to Action */}
                {scanResults.lawsuit_risk && !scanResults.lawsuit_risk.clean_website && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-blue-900 mb-2">
                        Protect Your Business Today
                      </h3>
                      <p className="text-blue-700 mb-4">
                        Don't wait for a lawsuit. Get detailed remediation guidance and ongoing monitoring 
                        to keep your website compliant and protected.
                      </p>
                      <div className="space-y-2">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 mr-4">
                          Get Detailed Report - $149
                        </Button>
                        <Button variant="outline" size="lg">
                          Schedule Consultation
                        </Button>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        Includes step-by-step remediation guide • 30-day money-back guarantee
                      </p>
                    </CardContent>
                  </Card>
                )}
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
