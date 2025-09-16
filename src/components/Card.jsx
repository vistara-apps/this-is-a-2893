import React from 'react'

export default function Card({ 
  title, 
  children, 
  className = '', 
  headerActions = null, 
  variant = 'default',
  padding = 'normal' 
}) {
  const variants = {
    default: 'bg-slate-800 border-slate-700',
    elevated: 'bg-slate-800 border-slate-600 shadow-xl',
    subtle: 'bg-slate-800/50 border-slate-700/50',
    accent: 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8'
  }

  const variantClass = variants[variant] || variants.default

  return (
    <div className={`rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 ${variantClass} ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-transparent to-slate-700/10">
          <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
          {headerActions}
        </div>
      )}
      <div className={paddingClasses[padding] || paddingClasses.normal}>
        {children}
      </div>
    </div>
  )
}