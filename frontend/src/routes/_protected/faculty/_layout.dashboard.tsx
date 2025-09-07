// src/routes/_protected/faculty/_layout/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, User, BookOpen, Users } from 'lucide-react'
import { FloatingButton } from '@/components/custom/FloatingButton'

export const Route = createFileRoute('/_protected/faculty/_layout/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  // Define a type for college and department if not already defined
  type College = { name: string } | string | null | undefined
  type Department = { name: string } | string | null | undefined

  // Add explicit typing for faculty
  const { faculty } = useSelector(
    (state: RootState) => state.facultyReducer,
  ) as {
    faculty: {
      name?: string
      email?: string
      phone?: string
      college?: College
      department?: Department
      designation?: string
      isHOD?: boolean
    }
  }
  console.log(faculty)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>

      {/* Faculty Info */}

      {/* Quick Stats */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <BookOpen size={18} /> Courses Assigned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-black">5</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Users size={18} /> Students Mentored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-black">42</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <BookOpen size={18} /> Research Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-black">8</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} /> Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {faculty?.name || '-'}
          </p>
          <p>
            <span className="font-medium">Email:</span> {faculty?.email || '-'}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {faculty?.phone || '-'}
          </p>
          <p>
            <span className="font-medium">College:</span>{' '}
            {typeof faculty?.college === 'object'
              ? faculty?.college?.name
              : faculty?.college || '-'}
          </p>
          <p>
            <span className="font-medium">Department:</span>{' '}
            {typeof faculty?.department === 'object'
              ? faculty?.department?.name
              : faculty?.department || '-'}
          </p>
          <p>
            <span className="font-medium">Designation:</span>{' '}
            {faculty?.designation || '-'}
          </p>
          <p>
            <span className="font-medium">Head of Department:</span>{' '}
            {faculty?.isHOD ? 'Yes' : 'No'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
