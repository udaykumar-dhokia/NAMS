import type { RootState } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/_protected/admin/_layout/dashboard')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const adminData = useSelector((state: RootState) => state.adminReducer)
  console.log(adminData)
  return <div>Hello "/_protected/admin/_layout/dashboard"!</div>
}
