import React from 'react'

export default function Input({type = 'text', className = '', ...props}) {
  return (
    <input type = {type} 
      className = {`
        border border-[var(--primary-color)]
        rounded-[var(--radius-md)]
        px-4 py-2
        focus:outline-none
        focus:ring-2 focus:ring-[var(--primary-color)]
        ${className}
      `}
      {...props}
    />
  )
}