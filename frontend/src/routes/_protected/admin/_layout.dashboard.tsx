import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/_layout/dashboard')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { colleges } = useSelector((state: RootState) => state.collegeReducer)
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )
  const { degrees } = useSelector((state: RootState) => state.degreesReducer)
  const { courses } = useSelector((state: RootState) => state.courseReducer)

  const college = colleges

  const handleRefresh = () => {
    console.log('Refresh all data')
  }

  // If 'status' does not exist on Department, replace 'd.status' with an existing property or remove the filter
  const activeDepartments = departments?.length || 0
  const activeDegrees =
    degrees?.filter((d) => d.status !== 'inactive').length || 0
  const activeCourses =
    courses?.filter((c) => c.status !== 'inactive').length || 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex gap-1"
        >
          <RefreshCcw /> Refresh
        </Button>
      </div>

      {/* College Details */}
      {college && (
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>{college.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Website: {college.contact?.website || '-'}
            </p>
            <p className="text-sm text-muted-foreground">
              Email: {college.contact?.email || '-'}
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: {college.contact?.phone || '-'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{departments?.length || 0}</p>
            <p className="text-sm text-muted-foreground">
              Active: {activeDepartments}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>Degrees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{degrees?.length || 0}</p>
            <p className="text-sm text-muted-foreground">
              Active: {activeDegrees}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{courses?.length || 0}</p>
            <p className="text-sm text-muted-foreground">
              Active: {activeCourses}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
