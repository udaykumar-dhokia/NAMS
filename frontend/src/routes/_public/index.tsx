import Footer from '@/components/custom/Footer'
import Hero from '@/components/custom/Hero'
import Navbar from '@/components/custom/Navbar'
import Stats from '@/components/custom/Stats'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Footer />
    </>
  )
}
