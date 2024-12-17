'use client'

import * as React from 'react'
import { BarChart, Activity, Users, Package, Calendar, ShoppingCart, Truck } from 'lucide-react'
import { motion } from 'framer-motion'

const sections = [
  {
    title: "Advance Booking",
    description: "Manage advance bookings",
    addLink: "/bookings/add",
    viewLink: "/bookings/view",
    icon: Calendar,
    color: "yellow",
    gradient: "from-yellow-400 to-yellow-600"
  },
  {
    title: "Demand",
    description: "Manage customer demands",
    addLink: "/demands/add",
    viewLink: "/demands/view",
    icon: ShoppingCart,
    color: "indigo",
    gradient: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Supply",
    description: "Manage supplies",
    addLink: "/supplies/add",
    viewLink: "/supplies/view",
    icon: Truck,
    color: "pink",
    gradient: "from-pink-400 to-pink-600"
  },
  {
    title: "Customers",
    description: "Manage customer database",
    addLink: "/customers/add",
    viewLink: "/customers/view",
    icon: Users,
    color: "red",
    gradient: "from-red-400 to-red-600"
  },
  {
    title: "Stocks",
    description: "Manage stock inventory",
    addLink: "/stocks/add",
    viewLink: "/stocks/view",
    icon: Package,
    color: "purple",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    title: "Units",
    description: "Manage measurement units",
    addLink: "/units/add",
    viewLink: "/units/view",
    icon: Activity,
    color: "green",
    gradient: "from-green-400 to-green-600"
  },
  {
    title: "Categories",
    description: "Manage customer categories",
    addLink: "/categories/add",
    viewLink: "/categories/view",
    icon: BarChart,
    color: "blue",
    gradient: "from-blue-400 to-blue-600"
  }
]

const quickStats = [
  { title: "Total Customers", value: 0 },
  { title: "Active Bookings", value: 0 },
  { title: "Open Demands", value: 0 },
  { title: "Pending Supplies", value: 0 }
]

// Card component
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0 rounded-lg ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 pb-2 ${className || ''}`}>{children}</div>
)

const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={`font-semibold ${className}`}>{children}</h3>
)

const CardDescription = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <p className={`text-sm text-white text-opacity-70 ${className}`}>{children}</p>
)

const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
)

// Button component
const Button = ({ asChild, variant, className, children, href }: { asChild?: boolean, variant?: string, className?: string, children: React.ReactNode, href?: string }) => {
  const baseClassName = `px-4 py-2 rounded-md font-medium transition-colors ${
    variant === 'outline' 
      ? 'bg-transparent hover:bg-white hover:bg-opacity-10 text-white border border-white border-opacity-20' 
      : className
  }`

  if (asChild && href) {
    return (
      <a href={href} className={baseClassName}>
        {children}
      </a>
    )
  }

  return (
    <button className={baseClassName}>
      {children}
    </button>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-white text-opacity-70"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-white text-opacity-70">
                    +0% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Sections */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {sections.slice(0, 4).map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:bg-opacity-20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center">
                    <div className={`relative p-2 rounded-full bg-gradient-to-br ${section.gradient}`}>
                      <section.icon className={`h-6 w-6 text-white`} />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${section.gradient} opacity-75 blur-md -z-10`}></div>
                    </div>
                    <CardTitle className="ml-3 text-white">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Button 
                    asChild 
                    href={section.addLink} 
                    className={`bg-${section.color}-500 hover:bg-${section.color}-600 text-white border-0`}
                  >
                    Add New
                  </Button>
                  <Button 
                    asChild 
                    href={section.viewLink} 
                    variant="outline"
                  >
                    View All
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          {sections.slice(4).map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:bg-opacity-20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center">
                    <div className={`relative p-2 rounded-full bg-gradient-to-br ${section.gradient}`}>
                      <section.icon className={`h-6 w-6 text-white`} />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${section.gradient} opacity-75 blur-md -z-10`}></div>
                    </div>
                    <CardTitle className="ml-3 text-white">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Button 
                    asChild 
                    href={section.addLink} 
                    className={`bg-${section.color}-500 hover:bg-${section.color}-600 text-white border-0`}
                  >
                    Add New
                  </Button>
                  <Button 
                    asChild 
                    href={section.viewLink} 
                    variant="outline"
                  >
                    View All
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

