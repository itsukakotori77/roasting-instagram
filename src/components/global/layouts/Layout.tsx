import React from 'react'
import Header from './Header'

interface IProps {
   title?: string
   children: React.ReactNode
}

const Layout = ({ title, children }: IProps) => {
   return (
      <div className="w-full h-screen">
         <div className="grid h-full">
            <Header />
            {children}
         </div>
      </div>
   )
}

export default Layout 
