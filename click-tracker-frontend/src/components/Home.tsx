import PageTracker from "./PageTracker"

export default function Home() {
  return (
    <PageTracker pageName="/">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Analytics Dashboard</h1>
        <p className="text-gray-600 mb-4">Track your service usage and performance metrics in real-time.</p>
        <div className="grid gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Real-time Tracking</h2>
            <p className="text-blue-600">Monitor page views and user interactions as they happen.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Service Analytics</h2>
            <p className="text-green-600">Get insights into how your services are being used.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Performance Metrics</h2>
            <p className="text-purple-600">Track response times and system performance.</p>
          </div>
        </div>
      </div>
    </PageTracker>
  )
}

