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
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { axiosInstance } from '@/api/axiosInstance'
import { addCourse } from '@/store/slices/course.slice'

export function AddCourseDialog() {
  const { departments } = useSelector(
    (state: RootState) => state.departmentReducer,
  )
  const { degrees } = useSelector((state: RootState) => state.degreesReducer)
  const { colleges } = useSelector((state: RootState) => state.collegeReducer)
  //   const { faculties } = useSelector((state: RootState) => state.facultyReducer)

  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    code: '',
    name: '',
    credits: '',
    department: '',
    degree: '',
    faculty: null,
    type: 'core',
    description: '',
    status: 'active',
  })

  console.log(form)

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { code, name, credits, department, degree } = form
    if (!code || !name || !credits || !department || !degree) {
      alert('Code, Name, Credits, Department, and Degree are required')
      return
    }

    try {
      const res = await axiosInstance.post('/course/create', {
        ...form,
        college: colleges?._id,
        credits: Number(form.credits),
      })
      store.dispatch(addCourse(res.data.course))
      setOpen(false)
      setForm({
        code: '',
        name: '',
        credits: '',
        department: '',
        degree: '',
        faculty: null,
        type: 'core',
        description: '',
        status: 'active',
      })
    } catch (err) {
      console.error('Error creating course:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Code */}
          <div className="space-y-2">
            <Label>Course Code</Label>
            <Input
              value={form.code}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="CS101"
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Course Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Introduction to Computer Science"
              required
            />
          </div>

          {/* Credits */}
          <div className="space-y-2">
            <Label>Credits</Label>
            <Input
              type="number"
              value={form.credits}
              onChange={(e) => handleChange('credits', e.target.value)}
              placeholder="4"
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select
              value={form.department}
              onValueChange={(val) => handleChange('department', val)}
              required
            >
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

          {/* Degree */}
          <div className="space-y-2">
            <Label>Degree</Label>
            <Select
              value={form.degree}
              onValueChange={(val) => handleChange('degree', val)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees?.map((deg) => (
                  <SelectItem key={deg._id} value={deg._id || ''}>
                    {deg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={form.type}
              onValueChange={(val) => handleChange('type', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="elective">Elective</SelectItem>
                <SelectItem value="lab">Lab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e: any) => handleChange('description', e.target.value)}
              placeholder="Course description"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(val) => handleChange('status', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Save Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
