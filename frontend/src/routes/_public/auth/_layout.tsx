import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/auth/_layout')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
