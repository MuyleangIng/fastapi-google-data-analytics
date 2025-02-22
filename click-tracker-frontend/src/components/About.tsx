import PageTracker from "./PageTracker"

export default function About() {
  return (
    <PageTracker pageName="/about">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">About Our Analytics Platform</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              We provide comprehensive analytics and monitoring solutions to help you understand and optimize your
              service performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Real-time data tracking and visualization</li>
              <li>Comprehensive service usage analytics</li>
              <li>Performance monitoring and optimization</li>
              <li>Custom dashboards and reporting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Chart.js</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Backend</h3>
                <ul className="text-sm text-gray-600">
                  <li>WebSocket</li>
                  <li>Real-time Processing</li>
                  <li>Data Analytics</li>
                  <li>REST API</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTracker>
  )
}

