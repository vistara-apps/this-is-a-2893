import React from 'react'

export default function Card({ title, children, className = '', headerActions = null }) {
  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 shadow-card ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {headerActions}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}