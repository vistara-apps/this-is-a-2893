import React from 'react'

const variants = {
  primary: 'bg-primary hover:bg-blue-600 text-white',
  secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
  outline: 'border border-slate-600 hover:bg-slate-700 text-slate-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  ...props 
}) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800'
  const variantClasses = variants[variant] || variants.primary
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}