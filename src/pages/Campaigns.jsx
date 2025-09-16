import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import { Plus, Send, Calendar, Eye, Edit, Trash2, MessageSquare, Users, Clock } from 'lucide-react'

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale Promotion',
      content: 'Hi {{firstName}}! 🌞 Don\'t miss our Summer Sale - 20% off all services this week! Book now: textspark.co/book',
      messageType: 'SMS',
      status: 'delivered',
      segmentIds: ['VIP', 'Regular'],
      scheduledTime: null,
      sentCount: 1234,
      deliveredCount: 1215,
      openRate: 92.1,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      name: 'Appointment Reminders',
      content: 'Hi {{firstName}}, this is a reminder about your {{serviceType}} appointment tomorrow at {{time}}. Reply CONFIRM to confirm.',
      messageType: 'SMS',
      status: 'sending',
      segmentIds: ['All'],
      scheduledTime: null,
      sentCount: 456,
      deliveredCount: 445,
      openRate: 89.3,
      createdAt: '2024-01-15T09:00:00Z'
    },
    {
      id: 3,
      name: 'New Service Launch',
      content: 'Exciting news {{firstName}}! We\'re launching our new premium spa service. Be among the first to experience luxury wellness. Book your session today!',
      messageType: 'MMS',
      status: 'scheduled',
      segmentIds: ['VIP'],
      scheduledTime: '2024-01-16T09:00:00Z',
      sentCount: 0,
      deliveredCount: 0,
      openRate: 0,
      createdAt: '2024-01-15T08:00:00Z'
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    content: '',
    messageType: 'SMS',
    segmentIds: [],
    scheduledTime: '',
    isScheduled: false
  })

  const segments = ['All', 'VIP', 'Regular', 'Hair Care', 'Auto Service', 'Dental', 'Wellness']

  const handleCreateCampaign = () => {
    const campaign = {
      id: Date.now(),
      ...newCampaign,
      status: newCampaign.isScheduled ? 'scheduled' : 'draft',
      sentCount: 0,
      deliveredCount: 0,
      openRate: 0,
      createdAt: new Date().toISOString()
    }
    setCampaigns([...campaigns, campaign])
    setNewCampaign({
      name: '',
      content: '',
      messageType: 'SMS',
      segmentIds: [],
      scheduledTime: '',
      isScheduled: false
    })
    setIsCreateModalOpen(false)
  }

  const handleSendCampaign = (campaignId) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId 
        ? { ...c, status: 'sending' }
        : c
    ))
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    setNewCampaign({
      name: campaign.name,
      content: campaign.content,
      messageType: campaign.messageType,
      segmentIds: campaign.segmentIds,
      scheduledTime: campaign.scheduledTime || '',
      isScheduled: !!campaign.scheduledTime
    })
    setIsCreateModalOpen(true)
  }

  const handleUpdateCampaign = () => {
    setCampaigns(campaigns.map(c => 
      c.id === editingCampaign.id 
        ? { ...c, ...newCampaign, status: newCampaign.isScheduled ? 'scheduled' : 'draft' }
        : c
    ))
    setEditingCampaign(null)
    setNewCampaign({
      name: '',
      content: '',
      messageType: 'SMS',
      segmentIds: [],
      scheduledTime: '',
      isScheduled: false
    })
    setIsCreateModalOpen(false)
  }

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-900 text-green-300'
      case 'sending': return 'bg-blue-900 text-blue-300'
      case 'scheduled': return 'bg-yellow-900 text-yellow-300'
      case 'draft': return 'bg-gray-900 text-gray-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const stats = [
    { label: 'Total Campaigns', value: campaigns.length, color: 'text-blue-400' },
    { label: 'Active', value: campaigns.filter(c => c.status === 'sending').length, color: 'text-green-400' },
    { label: 'Scheduled', value: campaigns.filter(c => c.status === 'scheduled').length, color: 'text-yellow-400' },
    { label: 'Delivered', value: campaigns.filter(c => c.status === 'delivered').length, color: 'text-purple-400' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          <p className="text-slate-400 mt-2">Create and manage your text marketing campaigns</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Campaigns List */}
      <Card>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-slate-600 text-slate-300 rounded-full">
                      {campaign.messageType}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">{campaign.content}</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">
                        {campaign.segmentIds.length} segment{campaign.segmentIds.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{campaign.sentCount} sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{campaign.deliveredCount} delivered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{campaign.openRate}% open rate</span>
                    </div>
                  </div>

                  {campaign.scheduledTime && (
                    <div className="flex items-center space-x-2 mt-2 text-sm text-yellow-400">
                      <Clock className="h-4 w-4" />
                      <span>Scheduled for {new Date(campaign.scheduledTime).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  {campaign.status === 'draft' && (
                    <Button size="sm" onClick={() => handleSendCampaign(campaign.id)}>
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  )}
                  <button
                    onClick={() => handleEditCampaign(campaign)}
                    className="p-2 text-slate-400 hover:text-white transition-base"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-base"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Create/Edit Campaign Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingCampaign(null)
          setNewCampaign({
            name: '',
            content: '',
            messageType: 'SMS',
            segmentIds: [],
            scheduledTime: '',
            isScheduled: false
          })
        }}
        title={editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Campaign Name"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            placeholder="Enter campaign name"
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message Type</label>
            <select
              value={newCampaign.messageType}
              onChange={(e) => setNewCampaign({ ...newCampaign, messageType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="SMS">SMS</option>
              <option value="MMS">MMS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Message Content
              <span className="text-xs text-slate-400 ml-2">
                Use {{`firstName`}}, {{`lastName`}}, {{`serviceType`}}, {{`time`}} for personalization
              </span>
            </label>
            <textarea
              value={newCampaign.content}
              onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
              placeholder="Enter your message content..."
              rows={4}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="text-xs text-slate-400 mt-1">
              {newCampaign.content.length}/160 characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Segments</label>
            <div className="grid grid-cols-2 gap-2">
              {segments.map(segment => (
                <label key={segment} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newCampaign.segmentIds.includes(segment)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewCampaign({ ...newCampaign, segmentIds: [...newCampaign.segmentIds, segment] })
                      } else {
                        setNewCampaign({ ...newCampaign, segmentIds: newCampaign.segmentIds.filter(s => s !== segment) })
                      }
                    }}
                    className="rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-300">{segment}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newCampaign.isScheduled}
                onChange={(e) => setNewCampaign({ ...newCampaign, isScheduled: e.target.checked })}
                className="rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-300">Schedule for later</span>
            </label>
          </div>

          {newCampaign.isScheduled && (
            <Input
              label="Scheduled Time"
              type="datetime-local"
              value={newCampaign.scheduledTime}
              onChange={(e) => setNewCampaign({ ...newCampaign, scheduledTime: e.target.value })}
            />
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsCreateModalOpen(false)
                setEditingCampaign(null)
                setNewCampaign({
                  name: '',
                  content: '',
                  messageType: 'SMS',
                  segmentIds: [],
                  scheduledTime: '',
                  isScheduled: false
                })
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={editingCampaign ? handleUpdateCampaign : handleCreateCampaign}
            >
              {editingCampaign ? 'Update' : 'Create'} Campaign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}