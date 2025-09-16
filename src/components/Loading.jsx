import React from 'react'

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export function LoadingSkeleton({ className = '', height = 'h-4' }) {
  return (
    <div className={`animate-pulse bg-slate-700 rounded ${height} ${className}`} />
  )
}

export function LoadingCard({ title = false }) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6 animate-pulse">
      {title && <LoadingSkeleton className="w-1/3 mb-4" height="h-6" />}
      <div className="space-y-3">
        <LoadingSkeleton className="w-full" />
        <LoadingSkeleton className="w-4/5" />
        <LoadingSkeleton className="w-3/5" />
      </div>
    </div>
  )
}

export function LoadingTable({ rows = 3, cols = 4 }) {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {Array.from({ length: cols }).map((_, i) => (
          <LoadingSkeleton key={i} className="w-full" height="h-5" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-4 mb-3">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <LoadingSkeleton key={colIndex} className="w-4/5" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Loading({ 
  type = 'spinner', 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) {
  if (type === 'card') {
    return <LoadingCard />
  }

  if (type === 'table') {
    return <LoadingTable />
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoadingSpinner size={size} className="text-primary mr-3" />
      <span className="text-slate-300">{text}</span>
    </div>
  )
}