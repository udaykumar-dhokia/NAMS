import { AppSidebar } from '@/components/custom/Sidebars/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { setAdmin } from '@/store/slices/admin.slice'
import { setColleges } from '@/store/slices/college.slice'
import { setCourses } from '@/store/slices/course.slice'
import { setDegrees } from '@/store/slices/degree.slice'
import { setDepartments } from '@/store/slices/department.slice'
import { store } from '@/store/store'
import {
  persistAdminData,
  persistCollegeData,
  persistCourseData,
  persistDegreesData,
  persistDepartmentData,
} from '@/utils/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/_layout')({
  component: AdminLayout,
  beforeLoad: async () => {
    const user = await persistAdminData()
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
    const college = await persistCollegeData(user.college)
    const degrees = await persistDegreesData(user.college)
    const departments = await persistDepartmentData(user.college)
    const courses = await persistCourseData(user.college)

    store.dispatch(setAdmin(user))
    store.dispatch(setColleges(college))
    store.dispatch(setDegrees(degrees))
    store.dispatch(setDepartments(departments))
    store.dispatch(setCourses(courses))
  },
})

function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  )
}
