// app/page.tsx
'use client';

export default function HomePage() {
  const sections = [
    {
      title: "Categories",
      description: "Manage customer categories",
      addLink: "/categories/add",
      viewLink: "/categories/view",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Units",
      description: "Manage measurement units",
      addLink: "/units/add",
      viewLink: "/units/view",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Stocks",
      description: "Manage stock inventory",
      addLink: "/stocks/add",
      viewLink: "/stocks/view",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "Customers",
      description: "Manage customer database",
      addLink: "/customers/add",
      viewLink: "/customers/view",
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-600"
    },
    {
      title: "Advance Booking",
      description: "Manage advance bookings",
      addLink: "/bookings/add",
      viewLink: "/bookings/view",
      bgColor: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600"
    },
    {
      title: "Demand",
      description: "Manage customer demands",
      addLink: "/demands/add",
      viewLink: "/demands/view",
      bgColor: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600"
    },
    {
      title: "Supply",
      description: "Manage supplies",
      addLink: "/supplies/add",
      viewLink: "/supplies/view",
      bgColor: "bg-pink-500",
      hoverColor: "hover:bg-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className={`${section.bgColor} px-4 py-5 sm:p-6`}>
                  <h3 className="text-lg font-medium text-white">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-white opacity-90">
                    {section.description}
                  </p>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex justify-between space-x-4">
                    <a
                      href={section.addLink}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${section.bgColor} ${section.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${section.bgColor.split('-')[1]}-500`}
                    >
                      Add New
                    </a>
                    <a
                      href={section.viewLink}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Quick Stats
              </h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">
                    Total Customers
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">
                    Active Bookings
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">
                    Open Demands
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">
                    Pending Supplies
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    0
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
              <div className="mt-4">
                <div className="border-t border-gray-200">
                  <p className="py-4 text-sm text-gray-500 text-center">
                    No recent activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}