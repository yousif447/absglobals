import React from 'react'

export default function Section({children, className = '', ...props}) {
  return (
    <section className={`py-16 ${className}`} {...props}>
        {children}
    </section>
  )
}