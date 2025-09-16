import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import { Plus, Edit, Trash2, Copy, FileText } from 'lucide-react'

export default function Templates() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Appointment Reminder',
      content: 'Hi {{firstName}}, this is a reminder about your {{serviceType}} appointment tomorrow at {{time}}. Reply CONFIRM to confirm or CANCEL to reschedule.',
      variables: ['firstName', 'serviceType', 'time'],
      category: 'Appointments',
      usageCount: 45
    },
    {
      id: 2,
      name: 'Welcome Message',
      content: 'Welcome to {{businessName}}, {{firstName}}! We\'re excited to serve you. Reply STOP to opt-out at any time.',
      variables: ['firstName', 'businessName'],
      category: 'Welcome',
      usageCount: 23
    },
    {
      id: 3,
      name: 'Promotion Alert',
      content: '🎉 Special offer for you, {{firstName}}! Get {{discount}}% off your next {{serviceType}}. Book now: {{bookingLink}}',
      variables: ['firstName', 'discount', 'serviceType', 'bookingLink'],
      category: 'Promotions',
      usageCount: 67
    },
    {
      id: 4,
      name: 'Follow-up Message',
      content: 'Hi {{firstName}}, how was your {{serviceType}} experience with us? We\'d love your feedback! Rate us: {{reviewLink}}',
      variables: ['firstName', 'serviceType', 'reviewLink'],
      category: 'Follow-up',
      usageCount: 12
    },
    {
      id: 5,
      name: 'Birthday Wishes',
      content: '🎂 Happy Birthday {{firstName}}! Enjoy a special 25% discount on any service this month. Treat yourself!',
      variables: ['firstName'],
      category: 'Special Occasions',
      usageCount: 8
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    content: '',
    category: 'General'
  })

  const categories = ['General', 'Appointments', 'Welcome', 'Promotions', 'Follow-up', 'Special Occasions', 'Reminders']

  // Extract variables from template content
  const extractVariables = (content) => {
    const matches = content.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map(match => match.slice(2, -2)) : []
  }

  const handleCreateTemplate = () => {
    const template = {
      id: Date.now(),
      ...newTemplate,
      variables: extractVariables(newTemplate.content),
      usageCount: 0
    }
    setTemplates([...templates, template])
    setNewTemplate({ name: '', content: '', category: 'General' })
    setIsCreateModalOpen(false)
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setNewTemplate({
      name: template.name,
      content: template.content,
      category: template.category
    })
    setIsCreateModalOpen(true)
  }

  const handleUpdateTemplate = () => {
    setTemplates(templates.map(t => 
      t.id === editingTemplate.id 
        ? { ...t, ...newTemplate, variables: extractVariables(newTemplate.content) }
        : t
    ))
    setEditingTemplate(null)
    setNewTemplate({ name: '', content: '', category: 'General' })
    setIsCreateModalOpen(false)
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  const handleCopyTemplate = (template) => {
    const newTemplate = {
      id: Date.now(),
      name: `${template.name} (Copy)`,
      content: template.content,
      category: template.category,
      variables: template.variables,
      usageCount: 0
    }
    setTemplates([...templates, newTemplate])
  }

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {})

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Message Templates</h1>
          <p className="text-slate-400 mt-2">Create and manage reusable message templates</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Template Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{templates.length}</div>
            <div className="text-sm text-slate-400 mt-1">Total Templates</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{Object.keys(groupedTemplates).length}</div>
            <div className="text-sm text-slate-400 mt-1">Categories</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {templates.reduce((sum, t) => sum + t.usageCount, 0)}
            </div>
            <div className="text-sm text-slate-400 mt-1">Total Uses</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round(templates.reduce((sum, t) => sum + t.usageCount, 0) / templates.length)}
            </div>
            <div className="text-sm text-slate-400 mt-1">Avg. Uses</div>
          </div>
        </Card>
      </div>

      {/* Templates by Category */}
      <div className="space-y-6">
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <Card key={category} title={category}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categoryTemplates.map((template) => (
                <div key={template.id} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-slate-400" />
                      <h4 className="font-semibold text-white">{template.name}</h4>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleCopyTemplate(template)}
                        className="p-1 text-slate-400 hover:text-white transition-base"
                        title="Duplicate template"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="p-1 text-slate-400 hover:text-white transition-base"
                        title="Edit template"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-base"
                        title="Delete template"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-3 line-clamp-3">{template.content}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Variables: </span>
                      <span className="text-slate-300">
                        {template.variables.length > 0 ? template.variables.join(', ') : 'None'}
                      </span>
                    </div>
                    <div className="text-slate-400">
                      Used {template.usageCount} times
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Template Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingTemplate(null)
          setNewTemplate({ name: '', content: '', category: 'General' })
        }}
        title={editingTemplate ? 'Edit Template' : 'Create New Template'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Template Name"
            value={newTemplate.name}
            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            placeholder="Enter template name"
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={newTemplate.category}
              onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Message Content
              <span className="text-xs text-slate-400 ml-2">
                Use {{`variableName`}} for dynamic content
              </span>
            </label>
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
              placeholder="Enter your template content..."
              rows={5}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="text-xs text-slate-400 mt-1">
              {newTemplate.content.length}/160 characters
            </div>
          </div>

          {newTemplate.content && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Detected Variables
              </label>
              <div className="flex flex-wrap gap-2">
                {extractVariables(newTemplate.content).map((variable) => (
                  <span key={variable} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-full">
                    {variable}
                  </span>
                ))}
                {extractVariables(newTemplate.content).length === 0 && (
                  <span className="text-slate-400 text-sm">No variables detected</span>
                )}
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsCreateModalOpen(false)
                setEditingTemplate(null)
                setNewTemplate({ name: '', content: '', category: 'General' })
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
            >
              {editingTemplate ? 'Update' : 'Create'} Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}