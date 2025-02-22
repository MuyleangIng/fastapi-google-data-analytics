import PageTracker from "./PageTracker"

export default function Services() {
  const trackEvent = async (service: string, event: string) => {
    await fetch(`http://localhost:8000/track/${service}/${event}`, {
      method: "POST",
    })
  }

  return (
    <PageTracker pageName="/services">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>
        <div className="grid gap-8">
          {["Qummit", "QuSpace", "QuMatics"].map((service) => (
            <div key={service} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{service}</h2>
              <p className="text-gray-600 mb-6">
                Experience the power of {service} with our comprehensive analytics and monitoring solutions.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => trackEvent(service, "page_visit")}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Visit {service}
                </button>
                <button
                  onClick={() => trackEvent(service, "compile_click")}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                >
                  Compile on {service}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTracker>
  )
}

