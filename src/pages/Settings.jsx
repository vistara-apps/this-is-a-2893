import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { 
  User, 
  Building, 
  Phone, 
  CreditCard, 
  Shield, 
  Bell,
  Smartphone,
  Globe,
  Key,
  AlertTriangle
} from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  })

  const [business, setBusiness] = useState({
    name: 'Sparkle Hair Salon',
    industry: 'Beauty & Wellness',
    address: '123 Main St, Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    website: 'https://sparklehairsalon.com'
  })

  const [twilioSettings, setTwilioSettings] = useState({
    accountSid: 'AC***************************',
    authToken: '********************************',
    phoneNumber: '+1 (555) 987-6543',
    isConnected: true
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    campaignUpdates: true,
    billingAlerts: true,
    systemUpdates: false
  })

  const [complianceSettings, setComplianceSettings] = useState({
    autoOptOut: true,
    optOutKeywords: 'STOP, UNSUBSCRIBE, QUIT, END, CANCEL',
    optInConfirmation: true,
    tcpaCompliance: true
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'business', name: 'Business', icon: Building },
    { id: 'twilio', name: 'SMS Setup', icon: Smartphone },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'api', name: 'API Keys', icon: Key }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )

      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  value={business.name}
                  onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                    <select
                      value={business.industry}
                      onChange={(e) => setBusiness({ ...business, industry: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Beauty & Wellness">Beauty & Wellness</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Retail">Retail</option>
                      <option value="Food & Restaurant">Food & Restaurant</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Input
                    label="Website"
                    value={business.website}
                    onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                  />
                </div>
                <Input
                  label="Address"
                  value={business.address}
                  onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={business.city}
                    onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                  />
                  <Input
                    label="State"
                    value={business.state}
                    onChange={(e) => setBusiness({ ...business, state: e.target.value })}
                  />
                  <Input
                    label="ZIP Code"
                    value={business.zipCode}
                    onChange={(e) => setBusiness({ ...business, zipCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )

      case 'twilio':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Twilio SMS Configuration</h3>
              <div className={`p-4 rounded-lg border mb-4 ${
                twilioSettings.isConnected 
                  ? 'bg-green-900/20 border-green-700' 
                  : 'bg-red-900/20 border-red-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    twilioSettings.isConnected ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-white font-medium">
                    {twilioSettings.isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-1">
                  {twilioSettings.isConnected 
                    ? 'Your Twilio account is successfully connected and ready to send messages.'
                    : 'Please configure your Twilio credentials to start sending messages.'
                  }
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Account SID"
                  value={twilioSettings.accountSid}
                  onChange={(e) => setTwilioSettings({ ...twilioSettings, accountSid: e.target.value })}
                  placeholder="AC..."
                />
                <Input
                  label="Auth Token"
                  type="password"
                  value={twilioSettings.authToken}
                  onChange={(e) => setTwilioSettings({ ...twilioSettings, authToken: e.target.value })}
                  placeholder="Enter your Twilio auth token"
                />
                <Input
                  label="Phone Number"
                  value={twilioSettings.phoneNumber}
                  onChange={(e) => setTwilioSettings({ ...twilioSettings, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">Test Connection</Button>
              <Button>Save Configuration</Button>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
              <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-white">Pro Plan</h4>
                    <p className="text-slate-300">Up to 2,000 contacts</p>
                    <p className="text-slate-300">Unlimited campaigns</p>
                    <p className="text-slate-300">Advanced analytics</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$79</div>
                    <div className="text-sm text-slate-400">per month</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">1,847</div>
                    <div className="text-sm text-slate-400">Contacts</div>
                    <div className="text-xs text-slate-500 mt-1">92% of limit</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">8,432</div>
                    <div className="text-sm text-slate-400">Messages Sent</div>
                    <div className="text-xs text-slate-500 mt-1">Unlimited</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">12</div>
                    <div className="text-sm text-slate-400">Campaigns</div>
                    <div className="text-xs text-slate-500 mt-1">Unlimited</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
              <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="text-white">•••• •••• •••• 4242</div>
                      <div className="text-sm text-slate-400">Expires 12/25</div>
                    </div>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="danger">Cancel Subscription</Button>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-slate-400">
                        {key === 'emailAlerts' && 'Receive email notifications for important updates'}
                        {key === 'smsAlerts' && 'Get SMS alerts for critical system events'}
                        {key === 'campaignUpdates' && 'Campaign delivery status and performance updates'}
                        {key === 'billingAlerts' && 'Payment confirmations and billing reminders'}
                        {key === 'systemUpdates' && 'New features and system maintenance notifications'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        )

      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h4 className="font-medium text-yellow-300">TCPA Compliance</h4>
              </div>
              <p className="text-sm text-slate-300 mt-2">
                These settings help ensure compliance with TCPA regulations. Modifying these settings may affect your legal compliance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Auto Opt-Out Processing</div>
                    <div className="text-sm text-slate-400">Automatically process opt-out requests</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={complianceSettings.autoOptOut}
                      onChange={(e) => setComplianceSettings({ ...complianceSettings, autoOptOut: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Opt-In Confirmation</div>
                    <div className="text-sm text-slate-400">Send confirmation message for new subscribers</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={complianceSettings.optInConfirmation}
                      onChange={(e) => setComplianceSettings({ ...complianceSettings, optInConfirmation: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Opt-Out Keywords
                  </label>
                  <input
                    type="text"
                    value={complianceSettings.optOutKeywords}
                    onChange={(e) => setComplianceSettings({ ...complianceSettings, optOutKeywords: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="STOP, UNSUBSCRIBE, QUIT, END, CANCEL"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Comma-separated list of keywords that trigger automatic opt-out
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">API Configuration</h3>
              <p className="text-slate-400 mb-4">
                Use these API keys to integrate TextSpark with your existing systems.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Live API Key</h4>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                  <div className="font-mono text-sm text-slate-300 bg-slate-800 p-2 rounded border">
                    sk_live_****************************
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Use this key for production applications
                  </p>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Test API Key</h4>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                  <div className="font-mono text-sm text-slate-300 bg-slate-800 p-2 rounded border">
                    sk_test_****************************
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Use this key for testing and development
                  </p>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Webhook URL</h4>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="font-mono text-sm text-slate-300 bg-slate-800 p-2 rounded border">
                    https://yourapp.com/webhooks/textspark
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Receive real-time updates about message delivery status
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">API Documentation</h3>
              <div className="p-4 bg-slate-700 rounded-lg">
                <p className="text-slate-300 mb-3">
                  Integrate TextSpark into your applications with our RESTful API.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    View API Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Download SDK Examples
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account, business, and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-base ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card>
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </div>
  )
}