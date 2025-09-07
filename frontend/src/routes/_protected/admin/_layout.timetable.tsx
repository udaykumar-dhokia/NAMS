import { AddTimetableDialog } from '@/components/custom/Dialogs/AddTimetableDialog'
import { Button } from '@/components/ui/button'
import type { RootState } from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'
import { RefreshCcw, Pencil, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { axiosInstance } from '@/api/axiosInstance'

interface Department {
  _id: string
  name: string
}

interface Course {
  _id: string
  name: string
}

interface TimetableEntry {
  course: string
  start: string
  end: string
}

interface TimetableDays {
  Mon: TimetableEntry[]
  Tue: TimetableEntry[]
  Wed: TimetableEntry[]
  Thu: TimetableEntry[]
  Fri: TimetableEntry[]
  Sat: TimetableEntry[]
}

interface Timetable {
  _id?: string
  department: string
  semester: number
  college?: string
  timetable: TimetableDays
}

export const Route = createFileRoute('/_protected/admin/_layout/timetable')({
  component: RouteComponent,
})

function RouteComponent() {
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  ) as { departments: Department[] }

  const { timetables } = useSelector(
    (state: RootState) => state.timetableReducer,
  ) as { timetables: Timetable[] }

  const { courses } = useSelector(
    (state: RootState) => state.courseReducer,
  ) as { courses: Course[] }

  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedSemester, setSelectedSemester] = useState<number>(1)

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const API_BASE = '/timetables' // ✅ no need for full url, axiosInstance handles baseURL

  useEffect(() => {
    if (departments.length > 0 && !selectedDepartment) {
      setSelectedDepartment(departments[0]._id)
    }
  }, [departments])

  const courseMap: Record<string, string> = {}
  courses.forEach((c) => (courseMap[c._id] = c.name))

  const currentTimetable = timetables.find(
    (t) =>
      t.department === selectedDepartment && t.semester === selectedSemester,
  )

  const timeSlots: string[] = []
  if (currentTimetable) {
    days.forEach((day) => {
      currentTimetable.timetable[day as keyof TimetableDays]?.forEach(
        (slot) => {
          if (!timeSlots.includes(slot.start)) timeSlots.push(slot.start)
        },
      )
    })
    timeSlots.sort((a, b) => {
      const [aH, aM] = a.split(':').map(Number)
      const [bH, bM] = b.split(':').map(Number)
      return aH - bH || aM - bM
    })
  }

  const handleDelete = async (timetableId: string) => {
    if (!confirm('Are you sure you want to delete this timetable?')) return
    try {
      const { data } = await axiosInstance.delete(`${API_BASE}/${timetableId}`)
      alert('Deleted successfully!')
      console.log(data)
      window.location.reload()
    } catch (error: any) {
      console.error(error)
      alert(error.response?.data?.message || 'Failed to delete')
    }
  }

  const handleUpdate = async (
    timetableId: string,
    updates: Partial<Timetable>,
  ) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_BASE}/${timetableId}`,
        updates,
      )
      alert('Updated successfully!')
      console.log(data)
      window.location.reload()
    } catch (error: any) {
      console.error(error)
      alert(error.response?.data?.message || 'Failed to update')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Departments</h1>
        <div className="flex items-center gap-2">
          <Button variant={'outline'} className="flex gap-1">
            <RefreshCcw /> Refresh
          </Button>
          <AddTimetableDialog />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept._id} value={dept._id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSemester.toString()}
          onValueChange={(val) => setSelectedSemester(Number(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
              <SelectItem key={sem} value={sem.toString()}>
                Semester {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Timetable Grid */}
      {currentTimetable ? (
        <Card className="overflow-auto rounded-md">
          <CardContent>
            <table className="w-full border border-gray-200 table-auto text-sm rounded-md">
              <thead>
                <tr>
                  <th className="border p-2 sticky top-0 left-0 bg-gray-50">
                    Day
                  </th>
                  {timeSlots.map((time) => (
                    <th
                      key={time}
                      className="border p-2 sticky top-0 bg-gray-50"
                    >
                      {time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border p-2 font-medium bg-gray-50 sticky left-0">
                      {day}
                    </td>
                    {timeSlots.map((time) => {
                      const slot = currentTimetable.timetable[
                        day as keyof TimetableDays
                      ]?.find((s) => s.start === time)

                      let bgColor = 'bg-white'
                      if (slot) {
                        const colors = [
                          'bg-red-200',
                          'bg-green-200',
                          'bg-blue-200',
                          'bg-yellow-200',
                          'bg-purple-200',
                          'bg-pink-200',
                          'bg-teal-200',
                          'bg-orange-200',
                        ]
                        const index = slot.course
                          .split('')
                          .reduce((acc, char) => acc + char.charCodeAt(0), 0)
                        bgColor = colors[index % colors.length]
                      }

                      return (
                        <td
                          key={time}
                          className={`border p-2 text-center align-middle ${bgColor}`}
                        >
                          {slot ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-medium">
                                {courseMap[slot.course] || 'Unknown'}
                              </span>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-muted-foreground">
          No timetable available for selected department/semester.
        </div>
      )}
    </div>
  )
}
