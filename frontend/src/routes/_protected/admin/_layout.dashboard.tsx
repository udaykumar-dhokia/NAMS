import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/_layout/dashboard')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return <div>Hello "/_protected/admin/_layout/dashboard"!</div>
}
