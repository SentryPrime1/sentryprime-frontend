import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Shield, Search, AlertTriangle, CheckCircle, DollarSign, Users, Star } from 'lucide-react'
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

  // Simple authentication state
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        setAuthToken(token)
        setUser(JSON.parse(userData))
      } catch (error) {
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

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://web-production-51f3.up.railway.app'
      
      const response = await fetch(`${backendUrl}/api/scan/premium`, {
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

  // Simple authentication functions
  const openAuthModal = (mode = 'login') => {
    const modalHtml = `
      <div id="auth-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="margin: 0; color: #1f2937; font-size: 1.5rem;">Welcome to SentryPrime</h2>
            <button onclick="closeAuthModal()" style="
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: #6b7280;
            ">&times;</button>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <button id="login-tab" onclick="switchAuthTab('login')" style="
              padding: 0.5rem 1rem;
              margin-right: 0.5rem;
              border: none;
              background: ${mode === 'login' ? '#2563eb' : '#f3f4f6'};
              color: ${mode === 'login' ? 'white' : '#374151'};
              border-radius: 4px;
              cursor: pointer;
            ">Sign In</button>
            <button id="register-tab" onclick="switchAuthTab('register')" style="
              padding: 0.5rem 1rem;
              border: none;
              background: ${mode === 'register' ? '#2563eb' : '#f3f4f6'};
              color: ${mode === 'register' ? 'white' : '#374151'};
              border-radius: 4px;
              cursor: pointer;
            ">Sign Up</button>
          </div>

          <form id="auth-form" onsubmit="handleAuth(event, '${mode}')">
            <div id="auth-fields">
              ${mode === 'register' ? `
                <div style="margin-bottom: 1rem;">
                  <input type="text" id="firstName" placeholder="First Name" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                  ">
                  <input type="text" id="lastName" placeholder="Last Name" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                  ">
                </div>
              ` : ''}
              
              <div style="margin-bottom: 1rem;">
                <input type="email" id="email" placeholder="your@email.com" required style="
                  width: 100%;
                  padding: 0.75rem;
                  border: 1px solid #d1d5db;
                  border-radius: 4px;
                ">
              </div>
              
              <div style="margin-bottom: 1rem;">
                <input type="password" id="password" placeholder="Password" required style="
                  width: 100%;
                  padding: 0.75rem;
                  border: 1px solid #d1d5db;
                  border-radius: 4px;
                ">
              </div>
              
              ${mode === 'register' ? `
                <div style="margin-bottom: 1rem;">
                  <input type="password" id="confirmPassword" placeholder="Confirm Password" required style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                  ">
                </div>
              ` : ''}
            </div>
            
            <div id="auth-message" style="margin-bottom: 1rem; padding: 0.5rem; border-radius: 4px; display: none;"></div>
            
            <button type="submit" id="auth-submit" style="
              width: 100%;
              padding: 0.75rem;
              background: #2563eb;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 1rem;
            ">${mode === 'login' ? 'Sign In' : 'Create Account'}</button>
          </form>
        </div>
      </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHtml)
  }

  // Add global functions to window for onclick handlers
  useEffect(() => {
    window.closeAuthModal = () => {
      const modal = document.getElementById('auth-modal')
      if (modal) modal.remove()
    }

    window.switchAuthTab = (mode) => {
      const modal = document.getElementById('auth-modal')
      if (modal) {
        modal.remove()
        openAuthModal(mode)
      }
    }

    window.handleAuth = async (event, mode) => {
      event.preventDefault()
      
      const submitBtn = document.getElementById('auth-submit')
      const messageDiv = document.getElementById('auth-message')
      
      submitBtn.textContent = mode === 'login' ? 'Signing In...' : 'Creating Account...'
      submitBtn.disabled = true
      
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://web-production-51f3.up.railway.app'
        
        let requestData = { email, password }
        
        if (mode === 'register') {
          const firstName = document.getElementById('firstName').value
          const lastName = document.getElementById('lastName').value
          const confirmPassword = document.getElementById('confirmPassword').value
          
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match')
          }
          
          requestData = { ...requestData, first_name: firstName, last_name: lastName }
        }
        
        const response = await fetch(`${backendUrl}/api/auth/${mode === 'login' ? 'login' : 'register'}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || `${mode} failed`)
        }
        
        // Store authentication data
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        
        // Update React state
        setUser(data.user)
        setAuthToken(data.token)
        
        messageDiv.style.display = 'block'
        messageDiv.style.background = '#dcfce7'
        messageDiv.style.color = '#166534'
        messageDiv.textContent = `${mode === 'login' ? 'Login' : 'Registration'} successful!`
        
        setTimeout(() => {
          window.closeAuthModal()
        }, 1000)
        
      } catch (err) {
        messageDiv.style.display = 'block'
        messageDiv.style.background = '#fef2f2'
        messageDiv.style.color = '#dc2626'
        messageDiv.textContent = err.message
        
        submitBtn.textContent = mode === 'login' ? 'Sign In' : 'Create Account'
        submitBtn.disabled = false
      }
    }

    window.handleLogout = () => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      setUser(null)
      setAuthToken(null)
    }

    window.openDashboard = () => {
      alert('Dashboard feature coming soon! Your account is ready.')
    }
  }, [])

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
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.first_name ? user.first_name[0] : user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
                    </span>
                  </div>
                  <Button variant="outline" onClick={() => window.openDashboard()}>
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => window.handleLogout()}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => openAuthModal('login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => openAuthModal('register')}>
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
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 mb-4">
              🚀 Enhanced Multi-Page Scanning Now Available
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Stop Expensive Accessibility Lawsuits{' '}
            <span className="text-blue-600">Before They Start</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive WCAG compliance scanning that protects your business from costly legal action. 
            Get detailed reports and fix issues before they become $75,000+ lawsuits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Search className="mr-2 h-5 w-5" />
              Start Free Scan
            </Button>
            <Button size="lg" variant="outline">
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

      {/* Scanning Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-blue-600 mr-3" />
                <CardTitle className="text-3xl">Enhanced Website Accessibility Scan</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Comprehensive multi-page accessibility analysis with detailed violation reporting
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Pages to Scan
                  </label>
                  <select
                    value={maxPages}
                    onChange={(e) => setMaxPages(parseInt(e.target.value))}
                    className="w-full text-lg py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={10}>10 pages (Quick scan)</option>
                    <option value={25}>25 pages (Standard)</option>
                    <option value={50}>50 pages (Comprehensive)</option>
                    <option value={100}>100 pages (Deep analysis)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Enhanced Scanning Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multi-page crawling
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sitemap discovery
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    WCAG 2.1 compliance
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
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
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">{scanStatus}</p>
                    <Progress value={scanProgress} className="h-3" />
                  </div>
                </div>
              )}

              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Start Enhanced Scan
                  </>
                )}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                  <span>No signup required</span>
                </div>
                <div className="flex flex-col items-center">
                  <Search className="h-8 w-8 text-blue-500 mb-2" />
                  <span>Comprehensive analysis</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-purple-500 mb-2" />
                  <span>Detailed reports</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scan Results */}
      {scanResults && (
        <section id="scan-results" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-2xl">
                  Scan Results for {scanResults.url}
                </CardTitle>
                <CardDescription>
                  Scanned {scanResults.pages_scanned} pages in {scanResults.scan_duration} seconds
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 space-y-8">
                {/* Risk Alert */}
                {!scanResults.lawsuit_risk?.clean_website && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h3 className="font-bold text-red-900 text-lg mb-2">
                        URGENT: Your website could face ${scanResults.lawsuit_risk?.max_settlement?.toLocaleString() || '0'} in lawsuit damages
                      </h3>
                      <p className="text-red-800">
                        Your accessibility violations could result in ${scanResults.lawsuit_risk?.min_settlement?.toLocaleString() || '0'} to ${scanResults.lawsuit_risk?.max_settlement?.toLocaleString() || '0'} in legal settlements and fees
                      </p>
                      <p className="text-red-800 mt-2">
                        <strong>Lawsuit Probability: {scanResults.lawsuit_risk?.probability || '0'}% ({scanResults.lawsuit_risk?.risk_level || 'UNKNOWN'})</strong>
                      </p>
                    </div>
                  </Alert>
                )}

                {/* Cost Breakdown */}
                {scanResults.lawsuit_risk?.cost_breakdown && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="text-orange-900">Realistic Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(scanResults.lawsuit_risk.cost_breakdown).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                            <span className="font-semibold text-orange-800">
                              ${typeof value === 'number' ? value.toLocaleString() : value}
                            </span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total potential cost exposure:</span>
                            <span className="text-orange-900">
                              ${scanResults.lawsuit_risk?.total_cost?.toLocaleString() || '0'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Violations Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(scanResults.violations_by_severity || {}).map(([severity, count]) => (
                    <Card key={severity} className="text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold mb-2 text-gray-900">
                          {count}
                        </div>
                        <div className="text-sm font-medium text-gray-600 capitalize">
                          {severity}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Compliance Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Progress 
                        value={scanResults.compliance_score || 0} 
                        className="flex-1 h-4"
                      />
                      <Badge 
                        variant={scanResults.compliance_score >= 90 ? "default" : "destructive"}
                        className="text-lg px-3 py-1"
                      >
                        {scanResults.compliance_score || 0}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade CTA */}
                {scanResults.is_free_tier && !scanResults.lawsuit_risk?.clean_website && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-blue-900 mb-2">
                          Get Complete Violation Details & AI-Powered Fixes
                        </h3>
                        <p className="text-blue-700 mb-4">
                          Upgrade to see detailed remediation guides, exact code snippets, and step-by-step implementation instructions.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Upgrade Now - Starting at $59/month
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">SentryPrime</span>
          </div>
          <p className="text-gray-400 mb-4">
            Protecting businesses from accessibility lawsuits since 2025
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <span>WCAG 2.1 Compliant</span>
            <span>•</span>
            <span>Trusted by 1000+ businesses</span>
            <span>•</span>
            <span>Made with ❤️ by Manus</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

