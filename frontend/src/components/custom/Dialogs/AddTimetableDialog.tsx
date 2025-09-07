import * as React from 'react'
import { useSelector } from 'react-redux'
import { store, type RootState } from '@/store/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import { axiosInstance } from '@/api/axiosInstance'
import { addTimetable } from '@/store/slices/timetable.slice'

type CourseSlot = {
  course: string
  start: string
  end: string
}

type DayTimetable = CourseSlot[]

export function AddTimetableDialog() {
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )
  const { colleges } = useSelector((state: RootState) => state.collegeReducer)
  const { courses } = useSelector((state: RootState) => state.courseReducer)

  const [open, setOpen] = React.useState(false)
  const [semester, setSemester] = React.useState<number>(1)
  const [department, setDepartment] = React.useState('')
  const [timetable, setTimetable] = React.useState<
    Record<string, DayTimetable>
  >({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  })

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleAddSlot = (day: string) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: [...prev[day], { course: '', start: '', end: '' }],
    }))
  }

  const handleRemoveSlot = (day: string, index: number) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }))
  }

  const handleChangeSlot = (
    day: string,
    index: number,
    key: keyof CourseSlot,
    value: string,
  ) => {
    setTimetable((prev) => {
      const newDay = [...prev[day]]
      newDay[index][key] = value
      return { ...prev, [day]: newDay }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!department || !semester) {
      alert('Department and Semester are required')
      return
    }

    try {
      const res = await axiosInstance.post('/timetables/create', {
        semester,
        department,
        timetable,
        college: colleges?._id,
      })
      store.dispatch(addTimetable(res.data.timetable))
      setOpen(false)
      setSemester(1)
      setDepartment('')
      setTimetable({ Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [] })
    } catch (err) {
      console.error('Error creating timetable:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New Timetable
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Timetable</DialogTitle>
          <DialogDescription>
            Fill in the timetable details for the department and semester.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Semester */}
          <div className="space-y-2">
            <Label>Semester</Label>
            <Input
              type="number"
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              min={1}
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={department} onValueChange={setDepartment} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments?.map((dept) => (
                  <SelectItem key={dept._id} value={dept._id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timetable for each day */}
          {days.map((day) => (
            <div key={day} className="border p-2 rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <Label className="font-bold">{day}</Label>
                <Button
                  size="sm"
                  type="button"
                  variant={'outline'}
                  onClick={() => handleAddSlot(day)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Slot
                </Button>
              </div>

              {timetable[day].map((slot, index) => (
                <div key={index} className="flex gap-2 items-end">
                  {/* Course */}
                  <Select
                    value={slot.course}
                    onValueChange={(val) =>
                      handleChangeSlot(day, index, 'course', val)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses?.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Start Time */}
                  <Input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      handleChangeSlot(day, index, 'start', e.target.value)
                    }
                    required
                  />

                  {/* End Time */}
                  <Input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      handleChangeSlot(day, index, 'end', e.target.value)
                    }
                    required
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveSlot(day, index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ))}

          <DialogFooter>
            <Button type="submit">Save Timetable</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
