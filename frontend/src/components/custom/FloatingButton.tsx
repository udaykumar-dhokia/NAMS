import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { axiosInstance } from '@/api/axiosInstance'
import { useNavigate } from '@tanstack/react-router'

type FloatingButtonProps = {
  onClick?: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [date, setDate] = useState('')
  const navigate = useNavigate()

  const { faculty } = useSelector((state: RootState) => state.facultyReducer)
  const { courses } = useSelector((state: RootState) => state.courseReducer)

  const handleSubmit = async () => {
    const payload = {
      date,
      course: selectedCourse,
      faculty: faculty?._id,
      studentsPresent: selectedStudents,
    }
    try {
      const res = await axiosInstance.post('/attendance/', payload)
      const qr = await axiosInstance.post('/qrcode/create', {
        lectureId: res.data.data._id,
      })
      console.log('Submitting Attendance:', qr.data)
      navigate({ to: `/faculty/attendance/${qr.data.qrId}` })

      return res.data
    } catch (error: any) {
      console.error('Error creating attendance:', error.message)
      throw error
    }
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full h-14 w-14 shadow-lg" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Start Attendance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Course */}
            <div className="space-y-2">
              <Label>Course</Label>
              <Select onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              Start Attendance
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
