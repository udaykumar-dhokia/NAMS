import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { axiosInstance } from '@/api/axiosInstance'

export const Route = createFileRoute('/_public/auth/_layout/login')({
  component: SimpleRegister,
})

function SimpleRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!form.role) {
      setError('Please select a role')
      setLoading(false)
      return
    }

    try {
      let endpoint = '/auth/'

      if (form.role === 'admin') {
        endpoint = '/auth/a/login'
      } else if (form.role === 'faculty') {
        endpoint = '/auth/f/login'
      }

      await axiosInstance.post(endpoint, {
        email: form.email,
        password: form.password,
      })

      setSuccess('Registered successfully!')
      navigate({ to: '/admin/dashboard' })
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-md shadow-lg overflow-hidden">
        {/* Left side - Picture */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1627556704283-452301a45fd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxjb2xsZWdlfGVufDB8fDB8fHww"
            alt="College Illustration"
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="flex justify-center items-center p-6">
          <Card className="w-full max-w-md shadow-none border-none">
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <h1 className="text-xl font-bold text-center">Login</h1>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue
                        className="w-full"
                        placeholder="Select role"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      {/* <SelectItem value="student">Student</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <Button type="submit" disabled={loading} onClick={handleSubmit}>
                  {loading ? 'Registering...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
