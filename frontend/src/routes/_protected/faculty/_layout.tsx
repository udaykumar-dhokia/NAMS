import { FloatingButton } from '@/components/custom/FloatingButton'
import { AppSidebar } from '@/components/custom/Sidebars/FacultySidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { setCourses } from '@/store/slices/course.slice'
import { setFaculty } from '@/store/slices/faculty.slice'
import { store } from '@/store/store'
import { persistCourseData, persistFacultyData } from '@/utils/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/faculty/_layout')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await persistFacultyData()
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
    const courses = await persistCourseData(user.user.college._id)
    store.dispatch(setFaculty(user.user))
    store.dispatch(setCourses(courses))
  },
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
      <FloatingButton onClick={() => console.log('Floating Button Clicked')} />
    </SidebarProvider>
  )
}
