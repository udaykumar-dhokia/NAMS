import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddCourseDialog } from '@/components/custom/Dialogs/AddCourseDialog'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import type { RootState } from '@/store/store'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/admin/_layout/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  const { courses } = useSelector((state: RootState) => state.courseReducer)
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )
  const { degrees } = useSelector((state: RootState) => state.degreesReducer)
  // const { faculties } = useSelector((state: RootState) => state.facultyReducer)

  const [searchQuery, setSearchQuery] = useState('')

  // Helper functions to get names from IDs
  const getDepartmentName = (id: string) =>
    departments.find((d) => d._id === id)?.name || '-'
  const getDegreeName = (id: string) =>
    degrees.find((d) => d._id === id)?.name || '-'
  // const getFacultyName = (id: string) =>
  //   faculties.find((f) => f._id === id)?.name || '-'

  // Filter courses
  const filteredCourses = courses?.filter((course) => {
    const query = searchQuery.toLowerCase()
    return (
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query) ||
      String(course.credits).includes(query) ||
      getDepartmentName(course.department).toLowerCase().includes(query) ||
      getDegreeName(course.degree).toLowerCase().includes(query) ||
      (course.type && course.type.toLowerCase().includes(query)) ||
      (course.status && course.status.toLowerCase().includes(query)) ||
      (course.description && course.description.toLowerCase().includes(query))
    )
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button
            variant="outline"
            className="flex gap-1"
            onClick={() => console.log('Refresh clicked')}
          >
            <RefreshCcw /> Refresh
          </Button>
          <AddCourseDialog />
        </div>
      </div>

      {/* Courses List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses?.length ? (
          filteredCourses.map((course) => (
            <Card key={course._id} className="rounded-md">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Code: {course.code}
                </p>
                <p className="text-sm text-muted-foreground">
                  Credits: {course.credits}
                </p>
                <p className="text-sm text-muted-foreground">
                  Department: {getDepartmentName(course.department)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Degree: {getDegreeName(course.degree)}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                  Faculty:{' '}
                  {course.faculty ? getFacultyName(course.faculty) : '-'}
                </p> */}
                <p className="text-sm text-muted-foreground">
                  Type: {course.type || '-'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {course.status || '-'}
                </p>
                {course.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {course.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No courses found</p>
        )}
      </div>
    </div>
  )
}
