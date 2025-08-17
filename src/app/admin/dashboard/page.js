'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, Activity, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    admins: 0,
    superAdmins: 0
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user info
      const userResponse = await fetch('/api/auth/me')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData.user)
      }

      // Fetch stats if user is super admin
      const statsResponse = await fetch('/api/admin/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const dashboardCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'All registered users'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      description: 'Currently active users'
    },
    {
      title: 'Administrators',
      value: stats.admins,
      icon: Shield,
      description: 'Admin role users'
    },
    {
      title: 'Super Admins',
      value: stats.superAdmins,
      icon: Settings,
      description: 'Super admin role users'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      {/* Stats Cards */}
      {user?.role === 'SUPER_ADMIN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Role-based Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user?.role === 'SUPER_ADMIN' ? (
                <>
                  <div className="flex items-center text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Create and manage users
                  </div>
                  <div className="flex items-center text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Assign roles and permissions
                  </div>
                  <div className="flex items-center text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    View system analytics
                  </div>
                  <div className="flex items-center text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    System configuration
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-blue-600">
                    <Users className="h-4 w-4 mr-2" />
                    View user information
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Activity className="h-4 w-4 mr-2" />
                    View analytics dashboard
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user?.role === 'SUPER_ADMIN' ? (
                <>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors">
                    Create New User
                  </button>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors">
                    Manage User Roles
                  </button>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors">
                    System Settings
                  </button>
                </>
              ) : (
                <>
                  <div className="p-2 text-gray-500">
                    View Reports
                  </div>
                  <div className="p-2 text-gray-500">
                    Export Data
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}