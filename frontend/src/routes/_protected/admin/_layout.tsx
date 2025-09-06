import { setAdmin } from '@/store/slices/admin.slice'
import { store } from '@/store/store'
import { persistAdminData } from '@/utils/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/_layout')({
  component: AdminLayout,
  beforeLoad: async () => {
    const user = await persistAdminData()
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
    console.log(user)
    store.dispatch(setAdmin(user))
  },
})

function AdminLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
