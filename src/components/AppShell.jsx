import React from 'react'
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings,
  Zap,
  Bell,
  Search,
  User
} from 'lucide-react'

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'contacts', name: 'Contacts', icon: Users },
  { id: 'campaigns', name: 'Campaigns', icon: MessageSquare },
  { id: 'templates', name: 'Templates', icon: FileText },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export default function AppShell({ currentPage, onPageChange, children }) {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent to-yellow-500 rounded-lg shadow-lg">
              <Zap className="h-6 w-6 text-slate-900" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">TextSpark</span>
              <div className="text-xs text-slate-400 font-medium">Smart Text Marketing</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`group w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-200 ${
                  currentPage === item.id ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                <span className="font-medium">{item.name}</span>
                {currentPage === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">John Doe</div>
              <div className="text-xs text-slate-400 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Pro Plan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search contacts, campaigns..."
                  className="bg-slate-700/80 backdrop-blur-sm text-white pl-10 pr-4 py-2.5 rounded-lg border border-slate-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-80 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                <Bell className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></div>
              </button>
              <div className="w-px h-6 bg-slate-600"></div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">Good afternoon</div>
                <div className="text-xs text-slate-400">Ready to engage?</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}