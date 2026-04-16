import React from 'react'

export default function Card({children, className = '', ...props}) {
  return (
    <div className={`border border-[var(--primary-color)] rounded-[var(--radius-md)] p-4 ${className}`} {...props}>
        {children}
    </div>
  )
}
