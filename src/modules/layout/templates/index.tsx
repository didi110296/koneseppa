import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

const Layout = ({ children, dark }: { children: React.ReactNode; dark: boolean; }) => {
  return (
    <div className={dark === true ? 'bg-slate-800 text-white min-h-screen' : ''}>
      <Nav dark={dark} />
      <main className={"relative"}>{children}</main>
      <Footer dark={dark} />
    </div>
  )
}

export default Layout
