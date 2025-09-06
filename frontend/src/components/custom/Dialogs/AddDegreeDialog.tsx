import * as React from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { store, type RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { axiosInstance } from '@/api/axiosInstance'
import { addDegree } from '@/store/slices/degree.slice'

const degreeOptions = [
  'B.Tech',
  'B.E',
  'B.Sc',
  'B.A',
  'B.Com',
  'BBA',
  'M.Tech',
  'M.E',
  'M.Sc',
  'M.A',
  'M.Com',
  'MBA',
  'PhD',
  'Diploma',
  'Certificate',
]

const statusOptions = ['active', 'inactive']

export function AddDegreeDialog() {
  const admin = useSelector((state: RootState) => state.adminReducer.admin)
  const college = useSelector(
    (state: RootState) => state.collegeReducer.colleges,
  )
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    duration: '',
    semesters: '',
    status: 'active',
  })

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        name: form.name,
        duration: Number(form.duration),
        semesters: form.semesters ? Number(form.semesters) : undefined,
        departments: [],
        college: college?._id,
        createdBy: admin?._id,
        status: form.status,
      }
      const res = await axiosInstance.post('/degree/create', payload)
      store.dispatch(addDegree(res.data.degree))
      setOpen(false)
    } catch (err) {
      console.error('Error creating degree:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New Degree
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Degree</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new degree.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree Name */}
          <div className="space-y-2">
            <Label>Degree Name</Label>
            <Select
              onValueChange={(val) => handleChange('name', val)}
              value={form.name}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent>
                {degreeOptions.map((deg) => (
                  <SelectItem key={deg} value={deg}>
                    {deg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration (years)</Label>
            <Input
              type="number"
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g. 4"
              required
            />
          </div>

          {/* Semesters */}
          <div className="space-y-2">
            <Label>Semesters</Label>
            <Input
              type="number"
              value={form.semesters}
              onChange={(e) => handleChange('semesters', e.target.value)}
              placeholder="e.g. 8"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              onValueChange={(val) => handleChange('status', val)}
              value={form.status}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Save Degree</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
