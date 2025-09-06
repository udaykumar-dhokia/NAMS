import type { RootState } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddDegreeDialog } from '@/components/custom/Dialogs/AddDegreeDialog'
import { RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_protected/admin/_layout/degrees')({
  component: RouteComponent,
})

function RouteComponent() {
  const { degrees } = useSelector((state: RootState) => state.degreesReducer)
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )

  const degreesWithDepartments = degrees?.map((degree) => {
    const relatedDepartments = departments.filter((dept) =>
      dept.degreesOffered.includes(degree._id || ''),
    )
    return { ...degree, relatedDepartments }
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Degrees</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className="flex gap-1"
            onClick={() => {
              // TODO: add refresh logic
              console.log('Refresh clicked')
            }}
          >
            <RefreshCcw /> Refresh
          </Button>
          <AddDegreeDialog />
        </div>
      </div>

      {/* Degrees List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {degreesWithDepartments?.length ? (
          degreesWithDepartments.map((degree) => (
            <Card key={degree._id} className="rounded-md">
              <CardHeader>
                <CardTitle>{degree.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Departments:{' '}
                  {degree.relatedDepartments?.map((d) => d.name).join(', ') ||
                    'None'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Duration: {degree.duration} years
                </p>
                <p className="text-sm text-muted-foreground">
                  Semesters: {degree.semesters || '-'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {degree.status}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No degrees found</p>
        )}
      </div>
    </div>
  )
}
