import React, { useState } from 'react'
import Card from '../components/Card'
import { BarChart3, TrendingUp, TrendingDown, MessageSquare, Users, Send, Eye, Phone } from 'lucide-react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ]

  const metrics = [
    {
      title: 'Messages Sent',
      value: '12,456',
      change: '+12.5%',
      trend: 'up',
      icon: Send,
      color: 'text-blue-400'
    },
    {
      title: 'Delivery Rate',
      value: '98.2%',
      change: '+0.8%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-green-400'
    },
    {
      title: 'Open Rate',
      value: '92.4%',
      change: '-1.2%',
      trend: 'down',
      icon: Eye,
      color: 'text-purple-400'
    },
    {
      title: 'Response Rate',
      value: '23.7%',
      change: '+3.1%',
      trend: 'up',
      icon: Phone,
      color: 'text-accent'
    }
  ]

  const campaignPerformance = [
    {
      name: 'Summer Sale Promotion',
      sent: 1234,
      delivered: 1215,
      opened: 1119,
      responded: 267,
      deliveryRate: 98.5,
      openRate: 92.1,
      responseRate: 21.6
    },
    {
      name: 'Appointment Reminders',
      sent: 456,
      delivered: 445,
      opened: 397,
      responded: 123,
      deliveryRate: 97.6,
      openRate: 89.2,
      responseRate: 27.0
    },
    {
      name: 'Welcome Series',
      sent: 89,
      delivered: 87,
      opened: 81,
      responded: 19,
      deliveryRate: 97.8,
      openRate: 93.1,
      responseRate: 21.3
    },
    {
      name: 'Birthday Promotions',
      sent: 234,
      delivered: 229,
      opened: 201,
      responded: 67,
      deliveryRate: 97.9,
      openRate: 87.8,
      responseRate: 28.6
    }
  ]

  const segmentPerformance = [
    { segment: 'VIP Customers', contacts: 456, openRate: 96.2, responseRate: 31.4 },
    { segment: 'Regular Customers', contacts: 1234, openRate: 91.8, responseRate: 22.1 },
    { segment: 'New Customers', contacts: 234, openRate: 89.3, responseRate: 18.7 },
    { segment: 'Inactive Customers', contacts: 123, openRate: 76.4, responseRate: 8.9 }
  ]

  const hourlyData = [
    { hour: '6 AM', messages: 12 },
    { hour: '7 AM', messages: 45 },
    { hour: '8 AM', messages: 89 },
    { hour: '9 AM', messages: 156 },
    { hour: '10 AM', messages: 234 },
    { hour: '11 AM', messages: 198 },
    { hour: '12 PM', messages: 276 },
    { hour: '1 PM', messages: 298 },
    { hour: '2 PM', messages: 324 },
    { hour: '3 PM', messages: 356 },
    { hour: '4 PM', messages: 289 },
    { hour: '5 PM', messages: 198 },
    { hour: '6 PM', messages: 145 },
    { hour: '7 PM', messages: 98 },
    { hour: '8 PM', messages: 67 },
    { hour: '9 PM', messages: 34 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-2">Track your text marketing performance and insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-700 ${metric.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card title="Campaign Performance">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-300">Campaign</th>
                  <th className="text-right py-2 text-slate-300">Sent</th>
                  <th className="text-right py-2 text-slate-300">Open Rate</th>
                  <th className="text-right py-2 text-slate-300">Response</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="py-3 text-white">{campaign.name}</td>
                    <td className="py-3 text-right text-slate-300">{campaign.sent}</td>
                    <td className="py-3 text-right text-slate-300">{campaign.openRate}%</td>
                    <td className="py-3 text-right text-slate-300">{campaign.responseRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Segment Performance */}
        <Card title="Segment Performance">
          <div className="space-y-4">
            {segmentPerformance.map((segment, index) => (
              <div key={index} className="p-3 bg-slate-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-white">{segment.segment}</h4>
                    <p className="text-sm text-slate-400">{segment.contacts} contacts</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300">Open: {segment.openRate}%</div>
                    <div className="text-sm text-slate-300">Response: {segment.responseRate}%</div>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${segment.openRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Message Volume by Time */}
      <Card title="Message Volume by Time of Day">
        <div className="h-64 flex items-end justify-between space-x-1">
          {hourlyData.map((data, index) => {
            const maxMessages = Math.max(...hourlyData.map(d => d.messages))
            const height = (data.messages / maxMessages) * 100
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full">
                  <div 
                    className="bg-primary rounded-t w-full transition-all duration-300 hover:bg-blue-500"
                    style={{ height: `${height * 2}px` }}
                    title={`${data.hour}: ${data.messages} messages`}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-2 -rotate-45 origin-center">
                  {data.hour}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center text-sm text-slate-400">
          Peak messaging hours are typically between 12 PM - 3 PM
        </div>
      </Card>

      {/* Insights & Recommendations */}
      <Card title="Insights & Recommendations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h4 className="font-medium text-green-300">Best Performing</h4>
            </div>
            <p className="text-sm text-slate-300">
              VIP customer segment has the highest response rate at 31.4%. Consider creating more targeted campaigns for this group.
            </p>
          </div>

          <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-yellow-400" />
              <h4 className="font-medium text-yellow-300">Optimization Tip</h4>
            </div>
            <p className="text-sm text-slate-300">
              Send messages between 12 PM - 3 PM for maximum engagement. Your current peak hours show 35% higher open rates.
            </p>
          </div>

          <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <h4 className="font-medium text-blue-300">Audience Growth</h4>
            </div>
            <p className="text-sm text-slate-300">
              Your contact list grew by 12.5% this month. Consider segmenting new contacts for personalized onboarding campaigns.
            </p>
          </div>

          <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              <h4 className="font-medium text-red-300">Attention Needed</h4>
            </div>
            <p className="text-sm text-slate-300">
              Inactive customer segment has low engagement (8.9% response rate). Consider a re-engagement campaign.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}