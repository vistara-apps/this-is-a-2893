import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { Plus, Search, Filter, Upload, Edit, Trash2, Phone, Mail, Tag, Users } from 'lucide-react'

export default function Contacts() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      phoneNumber: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      segments: ['VIP', 'Hair Care'],
      optInStatus: 'opted-in',
      lastContact: '2024-01-15'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Chen',
      phoneNumber: '+1 (555) 234-5678',
      email: 'mike.chen@email.com',
      segments: ['Auto Service'],
      optInStatus: 'opted-in',
      lastContact: '2024-01-14'
    },
    {
      id: 3,
      firstName: 'Emma',
      lastName: 'Davis',
      phoneNumber: '+1 (555) 345-6789',
      email: 'emma.davis@email.com',
      segments: ['Dental', 'Regular'],
      optInStatus: 'opted-in',
      lastContact: '2024-01-13'
    },
    {
      id: 4,
      firstName: 'James',
      lastName: 'Wilson',
      phoneNumber: '+1 (555) 456-7890',
      email: 'james.wilson@email.com',
      segments: ['Wellness'],
      optInStatus: 'opted-out',
      lastContact: '2024-01-10'
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    segments: []
  })

  const segments = ['VIP', 'Hair Care', 'Auto Service', 'Dental', 'Regular', 'Wellness']

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.phoneNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = selectedSegment === 'all' || contact.segments.includes(selectedSegment)
    return matchesSearch && matchesSegment
  })

  const handleAddContact = () => {
    const contact = {
      id: Date.now(),
      ...newContact,
      optInStatus: 'opted-in',
      lastContact: new Date().toISOString().split('T')[0]
    }
    setContacts([...contacts, contact])
    setNewContact({ firstName: '', lastName: '', phoneNumber: '', email: '', segments: [] })
    setIsAddModalOpen(false)
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setNewContact(contact)
    setIsAddModalOpen(true)
  }

  const handleUpdateContact = () => {
    setContacts(contacts.map(c => c.id === editingContact.id ? { ...newContact, id: editingContact.id } : c))
    setEditingContact(null)
    setNewContact({ firstName: '', lastName: '', phoneNumber: '', email: '', segments: [] })
    setIsAddModalOpen(false)
  }

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact)
    setDeleteConfirmOpen(true)
  }

  const confirmDeleteContact = async () => {
    setIsDeleting(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setContacts(contacts.filter(c => c.id !== contactToDelete.id))
    setDeleteConfirmOpen(false)
    setContactToDelete(null)
    setIsDeleting(false)
  }

  const stats = [
    { label: 'Total Contacts', value: contacts.length, color: 'text-blue-400' },
    { label: 'Opted In', value: contacts.filter(c => c.optInStatus === 'opted-in').length, color: 'text-green-400' },
    { label: 'Opted Out', value: contacts.filter(c => c.optInStatus === 'opted-out').length, color: 'text-red-400' },
    { label: 'Segments', value: segments.length, color: 'text-purple-400' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contacts</h1>
          <p className="text-slate-400 mt-2">Manage your customer contacts and segments</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
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

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Segments</option>
            {segments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Contacts Table */}
      <Card>
        {filteredContacts.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No contacts found"
            description={searchTerm || selectedSegment !== 'all' 
              ? "No contacts match your current filters. Try adjusting your search criteria."
              : "Get started by adding your first contact or importing from CSV."
            }
            actionText={searchTerm || selectedSegment !== 'all' ? null : "Add Contact"}
            onAction={searchTerm || selectedSegment !== 'all' ? null : () => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Contact</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Segments</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Last Contact</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-white font-medium">{contact.firstName} {contact.lastName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-slate-300 text-sm">
                          <Phone className="h-3 w-3 mr-2 text-slate-400" />
                          {contact.phoneNumber}
                        </div>
                        <div className="flex items-center text-slate-300 text-sm">
                          <Mail className="h-3 w-3 mr-2 text-slate-400" />
                          {contact.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.segments.map((segment) => (
                          <span key={segment} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-full border border-slate-500">
                            {segment}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        contact.optInStatus === 'opted-in' 
                          ? 'bg-green-900/50 text-green-300 border border-green-700' 
                          : 'bg-red-900/50 text-red-300 border border-red-700'
                      }`}>
                        {contact.optInStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 text-sm">
                      {contact.lastContact}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-all"
                          title="Edit contact"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete contact"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Contact Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingContact(null)
          setNewContact({ firstName: '', lastName: '', phoneNumber: '', email: '', segments: [] })
        }}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={newContact.firstName}
              onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
              placeholder="Enter first name"
            />
            <Input
              label="Last Name"
              value={newContact.lastName}
              onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
              placeholder="Enter last name"
            />
          </div>
          <Input
            label="Phone Number"
            value={newContact.phoneNumber}
            onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Email"
            type="email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            placeholder="Enter email address"
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Segments</label>
            <div className="grid grid-cols-2 gap-2">
              {segments.map(segment => (
                <label key={segment} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newContact.segments.includes(segment)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewContact({ ...newContact, segments: [...newContact.segments, segment] })
                      } else {
                        setNewContact({ ...newContact, segments: newContact.segments.filter(s => s !== segment) })
                      }
                    }}
                    className="rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-300">{segment}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsAddModalOpen(false)
                setEditingContact(null)
                setNewContact({ firstName: '', lastName: '', phoneNumber: '', email: '', segments: [] })
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={editingContact ? handleUpdateContact : handleAddContact}
            >
              {editingContact ? 'Update' : 'Add'} Contact
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteContact}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contactToDelete?.firstName} ${contactToDelete?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  )
}