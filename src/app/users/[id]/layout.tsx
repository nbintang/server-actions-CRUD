import React from 'react'
export default async function UsersIdLayout({
    children,
    
}:{
    children: React.ReactNode,
    
}) {
    
  return (
    <div className='grid place-items-center min-h-screen'>
        {children}
    </div>
  )
}
