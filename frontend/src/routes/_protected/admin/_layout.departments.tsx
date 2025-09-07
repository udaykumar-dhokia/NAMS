import type { RootState } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { AddDepartmentDialog } from '@/components/custom/Dialogs/AddDepartmentDialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/admin/_layout/departments')({
  component: RouteComponent,
})

function RouteComponent() {
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )

  const [searchQuery, setSearchQuery] = useState('')

  // Filter departments by query
  const filteredDepartments = departments?.filter((dept) => {
    const query = searchQuery.toLowerCase()
    return (
      dept.name.toLowerCase().includes(query) ||
      (dept.shortName && dept.shortName.toLowerCase().includes(query)) ||
      (dept.code && dept.code.toLowerCase().includes(query)) ||
      String(dept.degreesOffered?.length || 0).includes(query)
    )
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Departments</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant={'outline'} className="flex gap-1">
            <RefreshCcw /> Refresh
          </Button>
          <AddDepartmentDialog />
        </div>
      </div>

      {/* Departments List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments?.length ? (
          filteredDepartments.map((dept) => (
            <Card key={dept._id} className="rounded-md">
              <CardHeader>
                <CardTitle>{dept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Short Name: {dept.shortName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Code: {dept.code || 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Degrees Offered: {dept.degreesOffered?.length || 0}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No departments found</p>
        )}
      </div>
    </div>
  )
}
