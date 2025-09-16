import React from 'react'

const variants = {
  primary: 'bg-primary hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
  secondary: 'bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
  outline: 'border border-slate-600 hover:bg-slate-700 active:bg-slate-800 text-slate-300 hover:text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0',
  danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-700 active:bg-slate-800'
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  children, 
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}