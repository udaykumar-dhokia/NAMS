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
import { Plus } from 'lucide-react'
import { axiosInstance } from '@/api/axiosInstance'
import { addDepartment } from '@/store/slices/department.slice'

export function AddDepartmentDialog() {
  const { colleges } = useSelector((state: RootState) => state.collegeReducer)
  const { degrees } = useSelector((state: RootState) => state.degreesReducer)

  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    shortName: '',
    code: '',
    college: colleges?._id,
    degreesOffered: [] as string[],
  })

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.shortName || !form.college) {
      alert('Name, Short Name, and College are required')
      return
    }

    try {
      const res = await axiosInstance.post('/department/create', form)
      console.log('Department created:', res.data)
      store.dispatch(addDepartment(res.data.department))
      setOpen(false)
      setForm({
        name: '',
        shortName: '',
        code: '',
        college: '',
        degreesOffered: [],
      })
    } catch (err) {
      console.error('Error creating department:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New Department
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new department.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Computer Science"
              required
            />
          </div>

          {/* Short Name */}
          <div className="space-y-2">
            <Label>Short Name</Label>
            <Input
              value={form.shortName}
              onChange={(e) => handleChange('shortName', e.target.value)}
              placeholder="CSE"
              required
            />
          </div>

          {/* Code */}
          <div className="space-y-2">
            <Label>Code</Label>
            <Input
              value={form.code}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="CSE01"
            />
          </div>

          {/* Degree Offered Single Select */}
          <div className="space-y-2">
            <Label>Degree</Label>
            <Select
              value={form.degreesOffered[0] || ''}
              onValueChange={(val) =>
                handleChange('degreesOffered', val ? [val] : [])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees?.map((degree) => (
                  <SelectItem key={degree._id ?? ''} value={degree._id ?? ''}>
                    {degree.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Save Department</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
