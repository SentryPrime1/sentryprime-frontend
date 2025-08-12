import React from 'react'

const Dashboard = ({ user, onClose }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">SentryPrime Dashboard</h1>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Scan
          </button>
        </div>
      </header>
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Dashboard Test</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg">✅ Dashboard is working!</p>
            <p className="text-gray-600 mt-2">Welcome, {user?.first_name || 'User'}!</p>
            <p className="text-sm text-gray-500 mt-4">
              This confirms the dashboard component loads correctly.
              Next step: Fix the API authentication.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
