import type React from "react"
import Sidebar from "@/components/Sidebar"
import DashboardHead from "@/components/DashboardHead"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto   flex flex-col">
        <DashboardHead />
        <div className='p-8'>
        {children}</div>
        </main>
    </div>
  )
}

