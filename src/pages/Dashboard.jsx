import React from 'react'
import Card from '../components/Card'
import { MessageSquare, Users, Send, TrendingUp, Calendar, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Contacts',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Messages Sent',
      value: '8,432',
      change: '+23%',
      icon: Send,
      color: 'text-green-400'
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '+2',
      icon: MessageSquare,
      color: 'text-purple-400'
    },
    {
      title: 'Open Rate',
      value: '94.2%',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'text-accent'
    }
  ]

  const recentCampaigns = [
    {
      id: 1,
      name: 'Summer Sale Promotion',
      status: 'delivered',
      sent: '1,234',
      deliveryRate: '98.5%',
      openRate: '92.1%',
      sentAt: '2 hours ago'
    },
    {
      id: 2,
      name: 'Appointment Reminders',
      status: 'sending',
      sent: '456',
      deliveryRate: '97.2%',
      openRate: '89.3%',
      sentAt: '1 hour ago'
    },
    {
      id: 3,
      name: 'New Service Launch',
      status: 'scheduled',
      sent: '0',
      deliveryRate: '-',
      openRate: '-',
      sentAt: 'Tomorrow 9:00 AM'
    }
  ]

  const upcomingAppointments = [
    { id: 1, client: 'Sarah Johnson', service: 'Hair Cut', time: '10:00 AM', phone: '+1 (555) 123-4567' },
    { id: 2, client: 'Mike Chen', service: 'Oil Change', time: '11:30 AM', phone: '+1 (555) 234-5678' },
    { id: 3, client: 'Emma Davis', service: 'Dental Cleaning', time: '2:00 PM', phone: '+1 (555) 345-6789' },
    { id: 4, client: 'James Wilson', service: 'Massage Therapy', time: '3:30 PM', phone: '+1 (555) 456-7890' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back! Here's what's happening with your text marketing.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-700 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <Card title="Recent Campaigns">
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-white">{campaign.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'delivered' ? 'bg-green-900 text-green-300' :
                      campaign.status === 'sending' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Sent: {campaign.sent} | Delivery: {campaign.deliveryRate} | Open: {campaign.openRate}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{campaign.sentAt}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card title="Today's Appointments">
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-white">{appointment.time}</span>
                  </div>
                  <div className="text-sm text-slate-300 mt-1">{appointment.client}</div>
                  <div className="text-xs text-slate-400">{appointment.service}</div>
                </div>
                <button className="px-3 py-1 text-xs bg-primary text-white rounded-lg hover:bg-blue-600 transition-base">
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-base text-left">
            <MessageSquare className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-white">Create Campaign</h4>
            <p className="text-sm text-slate-400">Send a new message to your contacts</p>
          </button>
          <button className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-base text-left">
            <Users className="h-6 w-6 text-green-400 mb-2" />
            <h4 className="font-medium text-white">Import Contacts</h4>
            <p className="text-sm text-slate-400">Add new contacts from CSV</p>
          </button>
          <button className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-base text-left">
            <Calendar className="h-6 w-6 text-purple-400 mb-2" />
            <h4 className="font-medium text-white">Schedule Message</h4>
            <p className="text-sm text-slate-400">Set up automated reminders</p>
          </button>
        </div>
      </Card>
    </div>
  )
}