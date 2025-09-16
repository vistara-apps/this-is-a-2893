import React from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import Button from './Button'

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // danger, warning, info
  loading = false
}) {
  if (!isOpen) return null

  const variants = {
    danger: {
      icon: Trash2,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700',
      confirmVariant: 'danger'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-700',
      confirmVariant: 'primary'
    },
    info: {
      icon: AlertTriangle,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700',
      confirmVariant: 'primary'
    }
  }

  const config = variants[variant] || variants.danger
  const Icon = config.icon

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-slate-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-md">
          <div className="px-6 py-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.bgColor} ${config.borderColor} border flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${config.iconColor}`} />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-300">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-slate-900/50 flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={config.confirmVariant}
              className="flex-1"
              onClick={onConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}