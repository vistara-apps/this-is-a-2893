import React from 'react'
import Button from './Button'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  )
}