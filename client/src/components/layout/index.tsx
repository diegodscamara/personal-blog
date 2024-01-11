import { NavBar } from '../nav-bar'
import React from 'react'
// import Footer from './footer'; // Uncomment and import your Footer component
type LayoutProps = {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <main className="px-8">{children}</main>
      {/* <Footer /> // Uncomment when you have a Footer component */}
    </>
  )
}

export default Layout
